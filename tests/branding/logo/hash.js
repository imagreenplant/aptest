// Tests that a #hash tag properly brands different pages.

// Need to use origin here.  Pushing the hash through a redirect won't work
// unless you are going through origin.
var m = casper.environment.origin.mtv;
var v = casper.environment.origin.vh1;
var c = casper.environment.origin.cmt;


var links = [
	m+"artists/",
	m+"artists/lady-gaga/",
	m+"artists/the-sawg/",
    m+"artists/collections/jersey-shore/896427/",
	v+"artists/",
	v+"artists/carrie-underwood/",
    c+"artists/collections/concrete-country/896714/",   //CMT Collection
	c+"artists/",										
	c+"artists/collections/vh1-classic/896674/"         //VH1 Collection
];

var brands = ["logotv"]; //, "wrong", ""];

casper.start().each(links, function(that,link) {
    that.each(brands, function(self,brand) {
        self.then( function() {
            this.clear();
            this.echo("Opening " + link+"#"+brand,"INFO");
        });

        self.thenOpen(link+"#"+brand, function() {
            this.echo("Loaded " + this.getCurrentUrl(), "COMMENT");
            if (brand === "logotv") {
                this.test.assertExists('a#logo.logotv',"Found 'logotv' class on logo element");
                this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
                this.test.assertNotExists('a#logo.vh1',"Did NOT find 'vh1' class on logo element");
                this.test.assertNotExists('a#logo.cmt',"Did NOT find 'cmt' class on logo element"); 
            }
        });

		self.then(function(){
			// Clears out cookies and cache, to be able to re-create a new branding session
			this.clear();
		});
    });
});

casper.run(function(){
	this.test.done();
});

