var test_data = { 
	name:"Madonna", 
	alias:"madonna", 
	brand:"mtv", 
	playlist_name:"Power Trippin'",
	playlist_id:"1692827"
}

casper.test.comment('BVT: MTV playlist asset page.');

casper.start(casper.environment.mtv + 'artists/madonna/playlist/1692827/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "playlist_asset");
});

casper.run(function() {
    this.test.done(5);
});