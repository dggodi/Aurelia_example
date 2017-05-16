import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class BusinessDialog {

    heading = 'Search for Business';

    constructor(controller) {
        this.controller = controller;
    }

}