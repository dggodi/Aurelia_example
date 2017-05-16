import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class AuthorsDialog {

    heading = 'Search for Author';

    constructor(controller) {
        this.controller = controller;
    }

}