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
            {
                route: ['', 'events'],
                viewPorts: {
                    mainContent: { moduleId: './events/events' },
                    sideBar: { moduleId: './sideBar/sponsors' }
                },
                name: 'Events', title: 'Events', nav: true
            },
            {
                route: 'jobs', viewPorts: {
                    mainContent: { moduleId: './jobs/jobs' },
                    sideBar: { moduleId: './sideBar/sponsors' }
                },
                title: 'Jobs', nav: true
            },
            {
                route: 'discussion', viewPorts: {
                    mainContent: { moduleId: './discussion/discussion' },
                    sideBar: { moduleId: './sideBar/ads' }
                },
                title: 'Discussion', nav: true
            },
            {
                route: 'eventDetail/:eventId', viewPorts: {
                    mainContent: { moduleId: './events/eventDetail' },
                    sideBar: { moduleId: './sideBar/ads' }
                }, name: 'eventDetail'
            }
        ]);
    }
}