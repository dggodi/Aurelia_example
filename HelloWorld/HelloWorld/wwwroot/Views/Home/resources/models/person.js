export class DowAuthor extends Person  {
    constructor(id, firstName, lastName) {
        super(firstName, lastName);
        this.id = id;
    }

    get dowAuthorName() {
        return authorName() + " (" + id + ");";
    }
}

export class NonDowAuthor extends Person {

    constructor() {
        super("", "");
    }

    getNonDowAuthor() {
        return this.lastName + ", " + this.firstName + ";";
    }

    /**
     * returns true if author name is the expected pattern
     * @param data  - input passed to for pattern
     * @return boolean
     */
    static isValid(data) {
        var pattern = /^([A-Z])+,\s([A-Z ])+$/i

        if (pattern.test(data) === true)
            return true;

        return false;
    }

    /**
     * return string where each first charcter in a word is uppercased
     * @param {any} data
     * @return string
     */
    static formatName(data) {
        var strdata = "" + data;
        var userData = new Array();

        strdata = strdata.trim();
        userData = strdata.split(", ")
        return "" + uppercaseTitle(userData[0]) + ", " + uppercaseTitle(userData[1]);
    }
}

class Person {

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    /**
     * converts first character in each word to uppercase and returns the result
     * @param strdata   - string to convert
     * @return string
     */
    static uppercaseTitle(strdata) {
        return strdata.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
}