
casper.reporting.omps = {
    pev2:{
        name: "pev2",
        text: "Artist Platform Tip Jar Click",
        message: "pev2 is reported as 'Artist Platform Tip Jar Click'"
    },
    ch:{
        name: "ch",
        text: "artists",
        message: "'ch' is equal to 'artists'"
    }
};

casper.reporting.params = {params:["pev2","ch"]};

casper.test.comment('Testing tip jar reporting on Artist Profile page');

var url = casper.environment.mtv + 'artists/the-sawg/';
casper.start(url, function() {
    this.echo(this.getCurrentUrl());
});

casper.then(function(){
    this.turnOnReporting();
});

//Click the Tip Jar
casper.then(function() {
    this.echo("Clicking 'Leave Tip'", "COMMENT");
    try { 
        this.click("#profile_activity_leave_tip");
    } catch (e) { 
        this.test.assert(false, "Tip jar button does not exist on page, but it SHOULD!.");
    } 
});

casper.then(function() {
    // MUST MUST turn off reporting tests or all other tests will have reporting assertions run.
    this.turnOffReporting();
});

casper.run(function() {
    this.test.done();
});