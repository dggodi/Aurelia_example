import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let baseUrl = "Users";
let timeout = 200;

@inject(HttpClient)
export class UserData {
    http;

    constructor(httpClient) {
        this.http = httpClient;
    }

    search(text) {
        return new Promise(resolve => {
            setTimeout(() => {
                let found = this.http.get(`${baseUrl}/Search/${text}`)
                    .then(response => {
                        return response.content;
                    })
                    .catch(error => {
                        alert("----- error getting user from server -------------");
                    });
                resolve(found);
            }, timeout);
        });
    }

    searchById(id) {
        return new Promise(resolve => {
            setTimeout(() => {
                let found = this.http.get(`${baseUrl}/SearchById/${id}`)
                    .then(response => {
                        return response.content;
                    })
                    .catch(error => {
                        alert("----- error getting user from server -------------");
                    });
                resolve(found);
            }, timeout);
        });
    }

    getAll() {
        return new Promise(resolve => {
            setTimeout(() => {
                let found = this.http.get(`${baseUrl}`)
                    .then(response => {
                        return response.content;
                    })
                    .catch(error => {
                        alert("----- error getting user from server -------------");
                    });
                resolve(found);
            }, timeout);
        });
    }
}