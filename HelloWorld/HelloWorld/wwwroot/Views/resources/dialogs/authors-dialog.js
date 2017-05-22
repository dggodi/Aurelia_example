import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';

@inject(DialogController)
export class AuthorsDialog {

    original;

    constructor(dialogController) {
        this.dialogController = dialogController;
    }

    activate(data) {
        this.data = data;
        this.original = data;
    }

    save() {
        this.dialogController.ok();
    }

    cancel() {
        this.data = {}
        this.dialogController.cancel()
    }
}