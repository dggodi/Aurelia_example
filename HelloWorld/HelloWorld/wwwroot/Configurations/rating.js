import { LogManager } from 'aurelia-framework';
import { ConsoleAppender } from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

// configures how the aurelia app is created
export function configure(aurelia) {

    aurelia.use
        .standardConfiguration()  // contains standard configuration settigns
        .developmentLogging()
        .plugin('aurelia-dialog', (settings) => {
            settings.useDefaults();
            settings.lock = true;
            settings.centerHorizontalOnly = true;
            settings.startingZIndex = 5;
        });

    // .globalResources('')  location of global resources
    // .plugins('')          global custom elements

    // returns a promise if the aurelia app is created succesfully
    // setRoot tells aurelia what files to load, app.js by defualt
    aurelia.start().then(a => a.setRoot('/wwwroot/views/Rating/app'));
};