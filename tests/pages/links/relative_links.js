var links = [
    'artists/collections/CMT-Crossroads/896718',
    'artists/collections/CMT-Edge/896711',
    'artists/',
    'artists/startyear/1999/',
    'artists/genre/country/',
    'artists/brad-paisley/related-artists/',
    'artists/lady-antebellum/related-artists/?filter=influencedBy',
    'artists/garth-brooks/related-artists/?filter=followers',
];

casper.start().each(links, function(self, link) {
    self.thenOpen(this.environment.cmt + link, function() {
        this.echo("Opened: " + this.getTitle(), "INFO");
        // Test to make sure a CMT owned collection, when linked under mtv.com domain, 
        // will redirect to be under a CMT domain.
        this.test.assertUrlMatch(cmtpattern, 'Domain successfully served from CMT. MLAP-1387');
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