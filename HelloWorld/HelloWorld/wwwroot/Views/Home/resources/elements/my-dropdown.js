import { bindable, bindingMode } from 'aurelia-framework';



export class MyDropdown {



    @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

    @bindable enumList;

    // initialize



    valueChanged(newValue, oldValue) {

        console.log("Dropdown valueChanged from " + oldValue + " (" + (typeof oldValue) + ") to " + newValue + " (" + (typeof newValue) + ")");

    }



}