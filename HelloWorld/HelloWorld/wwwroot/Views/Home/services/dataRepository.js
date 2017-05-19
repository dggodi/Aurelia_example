import {eventsData} from './eventsData';

export class DataRepository {
    constructor() {
        this.events = eventsData;
    }

    getEvents() {
        var promise = new Promise((resolve, reject) => {
            if (!this.events) {
                setTimeout(_ => {
                    this.events = eventsData;     
                    resolve(this.events);
                }, 2000);
            }
            else {
                resolve(this.events);
            }
        });
        return promise;
    }

	getEvent(eventId) {
		return this.events.find(item => item.id == eventId);
	}
}