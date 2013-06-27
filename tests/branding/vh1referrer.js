// I have to add the url paramater here to get around the limitation that
// thenEvaluate() executes within the DOM, and we can't pass variables into it.
var fakeReferrer = "http://vh1.com?env=" + casper.environment.mtv.slice(7);
var utils = require('utils');

// casper.on('remote.message', function(message) {
//     console.log(message);
// });

casper.start(fakeReferrer, function() {
	this.echo(this.getCurrentUrl());
});
 
// Currently this can only test DEV env.  thenEvaluate is executed within the sandbox of the DOM
// itself, therefore I can't pass a target href into this function.
casper.thenEvaluate(function() {
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
	
	var newhref = getUrlVars()["env"];
    var link = document.createElement('a');
    link.setAttribute('href', 'http://' + newhref + 'artists/');
	link.setAttribute('id', "myTargetUrl");
	document.body.appendChild(link);
});
 

casper.then(function() {
	if (this.exists('#myTargetUrl')) {
        this.echo('Forwarding to site with referrer', 'INFO');
	}
	this.click('a#myTargetUrl');
});

casper.then(function(){
	this.wait(2000);
});

casper.then(function() {
	this.echo(this.getCurrentUrl(), "COMMENT");
	this.test.assertExists('a#logo.vh1',"Found 'vh1' class on logo element");
	this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
	this.test.assertNotExists('a#logo.cmt',"Did NOT find 'cmt' class on logo element");
});

casper.run(function() {
	this.test.done();
});