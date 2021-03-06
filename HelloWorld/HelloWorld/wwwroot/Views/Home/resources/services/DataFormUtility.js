﻿import { transient } from 'aurelia-framework';

//const REQUIRED = 0;
//const OPTIONAL = 1;
//const NONE = 2;

//let formControls = {
//    //                   0          1        2         3        4           5       6           7       8           9       10          11       12       13
//    cri: [REQUIRED, REQUIRED, REQUIRED, REQUIRED, OPTIONAL, REQUIRED, REQUIRED, REQUIRED, REQUIRED, REQUIRED, REQUIRED, OPTIONAL, REQUIRED, OPTIONAL],
//    projectLearning: [REQUIRED, REQUIRED, NONE, REQUIRED, NONE, NONE, REQUIRED, NONE, NONE, REQUIRED, REQUIRED, OPTIONAL, REQUIRED, OPTIONAL],
//    technicalMeeting: [OPTIONAL, OPTIONAL, NONE, NONE, NONE, NONE, REQUIRED, NONE, NONE, REQUIRED, REQUIRED, OPTIONAL, REQUIRED, OPTIONAL]

//};

let ElementData = [
    { title: "Business / Capability", id: "business", key: "BUSINESS", success: true, required: true, none: false, flow:false},
    { title: "Final Reviewer", id: "finalReviewer", key: "FINAL_REVIEWER", success: true, required: true, none: false, flow: false },
    { title: "ELN Project", id: "ELN", key: "ELN", success: true, required: true, none: true, flow: false },
    { title: "Export Control", id: "exportControl", key: "EXPORT_CONTROL", success: true, required: true, none: false, flow: false },
    { title: "Databook Number", id: "databookNumber", key: "DATABOOK_NUM", success: true, required: true, none: false, flow: false },
    { title: "Report Number", id: "reportNumber", key: "REPORT_NUM", success: true, required: true, none: false, flow: false },
    { title: "Report Date", id: "reportDate", key: "REPORT_DATE", success: true, required: true, none: false, flow: false },
    { title: "LTD Limited Distribution", id: "LTD", key: "LTD", success: true, required: true, none: false, flow: false },
    { title: "LTD Limited Distribution Reason", id: "ltdReason", key: "LTD_RESAON", success: true, required: true, none: false, flow: false },
    { title: "Report Title", id: "title", key: "TITLE", success: true, required: true, none: false, flow: false },
    { title: "Dow Author", id: "dowAuthors", key: "AUTHOR", success: true, required: true, none: false, flow: false },
    { title: "Non Dow Author", id: "nonDowAuthors", key: "NON_AUTHOR", success: true, required: true, none: false, flow: false },
    { title: "Report Abstract", id: "abstract", key: "ABSTRACT", success: true, required: true, none: false, flow: false },
    { title: "Distribution List", id: "diList", key: "DI_LIST", success: true, required: true, none: false, flow: false }
];

export var FieldList = {
    BUSINESS: 0,
    FINAL_REVIEWER: 1,
    ELN: 2,
    EXPORT_CONTROL: 3,
    DATABOOK_NUM: 4,
    REPORT_NUM: 5,
    REPORT_DATE: 6,
    LTD: 7,
    LTD_REASON: 8,
    TITLE: 9,
    AUTHOR: 10,
    NON_AUTHOR: 11,
    ABSTRACT: 12,
    DISTRIBUTION_LIST: 13
};

export var ReportTypes = {
    CRI: 0,
    PROJECT_LEARNING: 1,
    TECH_LEARNING: 2
}

@transient()
export class DataFormUtility {

    elementData;
    reportType;
    reportDescription;

    constructor() {
        this.elementData = ElementData;
        this.reportType = "";
    }

    getID(obj) {
        return this.elementData[obj].id;
    }

    getElementData() {
        return this.elementData;
    }

    getFlow(obj) {
        return this.elementData[obj].flow;
    }

    getNone(obj) {
        return this.elementData[obj].none;
    }

    getReportType() {
        return this.reportType;
    }

    getReportDescription() {
        return this.reportDescription;
    }

    getRequired(obj) {
        return this.elementData[obj].required;
    }

    getSuccess(obj) {
        return this.elementData[obj].success;
    }

    getTitle(obj) {
        return this.elementData[obj].title;
    }

    setNone(obj, value) {
        this.elementData[obj].none = value;
    }

    setFlow(obj, value) {
        this.elementData[obj].flow = value;
    }

    setReportType(report) {
        this.reportType = report.id;
        this.reportDescription = report.name;
        this.initFormData(this.reportType)
    }

    setSuccess(obj, value) {
        this.elementData[obj].success = value;
        return this.elementData[obj].success
    }

    setRequired(obj, value) {
        this.elementData[obj].required = value;
        return this.elementData[obj].required;
    }

    reset() {
        for (let i in FieldList) {
            this.setRequired(FieldList[i], true);
            this.setSuccess(FieldList[i], true);
            this.setNone(FieldList[i], false);
            this.setFlow(FieldList[i], false);
        }

    }

    resetForm() {
        for (let i in FieldList) {
            this.setRequired(FieldList[i], true);
            this.setSuccess(FieldList[i], true);
            this.setFlow(FieldList[i], false);
        }

    }

    //initFormData(reportType) {
    //    switch (reportType) {
    //        case ReportTypes.CRI:
    //            this.setFormElementData(cri);
    //            break;

    //        case ReportTypes.PROJECT_LEARNING:
    //            this.initFormElementData(projectLearning)
    //            break;

    //        case ReportTypes.TECH_LEARNING:
    //            this.initFormElementData(technicalMeeting)
    //            break;
    //    }
    //}

    //setFormElementData(obj) {
    //    for (let i in FieldList) {
    //        switch (obj[FieldList[i]]) {
    //            case REQUIRED: this.utility.setRequired(FieldList[i], true);
    //                break;

    //            case OPTIONAL: this.utility.setRequired(FieldList[i], false);
    //                break;

    //            case NONE: this.utility.setNone(FieldList[i], true);
    //                break;
    //        }
    //    }
    //}
}

export class ValidateForm {
    static isEmpty(str) {
        return (!str);
    }

    static isEmptyContainer(obj) {
        return obj.length == 0;
    }

    static isDataBookNumber(obj){
        return obj.match(/^\d{9}$/);
    }
}


