casper.test.comment('Testing if Topspin tip jar switch is honored by AP.');

casper.start(casper.environment.mtv + 'artists/the-sawg/', function() {
    this.echo("Opening "+this.getCurrentUrl());
    this.test.assertExists('li#activity-leave-tip', 'Tip Jar is shown on the SAWG (opted in).');
});

casper.thenOpen(casper.environment.mtv + 'artists/artist-platform-test/', function() {
    this.echo("Opening "+this.getCurrentUrl());
    this.test.assertNotExists('li#activity-leave-tip', 'Tip Jar is NOT shown on artist-platform-test (opted out).');
});



if (casper.environment.env !== "live") {
    casper.run(function() {
        this.test.done(2);
    });
}
else {
    casper.echo("This test was not meant to be run on live.  Skipping.");
    this.test.done();
}
