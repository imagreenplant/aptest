var url_prefix = casper.environment.mtv;

casper.reporting.omps = {
    c1:{
        name: "c1",
        text: "Lady Gaga",
        message: "reported c1 is equal to 'Lady Gaga'"
    },
    c7:{
        name: "c7",
        text: ((casper.environment.env === "live") ? "Claimed" :  "Unclaimed"),
        message: ("reported c7 is set to " + ((casper.environment.env === "live") ? "Claimed" :  "Unclaimed")),
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
};

// Defines what parameters to check for the selected action.
casper.reporting.params = {params:["c1","c7","c28","ch","v49"],c28:"photo page"};

casper.test.comment('Testing reporting on photo overlay on the Lady Gaga profile page.');

// Viewport needs to be changed AFTER start() is called.
// Viewport needs to be larger to allow albums and other elements to be loaded in, otherwise
// the click commands won't work properly.
casper.start('').viewport(1000,3000);

casper.thenOpen(url_prefix + 'artists/lady-gaga/', function() {});

casper.then(function(){
    // Turns on reporting tester.  Otherwise it runs for every test case.
    this.turnOnReporting();
takePicture(this);
});

casper.then(function() {
    this.wait(2000, function() {
        this.test.comment("Opening photo overlay", "COMMENT");
        this.click('#profile_artist_images .carousel-item-link-layer div');
    });
});
casper.then(function() {
    takePicture(this);
    // MUST MUST turn off reporting tests or all other tests will have reporting assertions run.
    this.turnOffReporting();
});

casper.run(function() {
    this.test.done();
});
