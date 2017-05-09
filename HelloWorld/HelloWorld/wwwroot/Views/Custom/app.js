// framework will call this method, passing it a RouterConfiguration and a Router
export class App {
    configureRouter(config, router) {
        this.router = router;

        config.title = "Aurelia";

        // route patterns to the modules that should handle the patterns
        config.map([
            // , location, name of route, include route in 
            // route    - url pattern of route
            // name     - name of route
            // moduleId - path to view
            // title    - title to doc
            // nav      - include in navigation bar
            { route: ["", "welcome"], name: "welcome", moduleId: "./welcome", title: "welcome", nav: true },
            { route: 'contacts/:id', moduleId: 'contact-detail', name: 'contacts' },
            { route: "hi", name: "hi", moduleId: "./hi", title: "Hi", nav: true },
            { route: "next", name: "next", moduleId: "./next", title: "Next", nav: true }
        ]);
    }
}