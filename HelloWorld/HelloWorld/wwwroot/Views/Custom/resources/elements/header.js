import { bindable } from "aurelia-framework";

export class Header {
    @bindable value;
    message = "hi";
    valueChanged(newvalue, oldValue) {

    }
}