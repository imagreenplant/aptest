var url_prefix = casper.environment.mtv;

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
