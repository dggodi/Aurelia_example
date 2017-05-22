import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { DataRepository } from '../services/dataRepository';
import { EditDialog } from './editDialog';

@inject(DataRepository, DialogService)
export class EventDetail {
    constructor(dataRepository, dialogService) {
        this.dataRepository = dataRepository;
        this.dialogService = dialogService;
	}	

    // called when the view is loaded
    // params       - all of the params sent
    // routeConfig  - 
	activate(params, routeConfig) {
		this.event = this.dataRepository.getEvent(parseInt(params.eventId));
    }

    editEvent(event) {
        //construct a deep copy of a javascript object
        var original = JSON.parse(JSON.stringify(event));

        // invokes the dialog service passing a viewmodel and model 
        this.dialogService.open({ viewModel: EditDialog, model: this.event })
            .then(result => {
                if (result.wasCancelled) {
                    this.event.title = original.title;
                    this.event.description = original.description;
                }
            })
    }
}