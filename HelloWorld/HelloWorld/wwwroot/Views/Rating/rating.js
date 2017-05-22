import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { RatingDialog } from './rating-dialog';

@inject(DialogService)
export class Rating {

    constructor(dialogService) {
        this.dialogService = dialogService;
        this.rating = 3;
    }

    // receives the context passed down in the compsoed element
	activate() {
        this.original = this.rating;
        this.rating = 3;
    }

    rate() {
        this.dialogService.open({ viewModel: RatingDialog, model: this.rating })
            .then(result => {
                if (result.wasCancelled) {
                    this.rating = this.original;
                }
            })
    }
}