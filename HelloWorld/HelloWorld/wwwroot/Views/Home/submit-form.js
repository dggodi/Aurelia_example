import { bindable, bindingMode } from 'aurelia-framework';

//var data = [{ "DowId": "nd20849", "cancel": true }]


export class SubmissionForm {
    //DowId;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) data;

    constructor() {
        //this.DowId = '';
        this.data = {"DowId": "nd20849"};
    }

    //getData() {
    //    return data;
    //}
}