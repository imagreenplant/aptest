// Default debug level
casper.DEBUG = 0;
casper.picture_count = 1;

casper.setDebugging = function setDebugging() {
	if (casper.cli.has("logs")) {
		this.verbose = true;
		this.logLevel = "debug";
		this.DEBUG = 3;
		this.echo("---------------------DEBUG MODE!!!---------------------", "COMMENT");
        // Casper passed arguments
        (casper.DEBUG > 0) ? require("utils").dump(casper.cli.args) : false;

        // Casper passed options
        (casper.DEBUG > 0) ? require("utils").dump(casper.cli.options) : false;
	}
};

//Helper to print out js objects when debugging
casper.renderJSON = function(what) {
    return this.echo(JSON.stringify(what, null, '  '));
};

//Setting up a reporting boolean.  The event listener for http requests won't respond with
//reporting checks unless this is set to true within a testcase.
casper.run_reporting_tests = false;
casper.reporting = {};

// In order to test reporting, the reporting object must be added
// DEBUG Level 1 takes pictures 
// DEBUG Level 2 prints some urls
// DEBUG Level 3 prints more data
casper.testReporting = function (resource) {
    if (this.DEBUG > 2) { this.echo("DEBUG " + resource.url); }

    if ( isOmnitureURL(resource.url) ) {
        this.echo("---------" + this.getCurrentUrl() + "-------------", 'COMMENT');
        (this.DEBUG > 0) ? this.echo("DEBUG " + resource.url, 'COMMENT') : 0;

        // if (this.reporting.actions.hasOwnProperty(this.current_event)) {
        //     (this.DEBUG > 0) ? this.echo("Found property for "+this.current_event,"DEBUG") : 0;
            var cp = 0;
            
            for (parameter in this.reporting.params["params"]) {
                cp = this.reporting.params["params"][parameter];
                //this.test.comment(this.current_event);
                if (cp === "c28") {
                    this.test.assert( getParameterByName(resource.url,"c28") === 
                        this.reporting.params["c28"], 
                        "reported c28 is set to '" + this.reporting.params["c28"]+"'");
                }
                else {
                    this.test.assert( getParameterByName(resource.url, cp) === this.reporting.omps[cp].text,
                    	this.reporting.omps[cp].message );
                }
            }
        // }
    }
}

casper.on('resource.requested', function(resource) {
    if (casper.run_reporting_tests === true) {
    	casper.testReporting(resource);
    }
});

casper.setDebugging();
casper.test.done();