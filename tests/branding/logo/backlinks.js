var links = [
	{link: "http://www.logotv.com/", text: "LogoTV.com"},
	{link: "http://www.afterellen.com/", text: "AfterEllen.com"},
	{link: "http://www.thebacklot.com/", text: "TheBacklot.com"},
	{link: "http://www.downelink.com/", text: "TheDowneLink.com"},
	{link: "http://www.newnownext.com/", text: "NewNowNext.com"},
]

casper.reporting.check_headers_for_main = true;

function referral_test (casp,test_link_object) {

	// I have to add the url paramater here to get around the limitation that
	// thenEvaluate() executes within the DOM, and we can't pass variables into it.
	var fakeReferrer = test_link_object.link + "?env=" + casper.environment.mtv.slice(7,-5); //.slice(0,-5);
	casp.echo("Loading: " + fakeReferrer, "COMMENT");

	casp.thenOpen(fakeReferrer, function() {
		this.echo("Loaded: " + this.getCurrentUrl());
	});
	 
	// Currently this can only test DEV env.  thenEvaluate is executed within the sandbox of the DOM
	// itself, therefore I can't pass a target href into this function.
	casp.thenEvaluate(function() {
		//helper function to parse variables from the url 
		var getUrlVars = function(v) {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			if(v===undefined) {
				return vars;
			} else {
				if(vars[v] !== undefined) {
					return vars[v];
				} else {
					return false;
				}
			}
		};

		console.log("This is the new url:" + window.location.href);
		
		var newhref = getUrlVars()["env"] + ".com/";
	    var link = document.createElement('a');
	    link.setAttribute('href', 'http://' + newhref + 'artists/');
		link.setAttribute('id', "myTargetUrl");
		document.body.appendChild(link);
	});
	 

	casp.then(function() {
		if (this.exists('#myTargetUrl')) {
	        this.echo('Forwarding to site with referrer', 'INFO');
		}
		this.click('a#myTargetUrl');
	});

	casp.waitForSelector("a#logo");
	casp.waitForSelector("a#back-to-mtv");

	casp.then(function() {
		takePicture(this);
		this.test.assertExists('a#logo.logotv',"The artists.Logo logo shows in upper left.");
		// this.echo(this.exists("a#back-to-mtv"));
		// this.echo(this.fetchText('a#back-to-mtv'));
		this.test.assertEquals(this.fetchText('a#back-to-mtv'), test_link_object.text, "Backlink text matches " + test_link_object.text);
	});
	// casp.clear();
}

casper.start('').viewport(1400,3000);

casper.each(links, function(self,link) {
	referral_test(self, link);
});

casper.run(function() {
	this.test.done();
});