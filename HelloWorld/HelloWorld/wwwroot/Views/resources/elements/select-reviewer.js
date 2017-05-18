//import { bindable, bindingMode } from 'aurelia-framework';
import { inject } from "aurelia-framework";
import { BusinessData } from "../services/businessData";
import { UserData } from "../services/userData";

@inject(BusinessData, UserData)
export class SelectReviewer {
    businessCapabilites = []
    selectedBusinessCapability = null;
    finalReviewers = [];
    constructor(data, userData) {
        this.data = data;
        this.userData = userData;
    }

    created() {
        console.log("created");
        return this.data.getAll()
            .then(businessCapabilites => this.businessCapabilites = businessCapabilites)
            .catch(error => {
                alert("----- error getting business data -------------");
            });
    }

    add(obj) {
        console.log("SelectReviewer :: add" + obj.DowId);
        let s = obj.DowId
        this.userData.searchById(s)
            .then(finalReviewers => this.finalReviewers = finalReviewers)
            .catch(error => {
                alert("----- error getting final reviwer data -------------");
            });
        //this.finalReviewers.push(obj);
    }

    onChange() {
        console.log("Select Business  :: onChange" + this.selectedBusinessCapability);
        return this.businessData.getReviewers(this.selectedBusinessCapability)
            .then(finalReviewers => this.finalReviewers = finalReviewers)
            .catch(error => {
                alert("----- error getting final reviwer data -------------");
            });
    }

    selectedBusinessChanged(newValue) {
        console.log("Select Business  :: selectedBusinessChanged");
        return this.businessData.getReviewers(newValue)
            .then(finalReviewers => this.finalReviewers = finalReviewers)
            .catch(error => {
                alert("----- error getting final reviwer data -------------");
            });
    }
}