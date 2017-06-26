import { inject, bindable, bindingMode } from "aurelia-framework";
import { FieldList } from "../services/dataFormUtility"

export class RetrieveEln {
    @bindable required;
    @bindable utility;
    @bindable success;

    elnProjects = [
        { id: 0, userID: "nd20435", ProjectName: "Fellowship of the Ring", status: "yes" },
        { id: 1, userID: "nd20436", ProjectName: "Two Towers", status: "no" }
    ];

    constructor() { }

    attached() {
        $('#ELN').append('<option disabled></option>');
        $('#ELN').append('<option value="none">Project Does not Match Report</option>');
    }

    changeELNIE(ELN) {
        this.changeELN(ELN);
    }

    changeELNCurrentBrowsers(event) {
        this.changeELN(this.ELNProject);
    }

    changeELN(ELN) {
        if (ELN != null) {
            if (ELN.status === "yes") {
                this.utility.setFlow(FieldList.DATABOOK_NUM, false);
                this.utility.setFlow(FieldList.REPORT_NUM, true);
                $("#exportControlled").prop('disabled', 'disabled');
            }
            else if (ELN.status === "no") {
                this.utility.setFlow(FieldList.DATABOOK_NUM, false);
                this.utility.setFlow(FieldList.REPORT_NUM, false);
                $('#exportControlled').removeAttr('disabled');
            }
            else {
                if ($('#ELN option:selected').val() === "none") {
                    this.utility.setFlow(FieldList.DATABOOK_NUM, true);
                    this.utility.setFlow(FieldList.REPORT_NUM, false);
                    $('#exportControlled').removeAttr('disabled');
                }
            }
            this.utility.setFlow(FieldList.EXPORT_CONTROL, true);
        }
    }
}