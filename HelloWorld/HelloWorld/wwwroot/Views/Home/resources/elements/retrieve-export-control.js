import { inject, bindable, bindingMode } from "aurelia-framework";
import { FieldList, ReportTypes } from "../services/dataFormUtility"

export class RetrieveExportControl {
    @bindable required;
    @bindable utility;
    @bindable success;

    exportControls = ["Yes", "No", "Don\'t Know"];

    exportControlled;

    changeStatusIE() {
        this.changeStatus(this.exportStatus);
    }

    changeStatusCurrentBrowsers() {
        this.changeStatus(this.exportStatus);
    }

    changeStatus(status) {
        if (status != null) {
            switch (this.utility.getReportType()) {
                case ReportTypes.CRI:
                    this.utility.setFlow(FieldList.DATABOOK_NUM, true);
                    this.utility.setFlow(FieldList.REPORT_NUM, true);
                    break;

                case ReportTypes.PROJECT_LEARNING:
                    this.utility.setFlow(FieldList.REPORT_DATE, true);
                    break;
            }
        }
    }

    isError(obj) {
        if (obj)
            return CSSUtility.isValidFieldSuccess();
        else
            return CSSUtility.isValidFieldError();
    }

}