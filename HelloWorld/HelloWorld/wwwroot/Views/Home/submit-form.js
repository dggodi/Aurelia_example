import { bindable, bindingMode } from 'aurelia-framework';

export class SubForm {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) dowAuthors = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) nonDowAuthors = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) finalReviewer;
    
    reportSelections = []
    report;
}