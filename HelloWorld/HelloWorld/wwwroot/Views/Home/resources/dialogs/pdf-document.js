﻿//any css goes in exports-- > exports.js
// select2 and its css "dist/aurelia": {"includes": [ --> bundles

// npm install pdfjs@2.0.0-alpha.3
// npm install pdfjs- dist--save


import { customElement, bindable, inject, bindingMode, TaskQueue, Loader } from 'aurelia-framework';
import { PDFJS } from 'pdfjs-dist';

/* Due to a current limitation in Aurelia's templating, it's not possible to declare multiple
methods in an event handler with separate binding behaviors. We work around this by duplicating
the event name by adding these lines to our ViewModel. */
import { SyntaxInterpreter } from 'aurelia-templating-binding';
SyntaxInterpreter.prototype.trigger2 = SyntaxInterpreter.prototype.trigger;

@customElement('pdf-document')
@bindable({ name: 'url' })
@bindable({ name: 'page', defaultValue: 1, defaultBindingMode: bindingMode.twoWay })
@bindable({ name: 'lastpage', defaultValue: 1, defaultBindingMode: bindingMode.twoWay })
@bindable({ name: 'scale', defaultValue: 1, defaultBindingMode: bindingMode.twoWay })
@inject(TaskQueue, Loader)
export class PdfDocument {
    constructor(taskQueue, loader) {
        //PDFJS.workerSrc = loader.normalizeSync('pdfjs-dist/build/pdf.worker.js');
        this.taskQueue = taskQueue;
        this.worker = new PDFJS.PDFWorker();
        this.fingerprint = generateUniqueDomId();
        this.pages = [];
        this.currentPage = null;
        this.resolveDocumentPending;
    }

    detached() {
        return this.documentPending
            .then((pdf) => {
                if (pdf) {
                    pdf.destroy();
                }
                this.worker.destroy();
            })
            .catch(() => {
                this.worker.destroy();
            })
    }

    urlChanged(newValue, oldValue) {
        if (newValue === oldValue) return;

        var promise = this.documentPending || Promise.resolve();
        this.documentPending = new Promise((resolve, reject) => {
            this.resolveDocumentPending = resolve.bind(this);
        });

        return promise
            .then((pdf) => {
                if (pdf) {
                    pdf.destroy();
                }
                // main entry point and all other operations are performed within it
                // returns a Promise which can be used to place code which will be executed when PDF.js is done fetching document
                return PDFJS.getDocument({ url: newValue, worker: this.worker });
            })
            .then((pdf) => {
                this.lastpage = pdf.numPages;
                pdf.cleanupAfterRender = true;

                for (var i = 0; i < pdf.numPages; i++) {
                    // get individual pages in a PDF document, if successful give a page object 
                    this.pages[i] = pdf.getPage(Number(i + 1))
                        .then((page) => {
                            var viewport = page.getViewport(this.scale);
                            var element = document.getElementById(`${this.fingerprint}-page${page.pageNumber}`);

                            this.taskQueue.queueMicroTask(() => {
                                element.height = viewport.height;
                                element.width = viewport.width;
                            });

                            return {
                                element: element,
                                page: page,
                                rendered: false,
                                clean: false
                            };
                        })
                }

                this.pages.forEach((page) => {
                    page.then((renderObject) => {
                        if (checkIfElementVisible(this.container, renderObject.element)) {
                            if (renderObject.rendered) return;
                            render(page, this.scale);
                        }
                    });
                });

                this.resolveDocumentPending(pdf);
            });
    }

    pageChanged(newValue, oldValue) {
        if (newValue === oldValue || isNaN(Number(newValue)) || Number(newValue) > this.lastpage || Number(newValue) < 0) {
            this.page = oldValue;
            return;
        }

        if (Math.abs(newValue - oldValue) <= 1) return;
        this.pages[newValue - 1]
            .then((renderObject) => {
                this.container.scrollTop = renderObject.element.offsetTop;
                render(this.pages[newValue - 1], this.scale);
            });
    }

    scaleChanged(newValue, oldValue) {
        if (newValue === oldValue || isNaN(Number(newValue))) return;

        Promise.all(this.pages)
            .then((values) => {
                values.forEach((renderObject) => {
                    if (!renderObject) return;

                    var viewport = renderObject.page.getViewport(newValue);
                    renderObject.rendered = false;
                    this.taskQueue.queueMicroTask(() => {
                        renderObject.element.height = viewport.height;
                        renderObject.element.width = viewport.width;

                        if (renderObject.page.pageNumber === this.page) {
                            this.container.scrollTop = renderObject.element.offsetTop;
                        }
                    });
                });
                return values;
            })

            .then((values) => {
                this.pages.forEach((page) => {
                    page.then((renderObject) => {
                        this.taskQueue.queueMicroTask(() => {
                            if (checkIfElementVisible(this.container, renderObject.element)) {
                                render(page, this.scale);
                            }
                        });
                    });
                });
            });
    }

    pageHandler() {
        this.pages.forEach((page) => {
            page.then((renderObject) => {
                if ((this.container.scrollTop + this.container.clientHeight) >= renderObject.element.offsetTop
                    && (this.container.scrollTop <= renderObject.element.offsetTop)) {
                    this.page = renderObject.page.pageNumber;
                }
            });
        });
    }

    renderHandler() {
        Promise.all(this.pages)
            .then((values) => {
                values.forEach((renderObject) => {
                    if (!renderObject) return;

                    if (!checkIfElementVisible(this.container, renderObject.element)) {
                        if (renderObject.rendered && renderObject.clean) {
                            renderObject.page.cleanup();
                            renderObject.clean = true;
                        }

                        return;
                    }

                    this.taskQueue.queueMicroTask(() => {
                        if (renderObject.rendered) return;
                        render(renderObject, this.scale);
                    });
                });
            });
    }
}



var generateUniqueDomId = function () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0)
            .toString(16)
            .substring(1);
    };

    return `_${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

var checkIfElementVisible = function (container, element) {
    var containerBounds = {
        top: container.scrollTop,
        bottom: container.scrollTop + container.clientHeight
    };

    var elementBounds = {
        top: element.offsetTop,
        bottom: element.offsetTop + element.clientHeight
    };

    return (!((elementBounds.bottom < containerBounds.top && elementBounds.top < containerBounds.top)
        || (elementBounds.top > containerBounds.bottom && elementBounds.bottom > containerBounds.bottom)));
}

var render = function (renderPromise, scale) {
    return Promise.resolve(renderPromise)
        .then((renderObject) => {
            if (renderObject.rendered) return Promise.resolve(renderObject);
            renderObject.rendered = true;

            var viewport = renderObject.page.getViewport(scale);
            var context = renderObject.element.getContext('2d');

            // returns a promise which is resolved when a PDF page has been successfully rendered onto the screen
            return renderObject.page.render({
                canvasContext: context,
                viewport: viewport
            })

                .promise.then(() => {
                    return renderObject;
                });
        });
};