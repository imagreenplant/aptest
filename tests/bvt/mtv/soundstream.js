casper.test.comment('BVT: MTV soundstream page.');

casper.start(casper.environment.mtv + 'artists/the-sawg/soundstream/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, { name:"The SAWG", alias:"the-sawg", brand:"mtv" }, "soundstream");
});

casper.run(function() {
    this.test.done(5);
});