var url_prefix = casper.environment.mtv;

var utils = require('utils');
var counter = 1;
var DEBUG = 1;

// DEBUG Level 1 takes pictures 
// DEBUG Level 2 prints some urls
// DEBUG Level 3 prints more data
casper.run_reporting_tests = true;

// Defines what parameters to check for the selected action.
casper.reporting.actions = {
    "artist-profile:load":      {params:["c1","c7","c14","c28","ch","v49"],c28:"artist page"}
}

casper.reporting.omps = {
    c1:{
        name: "c1",
        text: "Lady Gaga",
        message: "reported c1 is equal to 'Lady Gaga'"
    },
    c7:{
        name: "c7",
        text: "Unclaimed",
        message: "reported c7 is set to 'Claimed'"
    },
    c14:{
        name: "c14",
        text: "Pop",
        message: "reported c14 is set to 'Pop'"
    },
    ch:{
        name: "ch",
        text: "artists",
        message: "reported ch is set to 'artists'"
    },
    v49:{
        name: "v49",
        text: "artists",
        message: "reported v49 is set to 'artists'"
    }
}

// Trigger on requested resources.  Here, the resource is the Omniture gif.
// casper.on('resource.requested', function(resource) {

//     if (casper.run_reporting_tests === true) {
//     if (DEBUG > 2) { this.echo("DEBUG " + resource.url, 'INFO'); }

//     if ( isOmnitureURL(resource.url) ) {
//         this.echo(this.current_event + "---------" + this.getCurrentUrl() + "-------------", 'COMMENT');

//         if (actions.hasOwnProperty(this.current_event)) {
//             (DEBUG > 0) ? this.echo("Found property for "+this.current_event,"DEBUG") : 0;
//             var cp = 0;
            
//             for (parameter in actions[this.current_event]["params"]) {
//                 cp = actions[this.current_event]["params"][parameter];
//                 //this.test.comment(this.current_event);
//                 if (cp === "c28") {
//                     this.test.assert( getParameterByName(resource.url,"c28") === 
//                         actions[this.current_event]["c28"], 
//                         "reported c28 is set to '" + actions[this.current_event]["c28"]+"'");
//                 }
//                 else {
//                     this.test.assert( getParameterByName(resource.url, cp) === omps[cp].text, omps[cp].message )
//                 }
//             }
//         }
//     }
//     }
// });


casper.test.comment('Testing reporting on Artist Profile page');
casper.current_event = "artist-profile:load";

// Viewport needs to be changed AFTER start() is called.
// Viewport needs to be larger to allow albums and other elements to be loaded in, otherwise
// the click commands won't work properly.
casper.start('').viewport(1000,3000);

casper.thenOpen(url_prefix + 'artists/lady-gaga/', function() {
    this.wait(2000, function() {
        takePicture(this);  // take picture of artist profile
    });
});

casper.then(function() {
    this.test.comment("Reporting tests complete.", "COMMENT");

    // MUST MUST turn off reporting tests or all other tests will have reporting assertions run.
    this.run_reporting_tests = false;
});

casper.run(function() {
    this.test.done();
});
