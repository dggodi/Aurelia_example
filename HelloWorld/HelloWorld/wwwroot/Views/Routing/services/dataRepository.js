import {eventsData} from './eventsData';
import moment from 'moment';

function filterAndFormat(pastOrFuture, events) {
    // clone the events data so the data is not modifed in the cache 
    var results = JSON.parse(JSON.stringify(events));

    // if pastOrFuture has no value its the current time
    if (pastOrFuture == 'past') {
        // momment is the curretn time
        results = results.filter(item => moment(item.dateTime) < moment());
    }
    else if (pastOrFuture == 'future') {
        results = results.filter(item => moment(item.dateTime) > moment());
    }
    else {
        results = results;
    }
    results.forEach(item => {
        var dateTime = moment(item.dateTime)
            .format("MM/DD/YYYY HH:mm");
        item.dateTime = dateTime;
    });

    return results;
}

export class DataRepository {

    constructor() {
    }

    getEvents() {
        var promise = new Promise((resolve, reject) => {
            if (!this.events) {
                setTimeout(time => {
                    this.events = eventsData;

                    var sorted = this.events.sort((a, b) =>
                        a.dateTime >= b.dateTime ? 1 : -1);
                    this.events = sorted;

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