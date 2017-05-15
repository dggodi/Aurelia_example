import { inject } from 'aurelia-framework';
import { WebAPI } from './resources/services/web-api';

@inject(WebAPI)
export class App {

    constructor(api) {
        this.api = api;
    }

    configureRouter(config, router) {
        this.router = router;

        config.title = "Contacts";

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
            { route: ['', 'no-selection'], name: 'Select', moduleId: './no-selection', title: 'Select', nav: true },
            { route: 'contacts/:id', name: 'contacts', moduleId: './contact-detail', title: 'Contact', nav:false}
       ]);
    }
}