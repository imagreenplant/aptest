casper.test.comment('BVT: Logo home page.');

casper.start(casper.environment.logo + 'artists/', function() {
	this.echo("Loaded " + this.getCurrentUrl(), "COMMENT");
    this.test.assertTitle("Artists.Logo | Discover Music Artists and Bands | LOGO", 
        "Title is equal to Artists.Logo | Discover Music Artists and Bands | LOGO");
    this.test.assertEvalEquals(function() {
            return __utils__.findOne('meta[property="og:title"]').content;
			},	'Artists.Logo | Discover Music Artists and Bands',
			'og:title is equal to "Artists.Logo | Discover Music Artists and Bands"'
	);
	this.test.assertEvalEquals(function() {
            return __utils__.findOne('meta[name="description"]').content;
        	},	'Find the largest selection of popular artists and best bands on Artists.Logo. Plus, get ' + 
        		'the latest official updates from Facebook, Twitter, and listen to free music.',
        	'meta description is equal to "Find the largest selection of popular artists and best bands on Artists.Logo..."'
	);
	this.test.assertEvalEquals(function() {
            return __utils__.findOne('meta[property="og:description"]').content;
			},  'Find the largest selection of popular artists and best bands on Artists.Logo. Plus, get the latest official ' + 
				'updates from Facebook, Twitter, and listen to free music.',
			'og:description is equal to "Find the largest selection of popular artists and best bands on Artists.Logo..."'
	);


});

casper.run(function() {
    this.test.done();
});