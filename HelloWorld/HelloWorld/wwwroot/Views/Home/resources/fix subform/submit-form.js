import { bindable, bindingMode } from 'aurelia-framework';
import { DataFormUtility, FieldList, ValidateForm, ReportTypes} from "./resources/services/dataFormUtility"
import { CSSUtility } from "./resources/services/CSSUtility"
import { RicSubmissionData } from "./resources/services/ricSubmssionData";

const RIC_SUBMISSION_ID = "ricSubmission";

let RequestTable = {
    PrimaryAuthorUserId: "",
    PrimaryAuthorName: "",
    PrimaryAuthorEmail: "",
    ReportType: "",
    Reportdate: "",
    ReportNumber: "",
    DataBookNumber: "",
    ELNProjectName: "",
    KeyWords: "",
    OtherKeyWords: "",
    Abstract: "",
    Title: "",
    NonDowAuthors: "",
    Business: "",
    FinalReviewerUserID: "",
    FinalReviewerName: "",
    ExportControl: 0,
    LTD: true,
    LTDReason: "",
    Authors: "",
};

let Ctrl = [
        { id: "business", success: true, required: true, flow: false },
        { id: "finalReviewer", success: true, required: true, flow: false },
        { id: "ELN", success: true, required: true, flow: false },
        { id: "exportControl", success: true, required: true, flow: false },
        { id: "databookNumber", success: true, required: true, flow: false },
        { id: "reportNumber", success: true, required: true, flow: false },
        { id: "reportDate", success: true, required: true, flow: false },
        { id: "LTD", success: true, required: true, flow: false },
        { id: "ltdReason", success: true, required: flow: false },
        { id: "title", success: true, required: true, flow: false },
        { id: "dowAuthors", success: true, required: true, flow: false },
        { id: "nonDowAuthors", success: true, required: true, flow: false },
        { id: "abstract", success: true, required: true, flow: false },
        { id: "diList", success: true, required: true, flow: false }
    ];

export class App {
    //@bindable({ defaultBindingMode: bindingMode.twoWay }) showreport;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedBusinessCapabilities = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) finalReviewer;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) dowAuthors= [];

    exportControls = ["Yes", "No", "Don\'t Know"];

    dataUtility = new DataFormUtility();
    fields = FieldList;
    ctrl = JSON.parse(JSON.stringify(Ctrl));

    ELNProject;

    constructor() {
        this.reset();
    }

    attached() {
        $('#ELN').append('<option disabled></option>');
        $('#ELN').append('<option value="none">Project Does not Match Report</option>');
    }

    cancel() {
        this.reset();
    }  

    @bindable databookNumber;
    databookNumberChanged(newValue) {
        if ( !(ValidateForm.isDataBookNumber(newValue)) ) {
            this.ctrl[FieldList.REPORT_NUM].flow = this.dataUtility.setFlow(FieldList.REPORT_NUM, true);
            this.ctrl[FieldList.DATABOOK_NUM].success = this.dataUtility.setSuccess(FieldList.DATABOOK_NUM, true);
        }
        else {
            this.ctrl[FieldList.DATABOOK_NUM].success = this.dataUtility.setSuccess(FieldList.DATABOOK_NUM, false);
        }
    }

    @bindable reportNumber;
    reportNumberChanged(newValue) {
        if ( !(ValidateForm.isEmpty(newValue)) ) {
            this.ctrl[FieldList.REPORT_DATE].flow = this.dataUtility.setFlow(FieldList.REPORT_DATE, true);
            this.ctrl[FieldList.REPORT_NUM].success = this.dataUtility.setSuccess(FieldList.REPORT_NUM, true);
        }
        else {
            this.ctrl[FieldList.REPORT_NUM].success = this.dataUtility.setSuccess(FieldList.REPORT_NUM, false);
            this.ctrl[FieldList.REPORT_DATE].flow = this.dataUtility.setFlow(FieldList.REPORT_DATE, false);
        }
    }

    @bindable reportDate;
    reportDateChanged(newValue) {
        if ( !(ValidateForm.isEmpty(newValue)) ){
            
            if (this.dataUtility.getReportType() == ReportTypes.CRI) {
                this.ctrl[FieldList.FieldList.LTD].flow = this.dataUtility.setFlow(FieldList.LTD, true);
                this.ctrl[FieldList.REPORT_DATE].success = this.dataUtility.setSuccess(FieldList.REPORT_DATE, true);
            }
            else {
                this.ctrl[FieldList.REPORT_DATE].success = this.dataUtility.setSuccess(FieldList.REPORT_DATE, true);
                this.generalInformation = true;
            }

        } else {
            if (this.dataUtility.getReportType() == ReportTypes.CRI) {
                this.ctrl[FieldList.FieldList.LTD].flow = this.dataUtility.setFlow(FieldList.LTD, false);
                this.ctrl[FieldList.REPORT_DATE].success = this.dataUtility.setSuccess(FieldList.REPORT_DATE, false);
            }
            else {        
                this.ctrl[FieldList.REPORT_DATE].flow = this.dataUtility.setFlow(FieldList.REPORT_DATE, false);
                this.generalInformation = false;
            }

            this.ctrl[FieldList.REPORT_DATE].flow = this.dataUtility.setSuccess(FieldList.REPORT_DATE, false);          
        }
    }

    @bindable title;
    titleChanged(newValue) {
        if (!(ValidateForm.isEmpty(newValue))) {
            this.ctrl[FieldList.AUTHOR].flow = this.dataUtility.setFlow(FieldList.AUTHOR, true);
            this.ctrl[FieldList.NON_AUTHOR].flow = this.dataUtility.setFlow(FieldList.NON_AUTHOR, true);
            this.ctrl[FieldList.TITLE].success = this.dataUtility.setSuccess(FieldList.TITLE, true);
            
        }
        else {
            this.ctrl[FieldList.AUTHOR].flow = this.dataUtility.setFlow(FieldList.AUTHOR, false);
            this.ctrl[FieldList.NON_AUTHOR].flow = this.dataUtility.setFlow(FieldList.NON_AUTHOR, false);
            this.ctrl[FieldList.TITLE].success = this.dataUtility.setSuccess(FieldList.TITLE, false);
        }
    }

    @bindable reportAbstract;
    reportAbstractChanged(newValue) {
        if (!(ValidateForm.isEmpty(newValue))) {
            this.ctrl[FieldList.DISTRIBUTION_LIST].flow = this.dataUtility.setFlow(FieldList.DISTRIBUTION_LIST, true);
            this.ctrl[FieldList.AUTHOR].success = this.dataUtility.setSuccess(FieldList.ABSTRACT, true);
            this.showSubmit = true;
        }
        else {
            this.ctrl[FieldList.DISTRIBUTION_LIST].flow = this.dataUtility.setFlow(FieldList.DISTRIBUTION_LIST, false);
            this.ctrl[FieldList.AUTHOR].success = this.dataUtility.setSuccess(FieldList.ABSTRACT, false);
            this.showSubmit = false;
        }
    }
    
    get showDocumentEntry() {
        if (this.dataUtility.getReportType() == ReportTypes.CRI) 
            return this.ctrl[FieldList.LTD_REASON].flow = this.dataUtility.getFlow(FieldList.LTD_REASON);
        else 
            return this.ctrl[FieldList.REPORT_DATE].flow = this.dataUtility.getFlow(FieldList.REPORT_DATE) === true && this.generalInformation ===true;     
    }

    getLabCode() {
        window.open('https://www.yahoo.com', 'mywindow', 'width=600,height=600')
    }

    reportNumberChanged(newValue) {
        this.ctrl[FieldList.REPORT_Date].flow = this.utility.setFlow(FieldList.REPORT_Date, true);
    }

    reset() {
        $("#ricSubmission").each(function () {

        });

        $('#business').val('').trigger('change');
        this.selectedBusinessCapabilities = [];
        this.dowAuthors = [];
        this.diList = [];

        this.finalReviewer = "";
        this.nonDowAuthors = "";  

        this.showReport = false;
        this.showSubmit = false;

        this.dataUtility.resetForm();
    }

    submit() {
        if (this.isFormValid()) {
            let processedRequestTable = this.prepareRequestTable(RequestTable);
            //this.submitReport(processedRequestTable);
            console.log("OK")
        }
        else {
            console.log("NOT OK")
        }
    } 

    submitReport(processedRequestTable) {
        this.ricData.postRicSubmission(RequestTable)
            .then(success => {
                console.log("submission success");
            })
            .catch(error => {
                console.log("submission failed");
            });
        
    }

    isError(obj) {
        if (obj)
            return CSSUtility.isValidFieldSuccess();
        else
            return CSSUtility.isValidFieldError();
    }

    isFormValid() {

        for (let i in FieldList) {
            if (!(this.dataUtility.getNone(FieldList[i])) && !(this.dataUtility.getSuccess(FieldList[i])))
                return false; 
        }

        return true;
    }

    prepareRequestTable(RequestTable) {
        let tmpRequestTable = RequestTable;

        for (let i in FieldList) {
            let id = this.dataUtility.getID(FieldList[i]);

            $.each(RequestTable, function (key, element) {
                if (key == tmp.getKey(FieldList[i])) {
                    if ($("#" + id).is("input"))
                        tmpRequestTable[key] = $(id).val();
                    else if ("#" + $(id).is("select"))
                        tmpRequestTable[key] = $("#" + id + "option:selected").text();
                    else if ($("input[name=" + id + "]").length != 0)
                        tmpRequestTable[key] = $("input[name=" + id + "]:checked").val()
                }
            });
        }

        let finalReviewer = JSON.stringify(this.finalReviewer);
        let primaryAuthor = new User(this.dowAuthors[0]);

        tmpRequestTable.ReportType = this.dataUtility.getReportType();
        tmpRequestTable.PrimaryAuthorUserId = primaryAuthor.DowId;
        tmpRequestTable.PrimaryAuthorName = primaryAuthor.DisplayName;
        tmpRequestTable.PrimaryAuthorEmail = primaryAuthor.Email;
        //tmpRequestTable.KeyWords =;
        //tmpRequestTable.KeyWords =;
        tmpRequestTable.FinalReviewerUserID = finalReviewer.substring(finalReviewer.lastIndexOf("(") + 1, finalReviewer.lastIndexOf(")"));
        tmpRequestTable.FinalReviewerName = "" + this.finalReviewer;
        tmpRequestTable.NonDowAuthors = this.nonDowAuthors;
        tmpRequestTable.Authors = User.convertToString(this.dowAuthors);

        return tmpRequestTable;
    }

    get showGenralInfo() {

        switch (this.utility.getReportType(report.id)) {
            case ReportTypes.CRI:
                this.setFormFlow(FieldList.BUSINESS, true);
                break;

            case ReportTypes.PROJECT_LEARNING:
                this.setFormFlow(FieldList.BUSINESS, true);
                break;

            case ReportTypes.TECH_LEARNING:
                this.setFormFlow(FieldList.REPORT_DATE, true);
                break;
        }
    }

    get showFinalReviewer() {
        if (!(Validate.isEmpty(this.finalReviewer))) {

            this.ctrl[FieldList.FINAL_REVIEWER].flow = this.dataUtility.setFlow(FieldList.FINAL_REVIEWER, true);

            switch (this.data.utility.getReportType()) {
                case ReportTypes.CRI:
                    return this.ctrl[FieldList.ELN].flow = this.data.utility.setFlow(FieldList.ELN, true);

                case ReportTypes.PROJECT_LEARNING:
                    return this.ctrl[FieldList.EXPORT_CONTROL].flow = this.data.utility.setFlow(FieldList.EXPORT_CONTROL, true);

                case ReportTypes.TECH_LEARNING:
                    return this.ctrl[FieldList.REPORT_DATE].flow = this.data.utility.setFlow(FieldList.REPORT_DATE, true);
            }

            this.data.utility.setSuccess(FieldList.FINAL_REVIEWER, true);
            this.data.utility.setSuccess(FieldList.BUSINESS, true);
        } else {
            if (this.data.utility.getReportType() != ReportTypes.TECH_LEARNING)
                this.data.utility.setSuccess(FieldList.FINAL_REVIEWER, false);
        }
    }

    get showELN() {
        if (this.ELNProject != null) {

            if (ELN.status === "yes") { 
                $("#exportControl").prop('disabled', 'disabled');
                $("#exportControl").val("Yes");
                this.utility.setFlow(FieldList.DATABOOK_NUM, false);
                return this.ctrl[FieldList.REPORT_NUM].flow = this.utility.setFlow(FieldList.REPORT_NUM, true);
            }
            else if (ELN.status === "no") {
                $("#exportControl").prop('disabled', 'disabled');
                $("#exportControl").val("No");
                this.utility.setFlow(FieldList.DATABOOK_NUM, false);
                return this.ctrl[FieldList.REPORT_NUM].flow = this.utility.setFlow(FieldList.REPORT_NUM, true);     
            }
            else {
                if ($('#ELN option:selected').val() === "none") {
                    $('#exportControl').removeAttr('disabled');
                    this.utility.setFlow(FieldList.REPORT_NUM, false); 
                    return true;                 
                }
            }
            
        }
    }

    get showExportControl() {
        if (this.selectedExportStatus != null) {
            switch (this.utility.getReportType()) {
                case ReportTypes.CRI:
                    return this.ctrl[FieldList.DATABOOK_NUM].flow = this.utility.setFlow(FieldList.DATABOOK_NUM, true);
                    break;

                case ReportTypes.PROJECT_LEARNING:
                    return this.ctrl[FieldList.REPORT_DATE].flow = this.utility.setFlow(FieldList.REPORT_DATE, true);
                    break;
            }
        }
    }

    get showLTD() {
        if (ltdReason != null) {
            this.utility.setFlow(FieldList.LTD_REASON, true);
        }
        else {
            this.utility.setFlow(FieldList.LTD_REASON, false);
        }
    }

    get showAuthors(){
        if (ValidateForm.isEmptyContainer(this.dowAuthors)) {
            this.data.utility.setSuccess(FieldList.AUTHOR, true);
            return this.ctrl[FieldList.ABSTRACT].flow = this.data.utility.setFlow(FieldList.ABSTRACT, true);
        } else {
            this.data.utility.setSuccess(FieldList.AUTHOR, false);
            return this.ctrl[FieldList.ABSTRACT].flow = this.data.utility.setFlow(FieldList.ABSTRACT, false);
        }  
    }
}

class User {
    Id;
    DowId;
    FirstName;
    LastName;
    Email;
    DisplayName;

    constructor(data) {
        this.Id = data.Id;
        this.DowId = data.DowId;
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.Email = data.Email;
        this.DisplayName = data.DisplayName;
    }

    static convertToString(obj) {
        var tmp = "";
        for (let i in obj) {
            let user = new User(obj[i]);
            tmp = tmp + user.toString() + ";"
        }

        return (tmp.length > 0) ? obj.slice(0, - 1) : tmp;
    }

    toString() {
        return this.DisplayName + " " + this.DowId;
    }
}

class DiList {
    Id;
    RIC_ID;
    UserId;
    UserEmailAddress;

    constructor(data) {
        this.Id = data.Id;
        this.RIC_ID = data.RIC_ID;
        this.UserId = data.DowId;
        this.UserEmailAddress = data.Email;
    }
}