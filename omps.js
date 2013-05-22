casper.turnOnReporting = function turnOnReporting() {
    casper.reporting.check_reporting_calls = true;
} 

casper.turnOffReporting = function turnOffReporting() {
    casper.reporting.check_reporting_calls = false;
}


// var environment = "";
// function setupReportingTest(c, art) {
//     environment = c.environment.env; 
//     c.echo("0000000000" + environment + "00000000000");
//     if (environment === "live") { c.echo("True")}
// }

// function isClaimed(art, env) {
    
// }

// function createC7message() {

// }

// function createC7text() {

// }

// var omps = {};
// omps.ladygaga = {
//     c1:{
//         name: "c1",
//         text: "Lady Gaga",
//         message: "reported c1 is equal to 'Lady Gaga'"
//     },
//     c7:{
//         name: "c7",
//         text: ((environment === "live") ? "Claimed" :  "Unclaimed"),
//         message: ("reported c7 is set to " + ((environment === "live") ? "Claimed" :  "Unclaimed")),
//     },
//     c14:{
//         name: "c14",
//         text: "Pop",
//         message: "reported c14 is set to 'Pop'"
//     },
//     ch:{
//         name: "ch",
//         text: "artists",
//         message: "reported ch is set to 'artists'"
//     },
//     v49:{
//         name: "v49",
//         text: "artists",
//         message: "reported v49 is set to 'artists'"
//     }
// }

// omps.victoriajustice = {
//     c1:{
//         name: "c1",
//         text: "Victoria Justice",
//         message: "reported c1 is equal to 'Victoria Justice'"
//     },
//     c7:{
//         name: "c7",
//         text: (environment !== "live" ? "Claimed" :  "Unclaimed"),
//         message: "reported c7 is set to 'Claimed'"
//     },
//     c14:{
//         name: "c14",
//         text: "Musicals",
//         message: "reported c14 is set to 'Musicals'"
//     },
//     c16:{
//         name: "c16",
//         text: "60;61;",
//         message: "reported c16 is set to '60;61;'"
//     },
//     ch:{
//         name: "ch",
//         text: "artists",
//         message: "reported ch is set to 'artists'"
//     },
//     v49:{
//         name: "v49",
//         text: "artists",
//         message: "reported v49 is set to 'artists'"
//     }
// }

casper.testReporting = function testReporting(resource, params) {
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