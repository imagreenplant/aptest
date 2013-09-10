var test_data = { 
	name:"The SAWG", 
	alias:"the-sawg", 
	brand:"mtv", 
	photo_name:"2704 × 2058, 1.2MB",
	caption:"2704 × 2058, 1.2MB",
	mgid:"topspin:202"
}

casper.test.comment('BVT: MTV topspin photo asset page.');

casper.start(casper.environment.mtv + 'artists/the-sawg/photos/topspin:202', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "topspin_photo_asset");
});

if (casper.environment.env !== "dev") {
    // This should not be used on Dev/Q as the redirect was not setup on either.
    casper.echo("This test file is not meant to be used with the Q or LIVE environments.", "INFO");
    casper.test.done();
}
else {
    casper.run(function() {
        this.test.done();
    });
}