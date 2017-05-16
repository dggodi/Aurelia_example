export class App {
    configureRouter(config, router) {
        this.router = router;

        config.title = "Aurelia";
        config.map([
            // , location, name of route, include route in 
            // route    - url pattern of route
            // name     - name of route
            // moduleId - path to view
            // title    - title to doc
            // nav      - include in navigation bar
            { route: ["", "welcome"], name: "welcome", moduleId: "./welcome", title: "welcome", nav: true },
            { route: "hi", name: "hi", moduleId: "./hi", title: "Hi", nav: true },
            { route: "list", name: "list", moduleId: "../Movies/list", title: "List", nav: true },
            { route: "user", name: "user", moduleId: "../Users/list", title: "User", nav: true },
            { route: "author", name: "author", moduleId: "../Users/search", title: "Author", nav: true }
       ]);
    }
}