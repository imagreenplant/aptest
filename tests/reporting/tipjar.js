// Trigger on requested resources.  Here, the resource is the Omniture gif.
casper.on('resource.requested', function(resource) {    
    if ( isOmnitureURL(resource.url) ) {
        if (this.current_event === "tip_jar:click") {
            this.test.assert( getParameterByName(resource.url, "pev2") === "Artist Platform Tip Jar Click", "pev2 reported as 'Artist Platform Tip Jar Click'");
        }
       
    }
});


casper.test.comment('Testing tip jar reporting on Artist Profile page');
// Set the current event to null until we get to the true reporting call.  Otherwise, 
// other Omniture calls will occur that aren't related to the Tip jar click event.
casper.current_event = "";

if (casper.environment.env == "live") {
    var url = casper.environment.mtv + 'artists/lady-gaga/';
}
else {
    var url = casper.environment.mtv + 'artists/the-sawg/';
}

casper.start(url, function() {
    this.echo(this.getCurrentUrl());
});

//Preparing for click event by assigning the event type for the parameter parser.
casper.then(function() {
	this.current_event = "tip_jar:click";
});

//Click the Tip Jar
casper.then(function() {
    try { 
        this.click("#profile_activity_leave_tip");
    } catch (e) { 
        this.test.assert(false, "Tip jar button does not exist.");
    } 
});

//Turn the event back off, so no further reporting is tested.
casper.then(function() {
    this.current_event = "";
    this.on('resource.requested', function() {});
});

casper.run(function() {
    this.test.done(1);
});
