import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DataRepository } from '../services/dataRepository';

@inject(DataRepository, Router)
export class EventsList {
    constructor(dataRepository, router) {
        this.dataRepository = dataRepository;
        this.router = router;
    }

    activate(params) {
        this.dataRepository.getEvents().then(events => {
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
            this.events.forEach(item => item.detailUrl =
                this.router.generate('eventDetail', { eventId: item.id }));
        });
    }
}