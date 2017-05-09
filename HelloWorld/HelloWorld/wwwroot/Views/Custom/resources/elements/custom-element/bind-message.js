import { bindable, bindingMode } from 'aurelia-framework';

export class BindMessageCustomElement {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) message;
    @bindable allowDestruction = false;

    constructor() {
        setInterval(() => this.deleteMessage(), 10000);
    }

    deleteMessage() {
        if (this.allowDestruction === true) {
            this.message = '';
        }
    }
}

