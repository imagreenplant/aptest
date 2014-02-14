casper.test.comment('BVT: bio page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/biography/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, {name:"Lady Gaga", alias:"lady-gaga", brand:"MTV"}, "bio");
});

casper.run(function() {
    this.test.done();
});