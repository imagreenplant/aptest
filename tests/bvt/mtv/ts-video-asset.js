var test_data = { 
	name:"The SAWG", 
	alias:"the-sawg", 
	brand:"mtv", 
	video:"Big Buck Bunny (Explicit)",
	id:"17"
}

casper.test.comment('BVT: MTV topspin video asset page.');

casper.start(casper.environment.mtv + 'artists/the-sawg/videos/17/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "ts_video_asset");
});

casper.run(function() {
    this.test.done(5);
});