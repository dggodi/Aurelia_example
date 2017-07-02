import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { UserData } from "../services/userData"
import { FinalReviewerData } from "../services/finalReviewerData";
import { HashSet } from "../services/hashSet"
import { FieldList, ReportTypes} from "../services/dataFormUtility"

/**
 * convert final reviwer object values into a string
 * @param final reviewer object
 * @return string
 */
function convertObjectToString(finalReviewer) {
    var result = finalReviewer.LastName;
    result = result + ", " + finalReviewer.FirstName;
    result = result + " (" + finalReviewer.DowId + ")";

    return result;
}

/**
 * program purpose:
 * - modal service used to return a final reviewer.  A final reviwer is chosen from a select
 * - The select is populated with final reviewers retreived from the db by searching for 
 * - business / capabilites refernced through the parent. Only one final reviewer can be chosen
 *
 * local dictionary
 * - controller             - modal service
 * - finalReviewerData      - service to retrieve final reviewer data
 * - finalReviewers         - temp container for populating final reviewers in select
 * - heading                - title of modal
 * - selectedFinalReviewer  - final reviewer chosen from select
 * - set                    - hashset of final reviewers
 * - userdata               - service to retrieve user data
 */
@inject(DialogController, FinalReviewerData, UserData)
export class FinalReviewerDialog {

    heading = 'Select Final Reviewer';

    finalReviewers = [];

    data;
    selectedFinalReviewer;

    /**
     * initiate data
     * @param controller        - modal service
     * @param finalReviewerData - service to retrieve final reviewer data
     * @param userData          - service to retrieve user data
     * @param set               - hashset of final reviewers
     */
    constructor(controller, finalReviewerData, userData) {
        this.controller = controller;
        this.finalReviewerData = finalReviewerData;
        this.userData = userData;
        this.set = new HashSet();

        controller.settings.centerHorizontalOnly = true;
    }

    /**
     * called after the constructor and when the view is loaded
     * @param data - parent ref
     */
    activate(data) {
        this.data = data;
    }

    /**
     *  called immediately after both the view and view-model has been created
     *  populates select with final reviewers retreived from db
     */
    created() {
        for (var business in this.data.selectedbusinesses) {
            var tmp = this.data.selectedbusinesses[business];
            this.finalReviewerData.getByBusiness(tmp)
                .then(users => this.populateUserData(users))
                .catch(error => {
                    console.log("----- error getting final reviewer data -------------");
                });
        }
    }

    /**
     * returns final reviewers from db and stores final reviwers id in a hashset
     * @param data  - container containing business / capabilites
     */
    populateUserData(data) {
        var userIDs = new Array();
        userIDs = data;

        //for (var i = 0; i < userIDs.length; i++) {
            this.userData.searchById(userIDs)
                .then(obj => {
                    var s = obj;
                    if (this.set.contains(s.DowId) === false) {
                        this.set.add(s.DowId)
                        this.finalReviewers.push(s);
                    }
                })
                .catch(error => {
                    console.log("error getting user data ");
                });
        //}
    }

    setFormFlow() {

        this.data.utility.setFlow(FieldList.FINAL_REVIEWER, true);

        switch (this.data.utility.getReportType()) {
            case ReportTypes.CRI:               
                this.data.utility.setFlow(FieldList.ELN, true);
                break;

            case ReportTypes.PROJECT_LEARNING:
                this.data.utility.setFlow(FieldList.EXPORT_CONTROL, true);
                console.log("setFormFlow  CRI" + this.data.utility.getFlow(FieldList.ELN));
                console.log("setFormFlow  PROJECT_LEARNING" + this.data.utility.getFlow(FieldList.EXPORT_CONTROL));

                break;

            case ReportTypes.TECH_LEARNING:
                this.data.utility.setFlow(FieldList.REPORT_DATE, true);
                break;
        }
    }

    /**
     * returns back to the caller after the values of the final reviewer object is
     * assigned to reviewer stored in the caller
     */
    ok() {
        this.data.reviewer = convertObjectToString(this.selectedFinalReviewer);
        this.data.utility.setSuccess(FieldList.FINAL_REVIEWER, true);
        this.data.utility.setSuccess(FieldList.BUSINESS, true);
        this.setFormFlow();
        
        this.controller.ok();
    }

    /**
     * return back to the caller
     */
    cancel() {
        this.data.utility.setSuccess(FieldList.FINAL_REVIEWER, false);
        this.controller.cancel()
    }

}