import { DialogService } from 'aurelia-dialog';
import { inject, bindable, bindingMode } from 'aurelia-framework';
import { AuthorDialog } from '../dialogs/authors-dialog';
import { DataObjectUtility} from "../services/dataUtility"

/**
 * program purpose:
 * - Retreive dow authors from active directory using a utilizing a modal to search by name or DowId
 *
 * local dictionary
 * - authors        - var bound to the view
 * - dialogService  - modal service
 * - parent         - this reference to class
 */
@inject(DialogService)
export class RetrieveAuthors {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) authors;
    parent;

    /**
     * initiate data
     * @param dialogService - modal service
     */
    constructor(dialogService) {
        this.dialogService = dialogService;
        this.parent = this;
    }
    /**
     * calls dialog service which passes the following parameters viewModel and the model to the service
     * @param authors - ref to authors stored in subfrom
     *
     * note if the service fails clear the data being sent
     */
    openModal(authors) {
        var original = DataObjectUtility.cloneObject(authors);
        this.dialogService.open({ viewModel: AuthorDialog, model: this.parent })
            .then(response => {
                if (response.wasCancelled) {
                    this.parent.authors = original;
                }
            });
    }
}