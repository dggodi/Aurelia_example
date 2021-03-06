﻿
// Asynchronous download PDF
export class PdfDialog{

    data;
    documents = []
    constructor() {
        // Set up some sensible defaults for documents to use with our repeater.
    //    this.documents = [
    //        {
    //            url: 'dist/documents/one.pdf',
    //            draftUrl: 'dist/documents/one.pdf',
    //            pageNumber: 1,
    //            scale: 1,
    //            lastpage: 1
    //        },

    //        {
    //            url: 'dist/documents/two.pdf',
    //            draftUrl: 'dist/documents/two.pdf',
    //            pageNumber: 1,
    //            scale: 1,
    //            lastpage: 1
    //        }
    //    ];
    }

    activate(data) {
        this.data = data;
    }

    loadUrl(document) {
        document.url = document.draftUrl;
    }

    firstPage(document) {
        document.pageNumber = 1;
    }

    nextPage(document) {
        if (document.pageNumber >= document.lastpage) return;
        document.pageNumber += 1;
    }

    prevPage(document) {
        if (document.pageNumber <= 1) return;
        document.pageNumber -= 1;
    }

    lastPage(document) {
        document.pageNumber = document.lastpage;
    }

    goToPage(document, page) {
        if (page <= 0 || page > document.lastpage) return;
        document.pageNumber = page;
    }

    zoomIn(document) {
        document.scale = Number(document.scale) + 0.1;
    }

    zoomOut(document) {
        document.scale = Number(document.scale) - 0.1;
    }
}
