var url_prefix = casper.environment.mtv;

var utils = require('utils');
var counter = 1;
var DEBUG = 0;

// DEBUG Level 1 takes pictures 
// DEBUG Level 2 prints some urls
// DEBUG Level 3 prints more data


// Defines what parameters to check for the selected action.
var actions = {
    "artist-profile:load":      {params:["c1","c7","c14","c28","ch","v49"],c28:"artist page"},
    "biography-overlay:click":  {params:["c1","c7","c28","ch","v49"],c28:"bio page"},
    "tourdates-overlay:click":  {params:["c1","c7","c28","ch","v49"],c28:"tour page"},
    "photo-overlay:click":      {params:["c1","c7","c28","ch","v49"],c28:"photo page"},
    "album-overlay:click":      {params:["c1","c7","c28","ch","v49"],c28:"album page"},
    "similar-artists:load":     {params:["c1","c7","c14","c28","ch","v49"],c28:"related artist page"},
    "influencer-artists:load":  {params:["c1","c7","c14","c28","ch","v49"],c28:"related artist page"},
    "follower-artists:load":    {params:["c1","c7","c14","c28","ch","v49"],c28:"related artist page"},
    "genre:load":               {params:["c28","ch","v49"],c28:"genre page"},
    "location:load":            {params:["c28","ch","v49"],c28:"location page"},
    "startyear:load":           {params:["c28","ch","v49"],c28:"start year page"},
    "music-grid:load":          {params:["c1","c7","c14","c28","ch","v49"],c28:"music page"},
    "updates-grid:load":        {params:["c1","c7","c14","c28","ch","v49"],c28:"updates page"},
    "interviews-grid:load":     {params:["c1","c7","c14","c28","ch","v49"],c28:"interviews page"},
    "photos-grid:load":         {params:["c1","c7","c14","c28","ch","v49"],c28:"photos page"},
    "news-grid:load:load":      {params:["c1","c7","c14","c28","ch","v49"],c28:"news page"},
    "discography-grid:load":    {params:["c1","c7","c14","c28","ch","v49"],c28:"discography page"}
}

var omps = {
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


//Parse through parameters given
function getParameterByName(url, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec( url );
    if (DEBUG > 1) { console.log(match + "Logged");}
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Boolean test to see if Valid Omniture URL, based on domain.  Checks for cookie 302 redirection.
function isOmnitureURL(url) {

    if ( url.indexOf("viamtv.112.2o7.net") > -1 || url.indexOf("devmtvvia.112.2o7.net") > -1) {
        if (DEBUG > 1) { console.log("PASSED domain test:" + url);}
        // Looks for pccr parameter to filter out. See this link for more info.
        // http://blogs.adobe.com/digitalmarketing/analytics/under-the-hood-with-visits-and-visitors/
        if (decodeURIComponent(url).indexOf("&pccr=true") < 0 &&
            decodeURIComponent(url).indexOf("&ch=artists") > -1) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}

//Optionally take Pictures
function takePicture(cobject) {
	/**** Do you want to take screenshots.  Then raise the debug level above 0 ****/
	if (DEBUG > 0) {
		cobject.capture('reporter' + counter + '.png', {
			top: 0,
			left: 0,
			width: 960,
			height: 3000
		});
        counter++;
	}
}

// Trigger on requested resources.  Here, the resource is the Omniture gif.
casper.on('resource.requested', function(resource) {
    if (DEBUG > 2) { this.echo("DEBUG " + resource.url, 'INFO'); }

    if ( isOmnitureURL(resource.url) ) {
        this.echo(this.current_event + "---------" + this.getCurrentUrl() + "-------------", 'COMMENT');

        if (actions.hasOwnProperty(this.current_event)) {
            (DEBUG > 0) ? this.echo("Found property for "+this.current_event,"DEBUG") : 0;
            var cp = 0;
            
            for (parameter in actions[this.current_event]["params"]) {
                cp = actions[this.current_event]["params"][parameter];
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

//Moving page to the photo carousel portion of the page
casper.then(function() {
	this.wait(2000, function() {
		this.test.comment("Opening biography overlay");
		this.current_event = "biography-overlay:click";
		this.click("#profile_detail_bio");
	});
});
casper.then(function() {
    takePicture(this);  //take picture of bio overlay
});

// Closing Bio Overlay  -- Is this step needed?
casper.then(function() {
	this.wait(2000, function() {
		this.test.comment("Closing biography overlay");
		this.current_event = "biography-overlay-close:click";
		this.click(".fb-close-button-div a");
	});
})

//Moving page to the photo carousel portion of the page
casper.then(function() {
	this.wait(2000, function() {
		this.test.comment("Opening photo overlay", "COMMENT")
		this.current_event = "photo-overlay:click";
		this.click('#profile_artist_images .carousel-item-link-layer a');
	});
});
casper.then(function() {
    this.wait(1000,function() {
        takePicture(this);    //take picture of photo overlay
    })
});

//Moving page to the album carousel portion of the page
casper.then(function() {
	this.wait(2000, function() {
		this.test.comment("Opening album overlay", "COMMENT")
		this.current_event = "album-overlay:click";
		this.click('#profile_albums .carousel-item-link-layer a');
	});

});
casper.then(function() {
    this.wait(1000,function() {
        takePicture(this);   //take picture of album overlay   
    })
});

//Testing similar artists page
casper.then(function() {
    this.test.comment("Opening similar artists page", "COMMENT")
    this.current_event = "similar-artists:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/related-artists/?filter=similar', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});



//Testing following artists page
casper.then(function() {
    this.test.comment("Opening following artists page", "COMMENT")
    this.current_event = "follower-artists:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/related-artists/?filter=followers', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing influencing artists page
casper.then(function() {
    this.test.comment("Opening influencing artists page", "COMMENT")
    this.current_event = "influencer-artists:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/related-artists/?filter=influencedBy', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing genre page
casper.then(function() {
    this.test.comment("Opening genre page", "COMMENT")
    this.current_event = "location:load";
    this.thenOpen(url_prefix + 'artists/location/New+York+City%2C+NY/#from-lady-gaga', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing location page
casper.then(function() {
    this.test.comment("Opening location page", "COMMENT")
    this.current_event = "genre:load";
    this.thenOpen(url_prefix + 'artists/genre/pop/#from-lady-gaga', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing starting year page
casper.then(function() {
    this.test.comment("Opening starting year page", "COMMENT")
    this.current_event = "startyear:load";
    this.thenOpen(url_prefix + 'artists/startyear/2005/#from-lady-gaga', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing music grid page
casper.then(function() {
    this.test.comment("Opening music page", "COMMENT")
    this.current_event = "music-grid:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/music/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing updates grid page
casper.then(function() {
    this.test.comment("Opening updates grid page", "COMMENT")
    this.current_event = "updates-grid:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/updates/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing news and interviews grid page
casper.then(function() {
    this.test.comment("Opening news and interviews grid page", "COMMENT")
    this.current_event = "interviews-grid:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/video-interviews/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing photos grid page
casper.then(function() {
    this.test.comment("Opening photos grid page", "COMMENT")
    this.current_event = "photos-grid:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/photos/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing news grid page
casper.then(function() {
    this.test.comment("Opening news grid page", "COMMENT")
    this.current_event = "news-grid:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/news/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing discography grid page
casper.then(function() {
    this.test.comment("Opening discography grid page", "COMMENT")
    this.current_event = "discography-grid:load";
    this.thenOpen(url_prefix + 'artists/lady-gaga/discography/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

casper.then(function() {
    this.test.comment("Reporting tests complete.", "COMMENT");
    // Had to add the following line to turn off the event listener for reporting.
    this.on('resource.requested', function() {});
});


casper.run(function() {
    this.test.done();
});