var test_data = { 
	name:"The SAWG", 
	alias:"the-sawg", 
	brand:"mtv", 
	track:"Test",
	album:"Test",
	description: "",
	id:"284"
}

casper.test.comment('BVT: MTV track asset page.');

casper.start(casper.environment.mtv + 'artists/the-sawg/tracks/284/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "track_asset");
});

casper.run(function() {
    this.test.done(5);
});