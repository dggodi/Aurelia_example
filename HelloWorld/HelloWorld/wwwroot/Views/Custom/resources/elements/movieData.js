import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let baseUrl = "Movies";

@inject(HttpClient)
export class MovieData {

    constructor(httpClient) {
        this.http = httpClient;
    }

    getById(id) {
        return this.http.get(`${baseUrl}/${id}`)
            .then(response => response.content);
    }

    getAll() {
        //alert("MovieData :: getAll");
        return this.http.get(baseUrl)
            .then(response => {
                return response.content;
            }).catch(error => {
                alert("----- error getting movies -------------");
            });
    }

    save(movie) {
        var request = this.http.createRequest();
        request.asPut()
            .withUrl(baseUrl)
            .withHeader("Accept", "application/json")
            .withHeader("Content-Type", "application/json")
            .withContent(movie);

        return request.send().then(response => response.content);
    }
    
}