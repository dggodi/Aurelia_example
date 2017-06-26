import { bindable, bindingMode } from 'aurelia-framework';
import { DataFormUtility, FieldList, ValidateForm} from "./resources/services/dataFormUtility"
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

    exportControls = ["Yes", "No", "Don\'t Know"];

    dataUtility = new DataFormUtility();
    fields = FieldList;
    ctrl;

    showDocumentEntry = false;

    constructor() {
        this.ctrl = this.dataUtility.getElementData();
        $('#business').val('');
        this.reset();
    }

    cancel() {
        this.reset();
    }  

    databookNumberChanged(newValue) {
        if (ValidateForm.isDataBookNumber(this.databookNumber)) {
            this.utility.setFlow(FieldList.REPORT_NUM, true);
            this.dataUtility.setSuccess(Fields.DATABOOK_NUM, true);
            errorDataBookNumber = false;
        }
        else {
            this.dataUtility.setSuccess(Fields.DATABOOK_NUM, false);
            errorDataBookNumber = true;
        }
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

    showField(obj, key) {
        if (obj) 
            return !(this.ctrl[key].none);
        
        return false;
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