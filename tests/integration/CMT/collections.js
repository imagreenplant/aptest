var links = [
    'artists/collections/CMT-Crossroads/896718',
    'artists/collections/CMT-Edge/896711',
    'artists/collections/CMT-Listen-Up/896712',
    'artists/collections/CMT-On-Tour/896713',
    'artists/collections/CMT-Concrete-Country/896714',
    'artists/collections/Live-at-CMT/896715',
    'artists/collections/Unplugged/896716'
];

//Tests for cmt domain, that the link was properly redirected.
var cmtpattern = new RegExp ('^'+casper.environment.cmt+'artists/');

casper.start().each(links, function(self, link) {
    self.then(function() {
        self.echo("Attempting to open: " + this.environment.mtv + link, "INFO");
    });
    self.thenOpen(this.environment.mtv + link, function() {
        this.echo(this.getTitle());
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