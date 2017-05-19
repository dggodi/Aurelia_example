

export class App {
    configureRouter(config, router) {
        this.router = router;

        config.title = "Aurelia";

        var handleUnknownRoutes = (instruction) => {
            return { route: 'not-found', moduleId: './not-found' };
        }

        config.mapUnknownRoutes(handleUnknownRoutes);

        config.map([
            // , location, name of route, include route in 
            // route    - url pattern of route
            // name     - name of route
            // moduleId - path to view
            // title    - title to doc
            // nav      - include in navigation bar
            { route: ["", "submit-form"], name: "submit-form", moduleId: "./Home/submit-form", title: "submit-form", nav: true },
            {
                route: 'events', moduleId: './Home/events/events',
                name: 'Events', title: 'Events', nav: true
            },
            { route: 'eventDetail/:eventId', moduleId: './Home/events/eventDetail', name: 'eventDetail' }
        ]);
    }
}