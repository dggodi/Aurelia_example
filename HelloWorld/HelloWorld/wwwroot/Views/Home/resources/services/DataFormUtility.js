import { transient } from 'aurelia-framework';

export var RequiredFieldList = {
    TITLE: 0,
    ABSTRACT: 1,
    AUTHOR: 2,
    FINAL_REVIEWER: 3,
    REPORT_NUM: 4,
    LTD: 5,
    EXPORT_CONTROL: 6,
    NON_AUTHOR: 7,
    DATABOOK_NUM: 8
};

let RequiredElementData = [
    { key: "TITLE", title: "Title", error: "A Report Title is requried", success: true, required: true },
    { key: "ABSTRACT", title: "Report Abstract", error: "A Report Abstract is requried", success: true, required: true },
    { key: "AUTHOR", title: "Dow Author", error: "A Dow Author is requried", success: true, required: true },
    { key: "FINAL_REVIEWER", title: "Business / Capability", error: "A Final Reviewer is requried", success: true, required: true },
    { key: "REPORT_NUM", title: "Report Number", error: "A Report Number is requried", success: true, required: true },
    { key: "LTD", title: "Limited Distribution", error: "Limited Distribution is requried", success: true, required: true },
    { key: "EXPORT_CONTROL", title: "Export Control", error: "Export Control is requried", success: true, required: true },
    { key: "NON_AUTHOR", title: "Non Dow Author", error: "Dow Author", success: true, required: true },
    { key: "DATABOOK_NUM", title: "Data Book Number", error: "Data Book NUmber has incorrect format", success: true, required: true }
];


@transient()
export class FormDataUtility {

    reset= false;

    constructor() {
        this.requiredElementData = RequiredElementData;
    }

    get reset() {
        return this.clearForm;
    }

    set reset(value) {
        this.clearForm = value;
    }

    getRequiredElementData() {
        return this.requiredElementData;
    }

    setSuccess(obj, value) {
        this.requiredElementData[obj].success = value;
        return this.requiredElementData[obj].success
    }

    setRequired(obj, value) {
        this.requiredElementData[obj].required = value;
        return this.requiredElementData[obj].required;
    }

    getSuccess(obj) {
        return this.requiredElementData[obj].success;
    }

    getRequired(obj) {
        return this.requiredElementData[obj].required;
    }
}

export class ValidateForm {
    static isEmpty(str) {
        return (!!str);
    }

    static isEmptyContainer(obj) {
        return (typeof obj != "undefined" && obj != null && obj.length > 0)
    }
}
