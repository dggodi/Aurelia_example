import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { BusinessDialog } from '../dialogs/business-dialog';

@inject(DialogService)
export class BusinessCapabilities {
    businesses = [];

    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    getBusinesses() {
        this.dialogService.open({ viewModel: BusinessDialog, model: this.businesses })
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