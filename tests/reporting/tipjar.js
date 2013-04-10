function getParameterByName(url, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec( url );
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Boolean test to see if Valid Omniture URL, based on domain.  Checks for cookie 302 redirection.
function isOmnitureURL(url) {
    if ( url.indexOf("viamtv.112.2o7.net") > -1 || url.indexOf("devmtvvia.112.2o7.net") > -1) {
        // console.log("PASSED domain test:" + url);
        // Looks for pccr parameter to filter out. See this link for more info.
        // http://blogs.adobe.com/digitalmarketing/analytics/under-the-hood-with-visits-and-visitors/
        return decodeURIComponent(url).indexOf("&pccr=true") > -1 ? false : true;
    }
    else {
        return false
    }
}

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
    this.click("#profile_activity_leave_tip");
});

//Turn the event back off, so no further reporting is tested.
casper.then(function() {
    this.current_event = "";
    this.on('resource.requested', function() {});
});

casper.run(function() {
    this.test.done(1);
});