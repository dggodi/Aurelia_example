import { bindable, bindingMode } from 'aurelia-framework';

export class App {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) files;
    
    constructor() {
        
    }

}