//import {inject} from "aurelia-framework";
import {MovieData} from "../../DataHandlers/movieData";

//@inject(MovieData)
export class List {

    movies = [];

    constructor(movieData) {        
        this.movieData = movieData;
    }

    static inject() { return [MovieData] }

    activate() {
        //alert("List :: getAll");
        return this.movieData
            .getAll()
            .then(movies => this.movies = movies)
            .catch(error => {
                alert("----- error getting moviedata -------------");
            });;
    }

}


