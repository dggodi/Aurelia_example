import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

let baseUrl = "Reviewer";
let timeout = 200;

@inject(HttpClient)
export class FinalReviewerData {
    http;

    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        return this.http.fetch(`${baseUrl}/BusinessCapabilities`)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log("----- error getting businesses -------------");
            });              
    }

    getByBusiness(obj) {
        var business = { BusinessCapability: obj }

        return this.http.fetch(`${baseUrl}/FinalReviewer`, {
                method: "POST",
                headers: { 'content-type': 'application/json' }, body: JSON.stringify(business)
            }).then(response => {
                return response.json();
            })
            .catch(error => {
                console.log("----- error getting reviewers -------------");
            }); 
    }

    
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