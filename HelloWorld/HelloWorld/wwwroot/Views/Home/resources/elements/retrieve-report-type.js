import { bindable, bindingMode } from "aurelia-framework";
import { FieldList, ReportTypes} from "../services/dataFormUtility"

const REQUIRED = 0;
const OPTIONAL = 1;
const NONE = 2;

let formControls = {
    //                   0          1        2         3        4           5       6           7       8           9       10          11       12       13
    cri:             [REQUIRED, REQUIRED, REQUIRED, REQUIRED, OPTIONAL, REQUIRED, REQUIRED, REQUIRED, REQUIRED, REQUIRED, REQUIRED, OPTIONAL, REQUIRED, OPTIONAL],
    projectLearning: [REQUIRED, REQUIRED, NONE,     REQUIRED, NONE,     NONE,     REQUIRED, NONE,     NONE,     REQUIRED, REQUIRED, OPTIONAL, REQUIRED, OPTIONAL],
    technicalMeeting:[OPTIONAL, OPTIONAL, NONE,     NONE,     NONE,     NONE,     REQUIRED, NONE,     NONE,     REQUIRED, REQUIRED, OPTIONAL, REQUIRED, OPTIONAL]

};

export class RetrieveReportType {

    @bindable({ defaultBindingMode: bindingMode.twoWay }) showreport;
    @bindable utility;

    reportSelections = [
        { id: 0, name: 'CRI' },
        { id: 1, name: 'Project Learnings' },
        { id: 2, name: 'Technical Meetings' }
    ];

    changeReportIE(report) {
        this.changeReport(report);
    }

    changeReportCurrentBrowsers(event) {
        this.changeReport(this.selectedReport);
    }

    changeReport(report) {
        this.reset();
        if (report != null) {
            //this.showreport = true;
            switch (report.id) {
                case ReportTypes.CRI:
                    this.initFormData(formControls.cri);
                    this.setFormFlow(FieldList.BUSINESS, true);
                    break;

                case ReportTypes.PROJECT_LEARNING:
                    this.initFormData(formControls.projectLearning)
                    this.setFormFlow(FieldList.BUSINESS, true);
                    break;

                case ReportTypes.TECH_LEARNING:
                    this.initFormData(formControls.technicalMeeting)
                    this.setFormFlow(FieldList.REPORT_DATE, true);
                    break;
            }

            this.utility.setReportType(report.id);
        }
    }

    setFormFlow(key, value) {
        this.utility.setFlow(key, value);
    }

    initFormData(obj) {
        for (let i in FieldList) {
            switch (obj[FieldList[i]]) {
                case REQUIRED: this.utility.setRequired(FieldList[i], true);
                    break;

                case OPTIONAL: this.utility.setRequired(FieldList[i], false);
                    break;

                case NONE: this.utility.setNone(FieldList[i], true);
                    break;
            }
        }
    }

    reset() {
        this.utility.reset();
    }

}