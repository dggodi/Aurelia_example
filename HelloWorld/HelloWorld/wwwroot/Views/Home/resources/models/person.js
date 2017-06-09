import { inject } from 'aurelia-framework';
import { HashSet } from "../services/hashSet"

let FirstName = Symbol();

@inject(HashSet)
export class DowAuthor extends Person  {

    hashset = new HashSet();

    constructor(id, FirstName, LastName) {
        super(FirstName, LastName);
        this.DowId = id;
        this.hashset = new HashSet();
        this.hashset.add(this.id);
    }

    toString() {
        return `${this.authorName()} (${this.DowId})`;
    }

    // convert to JSON string
    toJSON() {
        return {
            DowId: this.DowId,
            FirstName: this[FirstName],
            LastName: this[LastName]
        };
    }

    //convert the string into a JavaScript object:
    //var obj = JSON.parse(text);
    //toObject(text) {
    //    var obj = JSON.parse(text);
    //    return newDowAuthor(obj);
    //}

    // revive instances during JSON.parse. It is trivial in your case:
    //static fromJSON(obj) {
    //    return new this(obj);
    //}

}

export class NonDowAuthor extends Person {

    constructor() {
        super("", "");
    }

    toString() {
        return `${this.authorName()};`;
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

    constructor(FirstName, LastName) {
        this[FirstName] = FirstName;
        this[LastName] = LastName;
    }

    get FirstName() {
        return this[FirstName];
    }

    set FirstName(FirstName) {
        if (FirstName) this[FirstName] = FirstName
    }

    authorName() {
        return `${this[LastName]}, ${this[FirstName]}`;
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