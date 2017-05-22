export class Events {
	configureRouter(config, router) {
		this.router = router;
		config.title = 'Events';
		config.map([
        {
            route: ['', 'future'], moduleId: './eventsList', 
			title: 'Future Events', nav: true, name: 'future'},
        {
            route: 'past', moduleId: './eventsList', 
            title: 'Past Events', nav: true, href: '#/events/past', name: 'past'}
		]);
	}

}