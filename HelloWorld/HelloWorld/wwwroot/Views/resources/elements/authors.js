import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { AuthorsDialog } from '../dialogs/authors-dialog';

@inject(DialogService)
export class Authors {
    authors = [];

    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    getAuthors() {
        this.dialogService.open({ viewModel: AuthorsDialog, model: this.authors })
            .then(response => {
                if (!response.wasCancelled) {
                    console.log('OK');
                    this.rating = response.output;
                } else {
                    console.log('Cancel');
                }
                console.log(response.output);
            });
    }
}