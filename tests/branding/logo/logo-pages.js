// Tests that a #hash tag properly brands different pages.

var l = casper.environment.logo;


var links = [
	l+"artists/",										
	// l+"artists/collections/vh1-classic/896674/"         //Logo Collection  (does not exist yet)
];

var brands = ["logotv"];

casper.start().each(links, function(that,link) {
    that.each(brands, function(self,brand) {
        self.then( function() {
            this.clear();
            this.echo("Opening " + link,"INFO");
        });

        self.thenOpen(link, function() {
            this.echo("Loaded " + this.getCurrentUrl(), "COMMENT");
            if (brand === "logotv") {
                this.test.assertExists('a#logo.logotv',"Found 'logotv' class on logo element");
            }
        });

		self.then(function(){
			// Clears out cookies and cache, to be able to re-create a new branding session
			this.clear();
		});
    });
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