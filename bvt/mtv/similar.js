var test_data = { 
	name:"Blur", 
	alias:"blur", 
	brand:"mtv", 
};

casper.test.comment('BVT: MTV similar artists page.');

casper.start(casper.environment.mtv + 'artists/blur/related-artists/?filter=similar', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "similar");
});

casper.run(function() {
    this.test.done(5);
});