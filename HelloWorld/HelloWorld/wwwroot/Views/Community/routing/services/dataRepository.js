import {eventsData} from './eventsData';
import moment from 'moment';
	
export class DataRepository {

    constructor() {
        this.events = eventsData;
    }

    getEvents() {
        var promise = new Promise((resolve, reject) => {
            if (!this.events) {
                setTimeout(time => {
                    this.events = eventsData;

                    eventsData.forEach(item => {
                        var dateTime = moment(item.dateTime).format("MM/DD/YYYY HH:mm");
                        item.dateTime = dateTime;
                    });

                    // returns a Promise object that is resolved with the given value
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