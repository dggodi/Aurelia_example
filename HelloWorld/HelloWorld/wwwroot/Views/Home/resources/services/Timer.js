import { transient } from 'aurelia-framework';

let timeOut = false;

function mytimer(ms) {
    let timer, promise;
    promise = new Promise(function (resolve, reject) {

        timer = setTimeout(() => {
            resolve(timerInterval(ms));
        }, 1000 * ms);

    });

    return { promise: promise, cancel: function () { clearTimeout(timer); } }
}

function timerInterval(interval) {
    let counter = setInterval(() => {
        interval--;
        if (interval <= 0) {
            clearInterval(counter);
            timeOut = true;
        }
    }, 1000);
}

@transient()
export class Timer {

    timerHandle;
    duration;

    constructor(duration = 5) {
        this.duration = duration;
    }

    start() {
        clearTimeout(this.timerHandle);
        this.timerHandle = mytimer(this.duration);
    }

    cancel() {
        clearTimeout(this.timerHandle);
        timeOut = true
    }

    isTimeout() {
        return timeOut;
    }
}