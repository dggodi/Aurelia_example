import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { DataRepository } from '../services/dataRepository';
import { EditDialog } from '../dialogs/editDialog';

@inject(DataRepository,DialogService)
export class EventDetail {

    constructor(dataRepository, dialogService) {
        this.dataRepository = dataRepository;
        this.dialogService = dialogService;
    }

    activate(params, routeConfig) {
        this.event = this.dataRepository.getEvent(parseInt(params.eventId));
    }

    //When the rate method is invoked (via a button in the corresponding view)
    //the open method on this.dialogService is called with a configuration object specifying viewModel and model
    // viewModel    -  is where we instruct the DialogService to use the RatingDialog as the view
    // model        -  is the data that we want to pass to the RatingDialog view-model
    editEvent(event) {
        this.dialogService.open({ viewModel: EditDialog, model: this.event })
            .then(response => {
                if (response.wasCancelled) {
                    this.event.title = original.title;
                    this.event.description = original.description;
                }
                console.log(response.output);
            });
    }
}