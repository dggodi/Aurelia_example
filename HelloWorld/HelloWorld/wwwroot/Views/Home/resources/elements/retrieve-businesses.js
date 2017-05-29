import { inject, bindable, bindingMode } from "aurelia-framework";
import { DialogService } from 'aurelia-dialog';
import { FinalReviewerData } from "../services/finalReviewerData";
import { HashSet } from "../services/hashSet"
import { BusinessDialog } from "../dialogs/business-dialog"

/**
 * program purpose:
 * - Retreive business capabilities from database to populate select element.
 * - opens modal service to retreive a final reviewers based on business/capability
 * - only one final reviewer can be selected
 *
 * local dictionary
 * - businessCapabilities           - Business / Capabilities retreived from db
 * - dialogService                  - modal service
 * - parent                         - this ref to RetrieveAuthors
 * - selectedBusinessCapabilities   - container for selected Business / Capabilities
 * - set                            - hashset of authors
 */
@inject(DialogService, FinalReviewerData, HashSet)
export class RetrieveBusinesses {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) reviewer

    businessCapabilities = [];
    selectedBusinessCapabilities = [];
    
    /**
     * initiate data
     * @param dialogService     - modal service
     * @param finalReviewerData - repo to receive final reviewer data
     * @param set               - hashset of authors
     */
    constructor(dialogService, finalReviewerData, set) {
        this.dialogService = dialogService;
        this.finalReviewerData = finalReviewerData;
        this.set = set;
        this.parent = this;
    }

    /**
     *  called immediately after both the view and view-model has been created
     *  populates select with business / capabilites retreived from db
     */
    created() {
        console.log("created");
        return this.finalReviewerData.getAll()
            .then(businessCapabilities => this.businessCapabilities = businessCapabilities)
            .catch(error => {
                alert("----- error getting business data -------------");
            });
    }

    /**
     * calls dialog service which passes the following parameters viewModel and the model to the service
     * @param authors - ref to authors stored in subfrom
     *
     * note if the service fails clear the data being sent
     */
    openModal() {
        //construct a deep copy of a javascript object
        this.dialogService.open({ viewModel: BusinessDialog, model: this.parent })
            .then(response => {
                if (response.wasCancelled) {
                    this.finalReviewer = {};
                }
            });
    }
}