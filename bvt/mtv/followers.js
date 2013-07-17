var test_data = { 
	name:"David Bowie", 
	alias:"david-bowie", 
	brand:"mtv", 
};

casper.test.comment('BVT: MTV followers page.');

casper.start(casper.environment.mtv + 'artists/david-bowie/related-artists/?filter=followers', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "followers");
});

casper.run(function() {
    this.test.done(5);
});