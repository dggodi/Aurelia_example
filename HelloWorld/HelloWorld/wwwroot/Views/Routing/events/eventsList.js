// Lazy - Injects a function used to create an instance of of that class when needed 
import { inject, Lazy, All } from 'aurelia-framework'
import { ImLazy } from '../plugins/ImLazy';
import { PlugIn1 } from '../plugins/plugin1';
import { PlugIn2 } from '../plugins/plugin2';
import { DataCache } from '../services/dataCache';
import { DataRepository } from '../services/dataRepository'
import { Router, activationStrategy} from 'aurelia-router'

@inject(DataCache, Lazy.of(ImLazy), PlugIn1, PlugIn2, DataRepository, Router)
export class EventsList {

    constructor(dataCache, lazyOfImLazy, plugin1, plugin2, dataRepository, router) {
        console.log("EventsList :: constructor");
        this.dataRepository = dataRepository;
        this.router = router;
        this.cache = dataCache;
        this.cache.data.push('a');
        this.lazyOfImLazy = lazyOfImLazy;

        let plugins = [];
        plugins.push(plugin1);
        plugins.push(plugin2);

        plugins.forEach(function (plugIn) {
            plugIn.doPlugInStuff();
        });
    }

    activate(params, routeConfig) {
        console.log("EventsList :: activate");
        //var pastOrFuture = routeConfig.name == '' ? 'future' : routeConfig.name;
        //return this.dataRepository.getEvents(pastOrFuture).then(events => {
        return this.dataRepository.getEvents().then(events => {
            if (params.speaker || params.topic) {
                var filteredResults = [];
                events.forEach(item => {
                    if (params.speaker && item.speaker.toLowerCase()
                        .indexOf(params.speaker.toLowerCase()) >= 0) {
                        filteredResults.push(item);
                    }
                    if (params.topic && item.title.toLowerCase()
                        .indexOf(params.topic.toLowerCase()) >= 0) {
                        filteredResults.push(item);
                    }
                });
                this.events = filteredResults;
            }
            else {
                this.events = events;
            }

            // get a url route foreach each event from the router
            this.events.forEach(item => item.detailUrl =
                this.router.generate('eventDetail', { eventId: item.id }));
        });
    }

    createAndUseLazy() {
        console.log("about to use lazy");
        this.lazyOfImLazy().doStuff();
    }

    goToDiscussion() {
        this.router.navigate('#/discussion')
        //this.router.navigateToRoute('eventDetail', {eventId: this.events[0].id});
    }

    canActivate() {
        console.log("EventsList :: canActivate");
        return true;
    }

    canDeactivate() {
        console.log("EventsList :: canDeactivate");
        return true;
    }

    deactivate() {
        console.log("EventsList :: deactivate");
        return true;
    }

    determineActivationStrategy() {
        console.log("determineActivationStrategy called");
        return activationStrategy.replace;
    }
}