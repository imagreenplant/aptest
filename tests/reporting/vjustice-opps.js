var url_prefix = casper.environment.mtv;
var DEBUG = 0;
var artist_alias = "/victoria-justice-1/";

// Defines what parameters to check for the selected action.
var actions = {
    "artist-profile:load":      {params:["c1","c7","c14","c16","ch","v49"],c28:"artist page"},
    "biography-overlay:click":  {params:["c1","c7","c16","ch","v49"],c28:"bio page"},
    "tourdates-overlay:click":  {params:["c1","c7","c16","ch","v49"],c28:"tour page"},
    "photo-overlay:click":      {params:["c1","c7","c16","ch","v49"],c28:"photo page"},
    "album-overlay:click":      {params:["c1","c7","c16","ch","v49"],c28:"album page"},
    "similar-artists:load":     {params:["c1","c7","c14","c16","ch","v49"],c28:"related artist page"},
    "influencer-artists:load":  {params:["c1","c7","c14","c16","ch","v49"],c28:"related artist page"},
    "follower-artists:load":    {params:["c1","c7","c14","c16","ch","v49"],c28:"related artist page"},
    "genre:load":               {params:["ch","v49"],c28:"genre page"},
    "location:load":            {params:["ch","v49"],c28:"location page"},
    "startyear:load":           {params:["ch","v49"],c28:"start year page"},
    "music-grid:load":          {params:["c1","c7","c14","c16","ch","v49"],c28:"music page"},
    "updates-grid:load":        {params:["c1","c7","c14","c16","ch","v49"],c28:"updates page"},
    "interviews-grid:load":     {params:["c1","c7","c14","c16","ch","v49"],c28:"interviews page"},
    "photos-grid:load":         {params:["c1","c7","c14","c16","ch","v49"],c28:"photos page"},
    "news-grid:load:load":      {params:["c1","c7","c14","c16","ch","v49"],c28:"news page"},
    "discography-grid:load":    {params:["c1","c7","c14","c16","ch","v49"],c28:"discography page"}
}

var omps = {
    c1:{
        name: "c1",
        text: "Victoria Justice",
        message: "reported c1 is equal to 'Victoria Justice'"
    },
    c7:{
        name: "c7",
        text: "Claimed",
        message: "reported c7 is set to 'Claimed'"
    },
    c14:{
        name: "c14",
        text: "Musicals",
        message: "reported c14 is set to 'Musicals'"
    },
    c16:{
        name: "c16",
        text: "3;32;33;41;53;56;58;",
        message: "reported c16 is set to '3;32;33;41;53;56;58;'"
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
casper.on('resource.requested', function(resource) {
    if (DEBUG > 2) { this.echo("DEBUG " + resource.url, 'INFO'); }

    if ( isOmnitureURL(resource.url) ) {
        this.echo(this.current_event + "---------" + this.getCurrentUrl() + "-------------", 'COMMENT');

        if (actions.hasOwnProperty(this.current_event)) {
            var cp = 0;
            
            for (parameter in actions[this.current_event]["params"]) {
                cp = actions[this.current_event]["params"][parameter];
                // this.echo(cp+" is "+getParameterByName(resource.url, cp), "INFO");
                //this.test.comment(this.current_event);
                if (cp === "c28") {
                    this.test.assert( getParameterByName(resource.url,"c28") === 
                        actions[this.current_event]["c28"], 
                        "reported c28 is set to '" + actions[this.current_event]["c28"]+"'");
                }
                else {
                    this.test.assert( getParameterByName(resource.url, cp) === omps[cp].text, omps[cp].message )
                }
            }
        }
    }
});


casper.echo("*****************************************************************************\n"+
            "|   This tests that opportunity ids are being reported for Victoria justice |\n"+
            "|   Currently this artist has opted into 7 opportunities, however this      |\n"+
            "|  may change, and the testcase will have to be changed.                    |\n"+
            "*****************************************************************************\n", "COMMENT");

casper.current_event = "artist-profile:load";

// Viewport needs to be changed AFTER start() is called.
// Viewport needs to be larger to allow albums and other elements to be loaded in, otherwise
// the click commands won't work properly.
casper.start('').viewport(1000,3000);

casper.thenOpen(url_prefix + 'artists' + artist_alias + '', function() {
    this.wait(2000, function() {
        takePicture(this);  // take picture of artist profile
    });
});

//Testing music grid page
casper.then(function() {
    this.test.comment("Opening music page", "COMMENT")
    this.current_event = "music-grid:load";
    this.thenOpen(url_prefix + 'artists' + artist_alias + 'music/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing updates grid page
casper.then(function() {
    this.test.comment("Opening updates grid page", "COMMENT")
    this.current_event = "updates-grid:load";
    this.thenOpen(url_prefix + 'artists' + artist_alias + 'updates/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing news and interviews grid page
casper.then(function() {
    this.test.comment("Opening news and interviews grid page", "COMMENT")
    this.current_event = "interviews-grid:load";
    this.thenOpen(url_prefix + 'artists' + artist_alias + 'video-interviews/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing photos grid page
casper.then(function() {
    this.test.comment("Opening photos grid page", "COMMENT")
    this.current_event = "photos-grid:load";
    this.thenOpen(url_prefix + 'artists' + artist_alias + 'photos/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing news grid page
casper.then(function() {
    this.test.comment("Opening news grid page", "COMMENT")
    this.current_event = "news-grid:load";
    this.thenOpen(url_prefix + 'artists' + artist_alias + 'news/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing discography grid page
casper.then(function() {
    this.test.comment("Opening discography grid page", "COMMENT")
    this.current_event = "discography-grid:load";
    this.thenOpen(url_prefix + 'artists' + artist_alias + 'discography/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

casper.then(function() {
    this.test.comment("Reporting tests complete.", "COMMENT");
    // Had to add the following line to turn off the event listener for reporting.
    this.on('resource.requested', function() {});
});

if (casper.environment.env === "live") {
    // Adding messaging.  This should not be used on Live because this is dependent on 
    // Topspin staging mappings.
    casper.echo("This test file is not meant to be used with the LIVE environment.", "INFO");
    casper.test.done();
}
else {
    casper.run(function() {
        this.test.done();
    });
}