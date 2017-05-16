//import { bindable, bindingMode } from 'aurelia-framework';
import { inject } from "aurelia-framework";
import { BusinessData } from "../services/businessData";

@inject(BusinessData)
export class SelectReviewer {
    businessCapabilites = []
    selectedBusiness = null;

    constructor(data) {
        this.data = data;
    }

    created() {
        console.log("created");
        return this.data.getAll()
            .then(businessCapabilites => this.businessCapabilites = businessCapabilites)
            .catch(error => {
                alert("----- error getting business data -------------");
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