// Default debug level
casper.DEBUG = 0;
casper.picture_count = 1;
// casper.check_reporting_calls = false;

casper.setDebugging = function setDebugging() {
	if (casper.cli.has("logs")) {
		this.verbose = true;
		this.logLevel = "debug";
		this.DEBUG = 3;
		this.echo("---------------------DEBUG MODE!!!---------------------", "COMMENT");
        // Casper passed arguments and options
        if (casper.DEBUG > 0) { 
            require("utils").dump(casper.cli.args);
            require("utils").dump(casper.cli.options);
        }
	}
};

//Helper to print out js objects when debugging
casper.renderJSON = function renderJSON(what) {
    return this.echo(JSON.stringify(what, null, '  '));
};

//Setting up a reporting boolean.  The event listener for http requests won't respond with
//reporting checks unless this is set to true within a testcase.

casper.reporting = {
    check_reporting_calls : false
};

// In order to test reporting, the reporting object must be added
// DEBUG Level 1 takes pictures 
// DEBUG Level 2 prints some urls
// DEBUG Level 3 prints more data

casper.on('resource.requested', function(resource) {
    if (casper.DEBUG > 0) { 
        this.echo("Reporting calls being checked: " + this.reporting.check_reporting_calls);
    }
    if (casper.reporting.check_reporting_calls === true) {
        casper.testReporting(resource, casper.reporting.check_reporting_calls);
    }
});

casper.setDebugging();
casper.test.done();