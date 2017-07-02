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

let formID = ricSubmission

export class App {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) showreport;

    @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedBusinessCapabilities = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) finalReviewer;
    @bindable({ defaultBindingMode: bindingMode.twoWay }) dowAuthors= [];

    LTDoptions = ["Yes", "No"];

    LTDOptionReasons = [
        "Third party legal obligations",
        "Trade Secretes"
    ];

    dataUtility = new DataFormUtility();
    fields = FieldList;
    ctrl;

    constructor() {
        this.ctrl = this.dataUtility.getElementData();

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
        }
        else {
            this.dataUtility.setSuccess(FieldList.DATABOOK_NUM, false);
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
        $("#" + RIC_SUBMISSION_ID)[0].reset();

        $('#business').val('').trigger('change');
        this.selectedBusinessCapabilities = [];
        this.dowAuthors = [];
        this.diList = [];

        this.finalReviewer = "";
        this.nonDowAuthors = "";  

        this.showReport = false;
        this.showDocumentEntry = false;
        this.showSubmit = false;

        this.dataUtility.resetForm();
    }

    submit() {
        if (this.isFormValid()) {
            let processedRequestTable = this.prepareRequestTable(RequestTable);
            this.submitReport(processedRequestTable);
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