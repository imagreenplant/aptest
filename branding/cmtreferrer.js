var fakeReferrer = "http://cmt.com";
var targetURL = 'http://www.mtv-d.mtvi.com/artists/';
 
var utils = require('utils');

casper.start(fakeReferrer, function() {
	this.echo(this.getCurrentUrl());
});
 
casper.thenEvaluate(function(targetURL) {
    var link = document.createElement('a');
	link.setAttribute('href', 'http://www.mtv-d.mtvi.com/artists/');
	link.setAttribute('id', "myTargetUrl");
	document.body.appendChild(link);
});
 

casper.then(function() {
	if (this.exists('#myTargetUrl')) {
        this.echo('Forwarding to site with referrer', 'INFO');
	}
	this.click('a#myTargetUrl');
});

casper.run(function() {
	this.echo(this.getCurrentUrl());
	this.test.assertExists('a#logo.cmt',"Found 'vh1' class on logo element");
	this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
	this.test.assertNotExists('a#logo.vh1',"Did NOT find 'vh1' class on logo element");
});