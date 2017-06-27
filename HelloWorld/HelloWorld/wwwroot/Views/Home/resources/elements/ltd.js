export class Ltd {

    selectedBusinessLTDOption;

    changeLTDIE() {
        this.changeStatus(this.selectedBusinessLTDOption);
    }

    changeLTDCurrentBrowsers() {
        this.changeStatus(this.selectedBusinessLTDOption);
    }

    changeLTD(ltdReason) {
        if (ltdReason != null) {
            this.utility.setFlow(FieldList.LTD_REASON, true);
        }
        else {
            this.utility.setFlow(FieldList.LTD_REASON, false);
        }
    }

    isError(obj) {
        if (obj)
            return CSSUtility.isValidFieldSuccess();
        else
            return CSSUtility.isValidFieldError();
    }
}