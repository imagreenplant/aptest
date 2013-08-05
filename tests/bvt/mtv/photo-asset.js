var test_data = { 
	name:"Rihanna", 
	alias:"rihanna", 
	brand:"mtv", 
	photo_name:"Rihanna and Katy Perry on the scene at the 2012 MTV Video Music Awards in Los Angeles",
	caption:"Rihanna and Katy Perry on the scene at the 2012 MTV Video Music Awards in Los Angeles",
	photo_id:"7473278"
};

casper.test.comment('BVT: MTV photo asset page.');

casper.start(casper.environment.mtv + 'artists/rihanna/photos/7473278/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, test_data , "photo_asset");
});

casper.run(function() {
    this.test.done(5);
});