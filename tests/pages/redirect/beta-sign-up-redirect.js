var base_domain = casper.environment.mtv;
var tested_url = "artist-platform/sign-up/";

//Tests that the artist platform sign-up page has been redirect to AP home.
//http://jira.mtvi.com/browse/MLAP-1890
casper.start(base_domain+tested_url, function() {
	this.echo(this.getCurrentUrl());
    this.test.assertEquals(this.getCurrentUrl(),"http://www.mtv.com/artists/", "Redirect old beta sign-up page to /artists/ home page.");
});

if (casper.environment.env !== "live") {
    // This should not be used on Dev/Q as the redirect was not setup on either.
    casper.echo("This test file is not meant to be used with DEV or Q environments.", "INFO");
    casper.test.done();
}
else {
    casper.run(function() {
        this.test.done();
    });
}
