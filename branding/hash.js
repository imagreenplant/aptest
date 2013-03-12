// Tests that a #hash tag properly brands different pages.

var links = [
	"http://www.mtv-d.mtvi.com/artists/",
	"http://www.mtv-d.mtvi.com/artists/lady-gaga/",
	"http://www.mtv-d.mtvi.com/artists/james-brown/",
	"http://www.mtv-d.mtvi.com/artists/the-sawg/",
	"http://www.cmt-d.mtvi.com/artists/",
	"http://www.cmt-d.mtvi.com/artists/carrie-underwood/",
	"http://www.cmt-d.mtvi.com/artists/brad-paisley/",
	"http://www.vh1-d.mtvi.com/artists/collections/concrete-country/896714/", 	//CMT Collection
	"http://www.vh1-d.mtvi.com/artists/",										//VH1 Collection
	"http://www.vh1-d.mtvi.com/artists/collections/vh1-classic/896674/"
];

var brands = ["mtv", "vh1", "cmt", "wrong", ""];

casper.start().each(links, function(self,link) {
    self.each(brands, function(self,brand) {
    	this.then( function() {
    		this.clear();
    	});

    	this.thenOpen(link+"#"+brand, function() {
        	this.echo(this.getCurrentUrl(), "INFO");
        });
        
    	this.then(function() {
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

		this.then(function(){
			// Clears out cookies and cache, to be able to re-create a new branding session
			this.clear();
		});
    });
});

casper.run(function(){
	this.test.done();
});

