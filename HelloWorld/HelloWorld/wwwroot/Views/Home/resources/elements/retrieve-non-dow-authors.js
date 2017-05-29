import { inject, bindable, bindingMode } from 'aurelia-framework';
import { HashSet } from "../services/hashset";

/**
 * converts first character in each word to uppercase and returns the result
 * @param strdata   - string to convert
 * @return string
 */
function uppercaseTitle(strdata) {
    return strdata.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * returns true if author name is the expected pattern
 * @param data  - input passed to for pattern
 * @return boolean
 */
function isValid(data) {
    var pattern = /^([A-Z])+,\s([A-Z ])+$/i

    if(pattern.test(data) === true)
        return true;

    return false;
}

/**
 * return string where each first charcter in a word is uppercased
 * @param {any} data
 * @return string
 */
function formatName(data) {
    var strdata = "" + data;
    var userData = new Array();

    strdata = strdata.trim();
    userData = strdata.split(", ")
    return "" + uppercaseTitle(userData[0]) + ", " + uppercaseTitle(userData[1]);
}

/**
 * program purpose:
 * - Collects and stores non dow author names inserted by user.  Only verifed names
 * - will be inserted in the container.  Duplicates will not be allowed.  Names can also be
 * - removed from the container.
 *
 * two-way binded dictionary
 * - authors                        - container for non dow authors
 *
 * local dictionary
 * - businessCapabilities           - Business / Capabilities retreived from db
 * - dialogService                  - modal service
 * - parent                         - this ref to RetrieveAuthors
 * - selectedBusinessCapabilities   - container for selected Business / Capabilities
 * - set                            - hashset of authors
 */
@inject(HashSet)
export class RetrieveNonDowAuthors {
    @bindable({ defaultBindingMode: bindingMode.twoWay }) authors;

    finalAuthors = [];
    error = "";
    name = "";

    /**
     * initiate data
     * @param set               - hashset of authors
     */
    constructor(set) {
        this.set = set;
    }

    /**
     * if the name is not valid display message
     * else add non dow author to author container and display after the name is reformatted
     *
     * note: names are stored in a hashset to prevent duplicates and copied over
     * to and stored in the author container where each naem is sperated by a ";"
     */
    add() {
        if (isValid(this.name) === false)
            this.displayError("Error... Incorrect format");
        else { 
            var tmpname = "" + formatName(this.name)

            if (this.set.contains(tmpname) === true)
                this.displayError("Error... Duplicate author");
            else {
                this.displayError("");
                this.finalAuthors.push(tmpname);
                this.set.add(tmpname);
                this.authors = this.authors + tmpname + ";"
            }
        }
    }

    /**
     * Changes error message display
     * @param message   - messae to display
     */
    displayError(message) {
        this.error = message;
    }

    /**
     * removes author object form display and the author container
     * @param author    - object to be removed author container
     */
    remove(author) {
        for (var i = 0; i < this.finalAuthors.length; i++) {
            console.log(this.finalAuthors[i]);
            var str = this.finalAuthors[i];
            if (str.localeCompare(author) === 0) {
                this.set.remove(author);
                this.finalAuthors.splice(i, 1);
                this.authors = this.authors.replace(author + ";", "");
            }
        }

    }
}