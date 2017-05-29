import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let baseUrl = "Reviewer";

@inject(HttpClient)
export class FinalReviewerData {
    http;
    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        console.log("getAll");
        return this.http.get(baseUrl)
            .then(response => {
                console.log(response.content);
                return response.content;
            })
            .catch(error => {
                alert("----- error getting businesses -------------");
            });
    }

    getReviewers(text) {
        console.log("BusinessData  :: getReviewers");
        return this.http.get(`${baseUrl}/Search/${text}`)
            .then(response => {
                return response.content;
            })
            .catch(error => {
                alert("----- error getting reviewers -------------");
            });
    }

    getByBusiness(text) {
        //text = "hi";
        console.log("FinalReviewerData :: GetByBusiness - " + text);
        //text = encodeURIComponent(JSON.stringify(text));
         //text = URLEncode(text);
        //JSON.stringify(text);


        //text = encodeURIComponent(text);
        text = URLEncode(text);
        return this.http.get(`${baseUrl}/Search/${text}`)
            .then(response => {
                console.log(response.content);
                return response.content;
            })
            .catch(error => {
                console.log("----- error getting reviewers -------------");
            });
    }

    //URLEncode(data) {
    //    var strdata = "" + data;

    //    if (/&/.test(strdata) === true)
    //        strdata = strdata.replace(/&/, "and");

    //    return strdata;
    //}
}

function URLEncode(data) {
    var strdata = "" + data;

    strdata = strdata.replace(/&/, "and");

    return strdata;
} 

//function URLEncode(StringData) {
//    var SAFECHARS = "0123456789" + // Numeric
//        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + // Alphabetic
//        "abcdefghijklmnopqrstuvwxyz" +
//        "-_.!~*'()"; // RFC2396 Mark characters
//    var HEX = "0123456789ABCDEF";

//    var plaintext = StringData;
//    var encoded = "";
//    for (var i = 0; i < plaintext.length; i++) {
//        var ch = plaintext.charAt(i);
//        if (ch == " ") {
//            encoded += "+"; // x-www-urlencoded, rather than %20
//        } else if (SAFECHARS.indexOf(ch) != -1) {
//            encoded += ch;
//        } else {
//            var charCode = ch.charCodeAt(0);
//            if (charCode > 255) {
//                alert("Unicode Character '" + ch + "' cannot be encoded using standard URL encoding.\n" +
//                    "(URL encoding only supports 8-bit characters.)\n" +
//                    "A space (+) will be substituted.");
//                encoded += "+";
//            } else {
//                encoded += "%";
//                encoded += HEX.charAt((charCode >> 4) & 0xF);
//                encoded += HEX.charAt(charCode & 0xF);
//            }
//        }
//    }
//    return encoded;
//}