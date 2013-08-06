casper.test.comment('BVT: MTV soundstream page.');

casper.start(casper.environment.mtv + 'artists/the-sawg/soundstream/', function() {
    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    notifyHiddenTests(this, "MLAP-2538");
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    // Removed because of failing cases.  See jira ticket above.
    // testSEOTagsForArtist(this, { name:"The SAWG", alias:"the-sawg", brand:"mtv" }, "soundstream");
});

casper.run(function() {
    this.test.done();
});