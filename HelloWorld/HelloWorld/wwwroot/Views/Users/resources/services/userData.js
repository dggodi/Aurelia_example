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
        console.log(`UserData :: getById  +  ${text}`);
        return this.http.get(`${baseUrl}/Search/${text}`)
            .then(response => {
                cosole.log(response.content);
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