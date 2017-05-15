import {MovieData} from "../../../DataHandlers/movieData"
import {inject} from "aurelia-framework"

@inject(MovieData)
export class MovieSelect {
    message = "movie-select"
    constructor(MovieData) {
        this.MovieData = movieData;
        alert("MovieSelect :: constructor")
        Test();
    }

    Test() {
        alert("MovieSelect :: error")
        return this.movieData.getAll()
            .then(movies => { this.movies = movies })
            .catch(error => { alert("MovieSelect :: error")});
    }
}