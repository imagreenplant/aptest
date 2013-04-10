casper.start(casper.environment.cmt + "artists/joey-rory/", function() {
	this.echo("Opening " + this.getCurrentUrl(), "COMMENT");
});

casper.then(function() {
	this.test.assertExists('h1[itemprop=name]', "H1 with meta tag 'name' found");
	this.test.assertExists('#profile-details-navi', "Header information <ul> exists: bio, hometown...");
	this.test.assertEquals(this.fetchText('h1[itemprop=name]'), "Joey + Rory", "Should find text 'Joey + Rory' in h1");
});

casper.run(function() {
	this.test.done();
});