import { bindable, bindingMode } from 'aurelia-framework';
import { ValidateForm} from "./resources/services/validate-form" 

let requiredElementData = [
    { id: "title", key: "TTILE", title: "Title", error: "A Report Title is requried", success: false },
    { id: "abstract", key: "ABSTRACT", title: "Report Abstract", error: "A Report Abstract is requried", success: false },
    { id: "dowAuthor", key: "AUTHOR", title: "Dow Author", error: "A Dow Author is requried", success: false },
    { id: "finalReviewer", key: "FINAL_REVIEWER", title: "Business / Capability", error: "A Final Reviewer is requried", success: false },
    { id: "reportNum", key: "REPORT_NUM", title: "Report Number", error: "A Report Number is requried", success: false },
    { id: "LTD", key: "LTD", title: "Limited Distribution", error: "Limited Distribution is requried", success: false },
    { id: "exportControl", key: "EXPORT_CONTROL", title: "Export Control", error: "Export Control is requried", success: false }
]

let errorCSS =
    { originalBG: "#eee", originalColor: "#555", errorBG: "#f00", errorColor: "#fff" }


export class SubForm {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) dowAuthors = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) nonDowAuthors = [];
    @bindable({ defaultBindingMode: bindingMode.twoWay }) finalReviewer;

    requiredFields = {}
    errorFields = {}

    constructor() {
        this.reset();

    }

    reset() {
        for (let i in requiredElementData) {
            this.requiredFields[requiredElementData[i].key] = true;
            this.errorFields[requiredElementData[i].key] = false;
        }
    }

    submit() {
        this.errorFields.TITLE = true;
        if (this.isValid()) {
            console.log("OK")
        }
        else {
            console.log("NOT OK")
        }
    }

    isValid() {
        this.errorFields.TITLE = ValidateForm.isEmpty(this.dowAuthors);
    }

    cancel() {
        this.errorFields.TITLE = false;
    }

    getTest(obj) {
        console.log("getTest: " + obj);
        if (obj === true)
            return "background-color:" + errorCSS.originalBG + "; color:" + errorCSS.originalColor;
        else
            return "background-color:" + errorCSS.errorBG + "; color:" + errorCSS.errorColor;
    }
}