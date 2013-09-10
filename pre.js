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

casper.setViewJSErrors = function setViewJSErrors() {
    casper.viewJSErrors = true;
    if (casper.cli.has("nojs")) {
        casper.viewJSErrors = false;
    }
}
//Helper to print out js objects when debugging
casper.renderJSON = function renderJSON(what) {
    return this.echo(JSON.stringify(what, null, '  '));
};

//Setting up a reporting boolean.  The event listener for http requests won't respond with
//reporting checks unless this is set to true within a testcase.

casper.reporting = {
    check_reporting_calls : false,
    check_headers_for_main : false
};

// In order to test reporting, the reporting object must be added
// DEBUG Level 1 takes pictures 
// DEBUG Level 2 prints some urls
// DEBUG Level 3 prints more data

casper.on('resource.requested', function(resource) {
    if (casper.DEBUG > 0 && this.reporting.check_reporting_calls) { 
        // this.echo("Reporting calls being checked!");
        casper.testReporting(resource, casper.reporting.check_reporting_calls);
    }
    if (casper.reporting.check_headers_for_main === true) {
        // this.echo("Headers being dumped!");
        dumpHeaders(resource);
    }

});

casper.on("page.error", function(msg, trace) {
    if (casper.viewJSErrors) {
        if (this.getCurrentUrl().match(/\/artists\//gi)) {
            this.test.fail("Javascript Error: " + msg);
            this.echo("\n--------------ERROR TRACE-----------------\n" + JSON.stringify(trace, null, 4) + "\n------------------END-------------------\n");
        }
        else {
            this.echo("Javascript errors found on " + this.getCurrentUrl());
        }
    }
});

casper.setDebugging();
casper.test.done();