import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";

let baseUrl = "Users";
let timeout = 200;

@inject(HttpClient)
export class UserData {
    http;

    constructor(httpClient) {
        this.http = httpClient;
    }

    postRicSubmission(RequestTable) {
        var requestTable = { RequestTable: RequestTable }

        return this.http.fetch(`${baseUrl}/SumbitForm`, {
            method: "POST",
            headers: { 'content-type': 'application/json' }, body: JSON.stringify(requestTable)
        }).then(response => {
            return response.json();
        })
            .catch(error => {
                console.log("----- error getting reviewers -------------");
            }); 
    }

}