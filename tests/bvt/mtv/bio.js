casper.test.comment('BVT: bio page.');

casper.start(casper.environment.mtv + 'artists/taylor-swift/biography/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, {name:"Taylor Swift", alias:"taylor-swift", brand:"Mtv"}, "bio");
});

casper.run(function() {
    this.test.done();
});