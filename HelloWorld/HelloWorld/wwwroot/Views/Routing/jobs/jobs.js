export class Jobs {

    // called before activate method
    // if true navigate to view : else cancel navigation
    canActivate(params, routeConfig) {
        var promise = new Promise((resolve, reject) => {
            setTimeout(_ => {
                resolve(false);
            }, 3000);
        });
        return promise;
    }
}