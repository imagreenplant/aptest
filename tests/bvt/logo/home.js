casper.test.comment('BVT: Logo home page.');

casper.start(casper.environment.logo + 'artists/', function() {
	this.echo("Loaded " + this.getCurrentUrl(), "COMMENT");
    this.test.assertTitle("LogoTV Artists | Discover Music Artists and Bands | LogoTV", 
        "Title is equal to 'LogoTV Artists | Discover Music Artists and Bands | LogoTV'");
    this.test.assertEvalEquals(function() {
            return __utils__.findOne('meta[property="og:title"]').content;
			},	'LogoTV Artists | Discover Music Artists and Bands',
			'og:title is equal to "LogoTV Artists | Discover Music Artists and Bands"'
	);
	this.test.assertEvalEquals(function() {
            return __utils__.findOne('meta[name="description"]').content;
        	},	'Find the largest selection of popular artists and best bands on LogoTV' +
        	' Artists. Plus, get the latest official updates from Facebook, Twitter, and listen to free music.',
        	'meta description is equal to "Find the largest selection of popular artists and best bands on LogoTV..."'
	);
	this.test.assertEvalEquals(function() {
            return __utils__.findOne('meta[property="og:description"]').content;
			},  'Find the largest selection of popular artists and best bands on LogoTV Artists. ' + 
			'Plus, get the latest official updates from Facebook, Twitter, and listen to free music.',
			'og:description is equal to "Find the largest selection of popular artists and best bands on LogoTV	..."'
	);


});

casper.run(function() {
    this.test.done();
});