import { DialogService } from 'aurelia-dialog';
import { inject, bindable, bindingMode } from 'aurelia-framework';
import { AuthorDialog } from '../dialogs/authors-dialog';
import { DataObjectUtility} from "../services/dataUtility"
import { HashMap } from "../services/hashSet"
/**
 * program purpose:
 * - Retreive dow authors from active directory using a utilizing a modal to search by name or DowId
 *
 * local dictionary
 * - authors        - var bound to the view
 * - dialogService  - modal service
 * - parent         - this reference to class
 */
@inject(DialogService, HashMap)
export class RetrieveAuthors {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) authors;
    parent;

    /**
     * initiate data
     * @param dialogService - modal service
     */
    constructor(dialogService, hm) {
        this.dialogService = dialogService;
        this.hm = hm;
        this.parent = this;
    }

    /**
     * removes author object from select and the authors selected
     * @param author    - object to be removed 
     */
    remove(author) {
        for (var i = 0; i < this.authors.length; i++) {
            var str = this.authors[i].DowId;
            if (str.localeCompare(author.DowId) === 0) {
                this.hm.remove(author.DowId);
                this.authors.splice(i, 1);
            }
        }
    }

    /**
     * calls dialog service which passes the following parameters viewModel and the model to the service
     * @param authors - ref to authors stored in subfrom
     *
     * note if the service fails clear the data being sent
     */
    openModal() {
        this.dialogService.open({ viewModel: AuthorDialog, model: this.parent })
            .then(response => {
                if (response.wasCancelled) {
                    this.parent.name = "";
                }
            });
    }
}