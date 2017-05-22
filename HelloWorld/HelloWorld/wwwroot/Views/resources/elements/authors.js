import { inject } from 'aurelia-framework';
import { DialogService } from 'aurelia-dialog';
import { AuthorsDialog } from '../dialogs/authors-dialog';
import { bindable, bindingMode } from 'aurelia-framework';
//var data = { DowId: "nd20849" }

@inject(DialogService)
export class Authors {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) data;

    constructor(dialogService) {
        this.dialogService = dialogService;
    }

    activate(data) {
        this.data = data;
    }

    getAuthors(data) {
        var original = JSON.parse(JSON.stringify(data));
        this.dialogService.open({ viewModel: AuthorsDialog, model: this.data })
            .then(result => {
                if (result.wasCancelled) {
                    console.log("Authors :: getAuthors --------------------------");
                    this.DowId = original;
                }
            })
    }

    getData() {
        return data;
    }
}