import { inject, bindable, bindingMode } from "aurelia-framework";
import { DialogService } from 'aurelia-dialog';
import { FinalReviewerData } from "../services/finalReviewerData";
import { HashSet } from "../services/hashSet"
import { FinalReviewerDialog } from "../dialogs/FinalReviewerDialog"
import { CSSUtility } from "../services/CSSUtility"
import { RequiredFieldList, ValidateForm } from "../services/dataFormUtility"
/**
 * program purpose:
 * - Retreive business capabilities from database to populate select element.
 * - opens modal service to retreive a final reviewers based on business/capability
 * - only one final reviewer can be selected
 *
 * local dictionary
 * - businessCapabilities           - Business / Capabilities retreived from db
 * - dialogService                  - modal service
 * - element                        - ref to the custom element in the view
 * - parent                         - this ref to RetrieveAuthors
 * - selectedBusinessCapabilities   - container for selected Business / Capabilities
 * - set                            - hashset of authors
 */
@inject(DialogService, FinalReviewerData, HashSet, Element)
export class RetrieveBusinesses {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) reviewer
    @bindable required;
    @bindable utility;
    @bindable success;

    businessCapabilities = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedBusinessCapabilities = [];
    parent;
    select2 = null;

    /**
     * initiate data
     * @param dialogService     - modal service
     * @param finalReviewerData - repo to receive final reviewer data
     * @param set               - hashset of authors
     */
    constructor(dialogService, finalReviewerData, set, element) {
        this.dialogService = dialogService;
        this.finalReviewerData = finalReviewerData;
        this.set = set;
        this.parent = this;
        this.element = element;
        this.loadingSpinner = true;
    }

    /**
      *  called immediately after both the view and view-model has been created
      *  populates select with business / capabilites retreived from db
      */
    created() {
        console.log("created");
        this.loadingSpinner = true;
        return this.finalReviewerData.getAll()
            .then(businessCapabilities => {
                this.businessCapabilities = businessCapabilities;
                this.loadingSpinner = false;
            })
            .catch(error => {
                console.log("----- error getting business data -------------");
                this.loadingSpinner = false;
            });
    }
    /**
     * attaches change event to select element.  If a the element activates a change event then
     * add business / capability to container
     *
     * note: called when the View is attached to the DOM
     */
    attached() {
        this.select2 = $(this.element).find('select').select2({
            placeholder: "No selection",
            allowClear: true
        });
        // add event listener to select element
        this.select2.val(this.selectedBusinessCapabilities).trigger("change");
        // if any value in the select is changed add new value to the business / capabilites container
        this.select2.on('change', (e) => {
            let temp = this.getMultiValues();
            if (ValidateForm.isEmptyContainer(temp) == false)
                this.utility.setSuccess(RequiredFieldList.FINAL_REVIEWER, false);

            this.selectedBusinessCapabilities = temp;
        });
    }

    /**
     * remove select2 and restore select back to regualr dropdown and remove listener
     *
     * note: called when the View is detached from the DOM
     */
    detached() {
        this.select2.select2('destroy');
    }
    /**
     * return the selected capabilities
     *
     * @return String []
     */
    getMultiValues() {
        let select = [];
        if (this.select2.val() == null)
            return select;
        for (let e of this.select2.val()) {
            select.push(e);
        }
        return select;
    }

    isError(obj) {
        if (obj)
            return CSSUtility.isValidFieldSuccess();
        else
            return CSSUtility.isValidFieldError();
    }

    /**
     * calls dialog service which passes the following parameters viewModel and the model to the service
     * @param authors - ref to authors stored in subfrom
     *
     * note if the service fails clear the data being sent
     */
    openModal() {
        this.dialogService.open({ viewModel: FinalReviewerDialog, model: this.parent })
            .then(response => {
                if (response.wasCancelled) {
                    this.reviewer = "";
                }
            });
    }
}