import { inject, bindable, bindingMode } from 'aurelia-framework';
import { FormDataUtility, RequiredFieldList, ValidateForm } from "./resources/services/dataFormUtility"
import { CSSUtility } from "./resources/services/CSSUtility"

let _reportSelections = {
    CRI: 0,
    PROJECT_LEARNING: 1,
    TECH_LEARNING: 2
}

var centralReportIndex = [0, 1, 2, 3, 4, 5, 6];
var projectLearning = [1, 4, 5, 7, 8];
var technicalMeeting = [1, 3, 4, 5, 7, 8];

@inject(FormDataUtility, RequiredFieldList)
export class SubForm {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) dowAuthors = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) nonDowAuthors = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) finalReviewer;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) dowName;

    reportSelections = [
        { id: 0, name: 'Central Report Index' },
        { id: 1, name: 'Project Learnings' },
        { id: 2, name: 'Technical Meetings' }
    ];

    LTDOptions = [
        "Third party legal obligations",
        "Trade Secretes"
    ];

    constructor(formDataUtility, requiredFieldList) {
        this.requiredElementData = formDataUtility.getRequiredElementData();
        this.requiredFieldList = requiredFieldList;
        this.dataUtility = formDataUtility;
        this.showReport = false;
        this.reset();
    }

    submit() {
        if (this.isFormValid()) {
            console.log("OK")
        }
        else {
            console.log("NOT OK")
        }
    }

    cancel() {
        this.reset();
        //this.dataUtility.reset();
    }

    changeReportIE(report) {
        this.changeReport(report);
    }

    changeReportCurrentBrowsers(event) {       
        this.changeReport(this.selectedReport);
    }

    changeReport(report) {
        this.reset();
        if (report != null) {
            this.showReport = true;
            switch (report.id) {
                case _reportSelections.CRI: {

                    for (let i = 0; i < centralReportIndex.length; i++) 
                        this.dataUtility.setRequired(centralReportIndex[i], true);
                    this.showlist(centralReportIndex);
                    break;
                }
                case _reportSelections.PROJECT_LEARNING: {

                    for (let i = 0; i < projectLearning.length; i++) 
                        this.dataUtility.setRequired(projectLearning[i], false);
                    this.showlist(projectLearning);
                    break;
                }
                case _reportSelections.TECH_LEARNING: {

                    for (let i = 0; i < technicalMeeting.length; i++)
                        this.dataUtility.setRequired(technicalMeeting[i], false);
                    this.showlist(technicalMeeting);
                    break;
                }
            }
        }
    }

    showlist(obj) {
        for (let i = 0; i < obj.length; i++)
            console.log(i + "  " + this.dataUtility.getRequired(obj[i]));
    }

    isError(obj) {
        if (obj)
            return CSSUtility.isValidFieldSuccess();
        else
            return CSSUtility.isValidFieldError();
    }

    isFormValid() {
        let valid = true;

        switch (this.selectedReport.id) {
            case _reportSelections.CRI: {
                valid = this.dataUtility.setSuccess(RequiredFieldList.TITLE, ValidateForm.isEmpty(this.title))
                valid = this.dataUtility.setSuccess(RequiredFieldList.ABSTRACT, ValidateForm.isEmpty(this.reportAbstract))
                valid = this.dataUtility.setSuccess(RequiredFieldList.AUTHOR, ValidateForm.isEmptyContainer(this.dowAuthors))
                valid = this.dataUtility.setSuccess(RequiredFieldList.FINAL_REVIEWER, ValidateForm.isEmpty(this.finalReviewer))
                valid = this.dataUtility.setSuccess(RequiredFieldList.REPORT_NUM, ValidateForm.isEmpty(this.reportNumber))
                valid = this.dataUtility.setSuccess(RequiredFieldList.LTD, ValidateForm.isEmpty(this.selectedBusinessLTDOption))
                valid = this.dataUtility.setSuccess(RequiredFieldList.EXPORT_CONTROL, ValidateForm.isEmpty(this.selectedELN))

                //valid = this.dataUtility.setSuccess(RequiredFieldList.DATABOOK_NUM, ValidateForm.isEmpty(this.databookNumber))
                //valid = this.dataUtility.setSuccess(RequiredFieldList.NON_AUTHOR, ValidateForm.isEmpty(this.nonDowAuthors))

                
                break;
            }
            case _reportSelections.PROJECT_LEARNING: {
                valid = this.dataUtility.setSuccess(RequiredFieldList.TITLE, ValidateForm.isEmpty(this.title))
                valid = this.dataUtility.setSuccess(RequiredFieldList.ABSTRACT, ValidateForm.isEmpty(this.reportAbstract))
                valid = this.dataUtility.setSuccess(RequiredFieldList.AUTHOR, ValidateForm.isEmpty(this.dowAuthors))
                valid = this.dataUtility.setSuccess(RequiredFieldList.FINAL_REVIEWER, ValidateForm.isEmpty(this.finalReviewer))
                valid = this.dataUtility.setSuccess(RequiredFieldList.EXPORT_CONTROL, ValidateForm.isEmpty(this.selectedELN))

                break
            }
            case _reportSelections.TECH_LEARNING: {
                valid = this.dataUtility.setSuccess(RequiredFieldList.TITLE, ValidateForm.isEmpty(this.title))
                valid = this.dataUtility.setSuccess(RequiredFieldList.ABSTRACT, ValidateForm.isEmpty(this.reportAbstract))
                valid = this.dataUtility.setSuccess(RequiredFieldList.AUTHOR, ValidateForm.isEmpty(this.dowAuthors))
                valid = this.dataUtility.setSuccess(RequiredFieldList.FINAL_REVIEWER, ValidateForm.isEmpty(this.finalReviewer))

                break
            }
        }
        return valid;
    }

    reset() {
        for (let i in this.requiredFieldList) {
            this.dataUtility.setRequired(RequiredFieldList[i], true);
            this.dataUtility.setSuccess(RequiredFieldList[i], true);
        }
        this.dowName = "";
        this.finalReviewer = "";
        this.title = "";
        this.selectedBusinessCapabilities = [];
        this.dowAuthors
    }
}