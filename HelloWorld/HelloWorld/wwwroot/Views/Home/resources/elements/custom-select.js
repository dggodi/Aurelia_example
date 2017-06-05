import {customAttribute, DOM, inject } from 'aurelia-framework';


@customAttribute('select2')

@inject(DOM.Element)

export class CustomSelect {

    constructor(element) {
        this.element = element;
    }

    attached() {
        $(this.element).select2(this.value)
            .on('change', () => this.element.dispatchEvent(new Event('change')));
    }

    detached() {
        $(this.element).prop("disabled", true).select2();
    }

}