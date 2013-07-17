var test_data = { 
	name:"No Doubt", 
	alias:"no-doubt", 
	brand:"mtv", 
};

casper.test.comment('BVT: MTV influenced By page.');

casper.start(casper.environment.mtv + 'artists/no-doubt/related-artists/?filter=influencedBy', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "influencers");
});

casper.run(function() {
    this.test.done(5);
});