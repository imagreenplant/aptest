var links = [
    'artists/collections/testing/896498/',
];

//Tests for cmt domain, that the link was properly redirected.
var urlpattern = new RegExp ('^'+casper.environment.logo+'artists/');

casper.start().each(links, function(self, link) {
    self.then(function() {
        self.echo("Attempting to open: " + this.environment.mtv + link, "INFO");
    });
    self.thenOpen(this.environment.mtv + link, function() {
        this.echo("Loaded " + this.getCurrentUrl(), "COMMENT");
        // Test to make sure a Logo owned collection, when linked under mtv.com domain, 
        // will redirect to be under a Logo domain.
        this.test.assertUrlMatch(urlpattern, 'Collection successfully served from Logo domain.');
    });
});

if (casper.environment.env == "dev") {
    // Adding messaging.  This should not be used on Dev because the redirects are not in place
    // there.  
    casper.echo("This test file is not meant to be used with the DEV environment.", "INFO");
    casper.test.done();
}
else {
    casper.run(function() {
        this.test.done();
    });
}