import { bindable, inject } from 'aurelia-framework';
import { customAttribute } from 'aurelia-framework'

@customAttribute('square')
@inject(Element)
export class Square {
    @bindable sideLength;
    @bindable({ primaryProperty: true }) color;

    constructor(element) {
        this.element = element;
    }

    sideLengthChanged(newValue, oldValue) {
        this.element.style.width = this.element.style.height = `${newValue}px`;
    }

    colorChanged(newValue, oldValue) {
        this.element.style.backgroundColor = newValue;
    }
}