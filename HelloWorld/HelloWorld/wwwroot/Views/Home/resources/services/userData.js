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

    getAll() {
        return this.http.fetch(`${baseUrl}/AllUsers`)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log("----- error getting users -------------");
            });
    }

    search(name) {
        return this.http.fetch(`${baseUrl}/SearchByName?name=${name}`, {
            method: "GET",
            headers: { 'content-type': 'application/json' }
        })
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log("----- error getting reviewers -------------");
            });
    }

    searchById(id) {
        return this.http.fetch(`${baseUrl}/SearchById?id=${id}`)
            .then(response => {
                return response.json();
            })
            .catch(error => {
                console.log("----- error getting reviewers -------------");
            });
    }
}

