casper.turnOnReporting = function turnOnReporting() {
    casper.reporting.check_reporting_calls = true;
}; 

casper.turnOffReporting = function turnOffReporting() {
    casper.reporting.check_reporting_calls = false;
    casper.reporting.params = {};
    casper.reporting.omps = {};
};

casper.testReporting = function testReporting(resource, params, brand) {
    if (this.DEBUG > 2) { this.echo("DEBUG " + resource.url); }

    if ( isOmnitureURL(resource.url) ) {
        this.echo("---------" + this.getCurrentUrl() + "-------------", 'COMMENT');
        if (this.DEBUG > 0) {
            this.echo("DEBUG " + resource.url, 'COMMENT');
        }
        if ( arguments.length === 3 ) {
            this.echo("Testing for dual reporting=============================>>>>>>>>>>", 'COMMENT');
            testDualReporting(url, brand)    
        }
        

        // if (this.reporting.actions.hasOwnProperty(this.current_event)) {
        //     (this.DEBUG > 0) ? this.echo("Found property for "+this.current_event,"DEBUG") : 0;
            var cp = 0;
            
            for (var parameter in this.reporting.params["params"]) {
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
};