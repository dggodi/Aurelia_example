// Lazy - Injects a function used to create an instance of of that class when needed 
import { inject, Lazy, All } from 'aurelia-framework'
import { ImLazy } from './ImLazy';
import { PlugIn1 } from './plugin1';
import { PlugIn2 } from './plugin2';
import { DataCache } from './dataCache';
import { DataRepository } from './services/dataRepository'

@inject(DataCache, Lazy.of(ImLazy), PlugIn1, PlugIn2, DataRepository)
export class Events {

    constructor(dataCache, lazyOfImLazy, plugin1, plugin2, dataRepository) {
        this.dataRepository.getEvents().then(events => this.events = events);
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

    createAndUseLazy() {
        console.log("about to use lazy");
        this.lazyOfImLazy().doStuff();
    }
}