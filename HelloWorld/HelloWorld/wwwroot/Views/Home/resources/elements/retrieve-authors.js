import { DialogService } from 'aurelia-dialog';
import { inject, bindable, bindingMode } from 'aurelia-framework';
import { AuthorDialog } from '../dialogs/authors-dialog';
import { HashMap } from "../services/hashMap"
import { CSSUtility } from "../services/CSSUtility"
import { RequiredFieldList, ValidateForm} from "../services/dataFormUtility"
 
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
    @bindable({ defaultBindingMode: bindingMode.twoWay }) name;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) authors;
    @bindable required;
    @bindable utility;
    @bindable success;
   
    parent;

    /**
     * initiate data
     * @param dialogService - modal service
     */
    constructor(dialogService, authorMap) {
        this.dialogService = dialogService;
        this.authorMap = authorMap;
        this.parent = this;
        this.addAuthor = "Search";
    }

    /**
     * removes author object from select and the authors selected
     * @param author    - object to be removed 
     */
    remove(author) {
        for (var i = 0; i < this.authors.length; i++) {
            var str = this.authors[i].DowId;
            if (str.localeCompare(author.DowId) === 0) {
                this.authorMap.remove(author.DowId);
                this.authors.splice(i, 1);
            }
        }
        if (ValidateForm.isEmptyContainer(this.authors) == false) 
            this.errorSuccess(false);
    }

    nameChanged(newValue) {
        if (ValidateForm.isEmptyContainer(this.authors)) {
            this.errorSuccess(true);
            this.addAuthor = "Edit"
        } else {
            this.errorSuccess(false);
            this.addAuthor = "Search"
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
                    this.name = "";
                }
            });
    }

    isError(obj) {
        if (obj)
            return CSSUtility.isValidFieldSuccess();
        else
            return CSSUtility.isValidFieldError();
    }

    

    errorSuccess(value) {
        this.utility.setSuccess(RequiredFieldList.AUTHOR, value);
    }

    
}