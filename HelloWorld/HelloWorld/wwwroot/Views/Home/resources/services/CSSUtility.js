let ErrorFieldCSS = { originalBG: "#eee", originalColor: "#555", errorBG: "#f00", errorColor: "#fff" }

export class CSSUtility {

    static isValidFieldSuccess() {
        return "background-color:" + ErrorFieldCSS.originalBG + "; color:" + ErrorFieldCSS.originalColor;
    }

    static isValidFieldError() {
        return "background-color:" + ErrorFieldCSS.errorBG + "; color:" + ErrorFieldCSS.errorColor;
    }
}  