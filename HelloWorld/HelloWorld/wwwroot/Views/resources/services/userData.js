import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let baseUrl = "Users";

@inject(HttpClient)
export class UserData {
    http;
    constructor(httpClient) {
        this.http = httpClient;
    }
    //static inject() { return [HttpClient] }
    search(text) {
        console.log("UserData :: search");
        return this.http.get(`${baseUrl}/Search/${text}`)
            .then(response => {
                return response.content;
            })
            .catch(error => {
                alert("----- error getting user from server -------------");
            });
    }

    searchById(id) {
        console.log("UserData :: searchById");
        return this.http.get(`${baseUrl}/SearchById/${id}`)
            .then(response => {
                return response.content;
            })
            .catch(error => {
                alert("----- error getting user from server -------------");
            });
    }

    getAll() {
        alert("UserData :: getAll");
        return this.http.get(baseUrl)
            .then(response => {
                return response.content;
            })
            .catch(error => {
                alert("----- error getting users -------------");
            });
    }
}