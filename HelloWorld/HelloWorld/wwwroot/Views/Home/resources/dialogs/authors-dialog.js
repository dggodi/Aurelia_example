import { inject, bindable, bindingMode } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { UserData } from "../services/userData"
import { DataObjectUtility } from "../services/dataUtility"
import { ValidateForm, FieldList } from "../services/DataFormUtility" 
import { Timer } from "../services/timer"

const DURATION = 2;
const HEADING = "Search for Author";

/**
 * program purpose:
 * - Modal service used to search by name or DowId and retreive dow authors from active directory and
 * - display the results. Duplicate authors are not allowed.  Dow authors can also be removed from the container.
 * - if the user decides to cancel the this process then display a message If the data selected is dirty
 * - then cancel or continue the current operation.
 *
 * two-way binded dictionary
 * - name                        - value bound to view
 *
 * local dictionary
 * - authors        - temp container for populating authors in select
 * - finalAuthors   - container for selected authors
 * - controller     - modal service
 * - data           - ref to calling parent retrieve-authors
 * - heading        - title of modal
 * - selectedAuthor - author selected
 * - userdata       - service to retrieve user data
 */
@inject(DialogController, UserData)
export class AuthorDialog {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) name;

    timeoutObj = new Timer(DURATION); 

    authors = [];
    heading = HEADING;
    message = "";

    selectedAuthor; 
    data;

    /**
     * initiate data
     * @param controller    - modal service
     * @param userData      - service to retrieve user data
     * @param set           - hashset of dow authors
     */
    constructor(controller, userData) {
        this.controller = controller;
        this.userData = userData;
        this.loadingSpinner = false;
        controller.settings.centerHorizontalOnly = true;
        this.finalAuthors = [];
    }

    /**
     * called after the constructor and when the view is loaded
     * @param data - parent ref
     */
    activate(data) {
        this.data = data;
        this.name = data.name;
        this.finalAuthors = data.authors;

        if (this.name != null){
            if (this.name.length >= 3) {
                this.loadingSpinner = true;
                this.search(this.name);
            }
        }
    }

    /**
     *  called immediately after both the view and view-model has been created
     *  populates select dow authors and stores dow ids in hasset to prevent duplicates
     *  from being stored
     */
    created() {
        for (var author in this.data.authors) {
            var tmpAuthor = this.data.authors[author];
            if (this.data.authorMap.contains(tmpAuthor.DowId) === false) {
                this.finalAuthors.push(tmpAuthor);
                this.data.authorMap.add(tmpAuthor.DowId)
            }
        }
    }

    addIE(author) {
        this.add(this.selectedAuthor);
    }

    addAllBrowsers(event) {
        this.add(this.selectedAuthor);
    }

    /**
     * add selected authors to an array 
     * @param author - author object added to array
     */
    add(author) {
        if (author != null) {
            if (this.data.authorMap.contains(author.DowId) === false) {
                this.finalAuthors.push(author);
                this.data.authorMap.add(author.DowId)
            }
        }
    }

    /**
     * removes author object from select and the authors selected
     * @param author    - object to be removed 
     */
    remove(author) {      
        for (var i = 0; i < this.finalAuthors.length; i++) {
            console.log(this.finalAuthors[i].DowId);
            var str = this.finalAuthors[i].DowId;
            if (str.localeCompare(author.DowId) === 0) {
                this.data.authorMap.remove(author.DowId);
               this.finalAuthors.splice(i, 1);
            } 
        } 
    }

    /**
     * if newValue > 3 call search to retrieve user data
     * @param newValue - DowId or name or user 
     */
    nameChanged(newValue) {
        if (newValue.length >= 3) {
            this.loadingSpinner = true;
            this.search(this.name);
        }
    }
    
    /**
     * returns back to the caller after the values of the selected authors 
     * is assigned to authors stored in the caller
     */
    submit() {
        this.data.authors = this.finalAuthors;
        this.data.utility.setSuccess(FieldList.AUTHOR, true);
        this.data.utility.setFlow(FieldList.ABSTRACT, true);
        this.controller.ok();
    }

    /**
     * If the data selected is dirty display message cancel or continue. if the operation is not cancelled
     * return back to the caller.  If the data is not dirty return back to the caller
     */
    cancel() {
        if (JSON.stringify(DataObjectUtility.cloneObject(this.finalAuthors)) !=
            JSON.stringify(this.data.authors)) {
            if (confirm("Unsaved data, are you sure you want to navigate away?")) {
                this.resetSuccessOfField(this.finalAuthors);
                this.controller.cancel();
            }
        }
        else {
            this.resetSuccessOfField(this.finalAuthors);
            this.controller.cancel();
        }
    }

    resetSuccessOfField(data) {
        if (ValidateForm.isEmptyContainer(data) == false) {
            this.data.utility.setSuccess(FieldList.AUTHOR, false);
            this.data.utility.setFlow(FieldList.ABSTRACT, false);
        }
        this.timeoutObj.cancel();
        //$("#btnAdd").removeAttr('disabled');
    }

    /**
     * if successful retrieve user data from the userData Service
     */
    search(name) {
        //$("#btnAdd").prop('disabled', 'disabled');
        this.message = "";
        this.timeoutObj.start();

        this.userData.search(name)
            .then(authors => {
                if (!this.timeoutObj.isTimeout())
                    this.authors = authors;
                else
                    this.message = "Refine your search";

                this.loadingSpinner = false;
            })
            .catch(error => {
                console.log("----- error getting user info -------------");
                //$("#btnAdd").removeAttr('disabled');
                this.loadingSpinner = false;
            });
        console.log(this.authors);
    }
}