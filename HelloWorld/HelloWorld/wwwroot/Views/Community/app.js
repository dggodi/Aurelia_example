
// swaps out views in a single page 
export class App {
    // this method is called when a URL is addressed by the client side 
    // also this method defines routes that matches the calling client side
    // config   - 
    // router   - router ref used to dynamically generate nav links
    configureRouter(config, router) {
        // defines a property that can use the router
        this.router = router;

        config.title = "Community";

        var handleUnknownRoutes = (instruction) => {
            return { route: 'not-found', moduleId: './not-found' };
        }

        config.mapUnknownRoutes(handleUnknownRoutes);

        // defines individual routes with properties within a array
        // properties:
        // route    - defines the relative path used in the address bar
        // name     - name of route
        // moduleId - specifies the module to use when the route is activated
        // title    - title shown in tab of browser
        // nav      - boolean, include in the route navigation collection (nav bar)
        config.map([
            
            { route: ["", "shell"], name: "shell", moduleId: "./parent_child/shell", title: "parent_child", nav: true },
            { route: "events", name: "events", moduleId: "./sub-views/shell", title: "events", nav: true },
            { route: "inject", name: "inject", moduleId: "./inject/shell", title: "inject", nav: true },
            { route: "resolvers", name: "resolvers", moduleId: "./resolvers/shell", title: "resolvers", nav: true },
            { route: "routing", name: "routing", moduleId: "./routing/shell", title: "routing", nav: true },
            { route: "jobs", name: "jobs", moduleId: "./routing/jobs/jobs", title: "jobs", nav: true },
            { route: "discussion", name: "discussion", moduleId: "./routing/discussion/discussion", title: "discussion", nav: true }
        ]);
    }
}