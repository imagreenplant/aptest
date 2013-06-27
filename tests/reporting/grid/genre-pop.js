var url_prefix = casper.environment.mtv;

casper.reporting.omps = {
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
casper.reporting.params = {params:["c28","ch","v49"],c28:"genre page"};

casper.test.comment('Testing reporting on genre page');

// Viewport needs to be changed AFTER start() is called.
// Viewport needs to be larger to allow albums and other elements to be loaded in, otherwise
// the click commands won't work properly.
casper.start('').viewport(1000,3000);
casper.then(function(){
    this.turnOnReporting();
    this.test.comment("Opening genre page", "COMMENT");
});

casper.thenOpen(url_prefix + 'artists/genre/pop/#from-lady-gaga', function() {
    this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
});

casper.then(function() {
    // MUST MUST turn off reporting tests or all other tests will have reporting assertions run.
    this.turnOffReporting();
});

casper.run(function() {
    this.test.done();
});
