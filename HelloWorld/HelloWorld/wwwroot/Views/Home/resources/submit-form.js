import { bindable, bindingMode } from 'aurelia-framework';
import { DataFormUtility, FieldList, ValidateForm, ReportTypes} from "./resources/services/dataFormUtility"
import { CSSUtility } from "./resources/services/CSSUtility"

let _reportSelections = {
    CRI: 0,
    PROJECT_LEARNING: 1,
    TECH_LEARNING: 2
}

export class App {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) showreport;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedBusinessCapabilities = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) finalReviewer;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) dowAuthors= [];

    LTDOptions = [
        "Third party legal obligations",
        "Trade Secretes"
    ];

    dataUtility = new DataFormUtility();
    fields = FieldList;
    ctrl;

    constructor() {
        this.ctrl = this.dataUtility.getElementData();
        this.generalInformation = false;
        this.showSubmit = false;
        $('#business').val('');
        this.reset();
    }

    cancel() {
        this.reset();
    }  

    @bindable databookNumber;
    databookNumberChanged(newValue) {
        if ( !(ValidateForm.isDataBookNumber(newValue)) ) {
            this.dataUtility.setFlow(FieldList.REPORT_NUM, true);
            this.dataUtility.setSuccess(FieldList.DATABOOK_NUM, true);
            errorDataBookNumber = false;
        }
        else {
            this.dataUtility.setSuccess(FieldList.DATABOOK_NUM, false);
            errorDataBookNumber = true;
        }
    }

    @bindable reportNumber;
    reportNumberChanged(newValue) {
        if ( !(ValidateForm.isEmpty(newValue)) ) {
            this.dataUtility.setFlow(FieldList.REPORT_DATE, true);
            this.dataUtility.setSuccess(FieldList.REPORT_NUM, true);
        }
        else {
            this.dataUtility.setSuccess(FieldList.REPORT_NUM, false);
            this.dataUtility.setFlow(FieldList.REPORT_DATE, false);
        }
    }

    @bindable reportDate;
    reportDateChanged(newValue) {
        if ( !(ValidateForm.isEmpty(newValue)) ){
            
            if (this.dataUtility.getReportType() == ReportTypes.CRI) {
                this.dataUtility.setFlow(FieldList.LTD, true);
                this.dataUtility.setSuccess(FieldList.REPORT_DATE, true);
            }
            else {
                this.dataUtility.setSuccess(FieldList.REPORT_DATE, true);
                this.generalInformation = true;
            }

        } else {
            if (this.dataUtility.getReportType() == ReportTypes.CRI) {
                this.dataUtility.setFlow(FieldList.LTD, false);
                this.dataUtility.setSuccess(FieldList.REPORT_DATE, false);
            }
            else {        
                this.dataUtility.setFlow(FieldList.REPORT_DATE, false);
                this.generalInformation = false;
            }

            this.dataUtility.setSuccess(FieldList.REPORT_DATE, false);          
        }
    }

    @bindable title;
    titleChanged(newValue) {
        if (!(ValidateForm.isEmpty(newValue))) {
            this.dataUtility.setFlow(FieldList.AUTHOR, true);
            this.dataUtility.setFlow(FieldList.NON_AUTHOR, true);
            this.dataUtility.setSuccess(FieldList.TITLE, true);
            
        }
        else {
            this.dataUtility.setFlow(FieldList.AUTHOR, false);
            this.dataUtility.setFlow(FieldList.NON_AUTHOR, false);
            this.dataUtility.setSuccess(FieldList.TITLE, false);
        }
    }

    @bindable reportAbstract;
    reportAbstractChanged(newValue) {
        if (!(ValidateForm.isEmpty(newValue))) {
            this.dataUtility.setFlow(FieldList.DISTRIBUTION_LIST, true);
            this.dataUtility.setSuccess(FieldList.ABSTRACT, true);
            this.showSubmit = true;
        }
        else {
            this.dataUtility.setFlow(FieldList.DISTRIBUTION_LIST, false);
            this.dataUtility.setSuccess(FieldList.ABSTRACT, false);
            this.showSubmit = false;
        }
    }
    
    get showDocumentEntry() {
        if (this.dataUtility.getReportType() == ReportTypes.CRI) 
            return this.dataUtility.getFlow(FieldList.LTD_REASON);
        else
            return this.dataUtility.getFlow(FieldList.REPORT_DATE) && this.generalInformation;     
    }

    getLabCode() {
        window.open('https://www.yahoo.com', 'mywindow', 'width=600,height=600')
    }

    reportNumberChanged(newValue) {
        this.utility.setFlow(FieldList.REPORT_Date, true);
    }

    reset() {
        this.selectedBusinessCapabilities = [];

        $('#business').val('').trigger('change');
        $('#finalReviwer').val('');
        $('#ELN').val('');
        $('#exportControlled').val('');

        console.log($('#business').val());

        this.finalReviewer = "";
        this.dataUtility.resetForm();
    }

    submit() {

        console.log($('#business').val());

        if (this.isFormValid()) {
            console.log("OK")
        }
        else {
            console.log("NOT OK")
        }
    } 

    isError(obj) {
        if (obj)
            return CSSUtility.isValidFieldSuccess();
        else
            return CSSUtility.isValidFieldError();
    }

    isFormValid() {

        let valid = true;

        //for (let i in RequiredFieldList) {
        //    let id = this.dataUtility.getID(RequiredFieldList[i]);
        //    var element = document.getElementById(id);

        //    if (typeof (element) != 'undefined' && element != null) {
        //        let v = document.getElementById(id).value
        //        valid = this.dataUtility.setSuccess(RequiredFieldList[i], ValidateForm.isEmpty(v));
        //    } else {
        //        if (id instanceof Function) {
        //            console.log("FormValid - else " + id);
        //            //valid = this.dataUtility.setSuccess(RequiredFieldList[i], ValidateForm.isEmptyContainer(id));
        //        }
        //    }

        //}



        //valid = this.dataUtility.setSuccess(RequiredFieldList.FINAL_REVIEWER, ValidateForm.isEmpty(this.finalReviewer))
        return valid;
    }

    
}