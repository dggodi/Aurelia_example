import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let baseUrl = "BusinessCapabilities";

@inject(HttpClient)
export class BusinessData {
    http;
    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        console.log("getAll");
        return this.http.get(baseUrl)
            .then(response => {
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
}