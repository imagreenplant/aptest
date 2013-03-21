// Tests that a #hash tag properly brands different pages.


// Need to use origin here.  Pushing the hash through a redirect won't work
// unless you are going through origin.
var m = casper.environment.origin.mtv;
var v = casper.environment.origin.vh1;
var c = casper.environment.origin.cmt;


var links = [
	m+"artists/",
	m+"artists/lady-gaga/",
	m+"artists/james-brown/",
	m+"artists/the-sawg/",
	v+"artists/",
	v+"artists/carrie-underwood/",
	v+"artists/brad-paisley/",
	c+"artists/collections/concrete-country/896714/", 	//CMT Collection
	c+"artists/",										//VH1 Collection
	c+"artists/collections/vh1-classic/896674/"
];

var brands = ["mtv", "vh1", "cmt"]; //, "wrong", ""];

casper.start().each(links, function(that,link) {
    that.each(brands, function(self,brand) {
    	self.then( function() {
    		this.clear();
    	});

    	self.thenOpen(link+"#"+brand, function() {
    		this.echo(link+"#"+brand,"INFO");
        	this.echo(this.getCurrentUrl(), "COMMENT");
        });
        
    	self.then(function() {
    		if (brand === "mtv") {
    			this.test.assertExists('a#logo.mtv',"Found 'mtv' class on logo element");
				this.test.assertNotExists('a#logo.vh1',"Did NOT find 'vh1' class on logo element");
				this.test.assertNotExists('a#logo.cmt',"Did NOT find 'cmt' class on logo element");	
    		}
    		else if (brand === "vh1") {
    			this.test.assertExists('a#logo.vh1',"Found 'vh1' class on logo element");
				this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
				this.test.assertNotExists('a#logo.cmt',"Did NOT find 'cmt' class on logo element");
    		}
    		else if (brand === "cmt") {
    			this.test.assertExists('a#logo.cmt',"Found 'cmt' class on logo element");
				this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
				this.test.assertNotExists('a#logo.vh1',"Did NOT find 'vh1' class on logo element");
    		}

    	// 	else {
    	// 		// Need to test for case where brand is not available
    	// 		this.debugHTML('#page_navigation');
    	// 		var l = this.getCurrentUrl();
    	// 		var b = l.split('/')[2].split('.')[1]
    	// 		this.echo("testing ............. L = "+l+" and B ="+ b);
    			
    	// 		if (b.indexOf('mtv') > -1)  {
    	// 			this.echo('MTV domain found');
	    // 			this.test.assertExists('a#logo.mtv',"Found 'mtv' class on logo element");
					// this.test.assertNotExists('a#logo.vh1',"Did NOT find 'vh1' class on logo element");
					// this.test.assertNotExists('a#logo.cmt',"Did NOT find 'cmt' class on logo element");	
	    // 		}
	    // 		else if (b.indexOf('vh1') > -1) {
	    // 			this.echo('VH1 domain found');
	    // 			this.test.assertExists('a#logo.vh1',"Found 'vh1' class on logo element");
					// this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
					// this.test.assertNotExists('a#logo.cmt',"Did NOT find 'cmt' class on logo element");
	    // 		}
	    // 		else if (b.indexOf('cmt') > -1) {
	    // 			this.echo('CMT domain found');
	    // 			this.test.assertExists('a#logo.cmt',"Found 'cmt' class on logo element");
					// this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
					// this.test.assertNotExists('a#logo.vh1',"Did NOT find 'vh1' class on logo element");
	    // 		}
    	// 	}
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

