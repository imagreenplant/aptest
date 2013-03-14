var casper = require('casper').create({
	viewportSize: {
		width: 960,
		height: 3000
	}
});
var utils = require('utils');
var counter = 1;
var DEBUG = 0;

// DEBUG Level 1 takes pictures 
// DEBUG Level 2 prints some urls
// DEBUG Level 3 prints more data

// var urls = [
//         "http://www.mtv.com/artists/",
//         "http://www.mtv-d.mtvi.com/artists/",
//         "http://www.mtv-q.mtvi.com/artists/"
// ]

// //if(isInArray(foo,["bar","foobar","foo"])){ (...) }
// function isInArray(val,arr) { 
//     return arr.indexOf(val)>=0; 
// } 

//Parse through parameters given
function getParameterByName(url, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec( url );
    if (DEBUG > 1) { console.log(match + "Logged");}
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Boolean test to see if Valid Omniture URL, based on domain.  Checks for cookie 302 redirection.
function isOmnitureURL(url) {

    if ( url.indexOf("viamtv.112.2o7.net") > -1 ) {
        if (DEBUG > 1) { console.log("PASSED domain test:" + url);}
        // Looks for pccr parameter to filter out. See this link for more info.
        // http://blogs.adobe.com/digitalmarketing/analytics/under-the-hood-with-visits-and-visitors/
        return decodeURIComponent(url).indexOf("&pccr=true") > -1 ? false : true;
    }
    else {
        return false
    }
}

//Optionally take Pictures
function takePicture(cobject) {
	/**** Do you want to take screenshots.  Then make this equal to true: ****/
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

        if (this.current_event === "artist-profile:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "c28") === "artist page", "reported c28 is equal to 'artist page'");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga", "reported pageName is equal to profile page");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
        }
        if (this.current_event === "biography-overlay:click") {
            this.test.comment(this.current_event);   
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c28") === "bio page", "reported c28 is equal to 'bio page'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            // Removed 1/8/2013 -- Unsure if applicable
            //this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/biography/", "reported pageName is equal to biography page");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
        }
        if (this.current_event === "tourdates-overlay:click") {
            this.test.comment(this.current_event);   
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c28") === "bio page", "reported c28 is equal to 'bio page'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            // Removed 1/8/2013 -- Unsure if applicable
            //this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/biography/", "reported pageName is equal to biography page");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
        }
        if (this.current_event === "photo-overlay:click") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/photos/7713906", "reported pageName is equal to photos page");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            // Removed 1/8/2013 -- Unsure if applicable
            //this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "photo page", "reported c28 is equal to 'photo page'");
        }
        if (this.current_event === "album-overlay:click") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/discography/2766686/", "reported pageName is equal to discography page");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            // Removed 1/8/2013 -- Unsure if applicable
            //this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "album page", "reported c28 is equal to 'album page'");
        }
        if (this.current_event === "similar-artists:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/related-artists/", "reported pageName is equal to related-artists page");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "related artist page", "reported c28 is equal to 'related artists page'");
        }
        if (this.current_event === "influencer-artists:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/related-artists/", "reported pageName is equal to related-artists page");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "related artist page", "reported c28 is equal to 'related artists page'");
        }
        if (this.current_event === "follower-artists:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/related-artists/", "reported pageName is equal to related-artists page");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "related artist page", "reported c28 is equal to 'related artists page'");
        }
        if (this.current_event === "genre:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/genre/pop/", "reported pageName is equal to the pop page");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "genre page", "reported c28 is equal to 'genre page'");
        }
        if (this.current_event === "location:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/location/New+York+City,+NY/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "location page", "reported c28 is equal to 'location page'");
        }
        if (this.current_event === "startyear:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/startyear/2005/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "start year page", "reported c28 is equal to 'start year page'");
        }
        if (this.current_event === "music-grid:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/music/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "music page", "reported c28 is equal to 'music page', actual="+getParameterByName(resource.url, "c28"));
        }
        if (this.current_event === "updates-grid:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/updates/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "updates page", "reported c28 is equal to 'updates page', actual="+getParameterByName(resource.url, "c28"));
        }
        if (this.current_event === "interviews-grid:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/video-interviews/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "interviews page", "reported c28 is equal to 'interviews page', actual="+getParameterByName(resource.url, "c28"));
        }
        if (this.current_event === "photos-grid:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/photos/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "photos page", "reported c28 is equal to 'photos page', actual="+getParameterByName(resource.url, "c28"));
        }
        if (this.current_event === "news-grid:load:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/news/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "news page", "reported c28 is equal to 'news page', actual="+getParameterByName(resource.url, "c28"));
        }
        if (this.current_event === "discography-grid:load") {
            this.test.comment(this.current_event);
            this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/discography/", "reported pageName is expected");
            this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "reported c1 is equal to 'Lady Gaga'");
            this.test.assert( getParameterByName(resource.url, "c7") === "Claimed", "reported c7 is set to 'Claimed'");
            this.test.assert( getParameterByName(resource.url, "c14") === "Pop", "reported c14 is set to 'Pop'");
            this.test.assert( getParameterByName(resource.url, "v49") === "artists", "reported v49 is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "ch") === "artists", "reported ch is set to 'artists'");
            this.test.assert( getParameterByName(resource.url, "c28") === "discography page", "reported c28 is equal to 'discography page', actual="+getParameterByName(resource.url, "c28"));
        }
    }
});


casper.test.comment('Testing reporting on Artist Profile page');
casper.current_event = "artist-profile:load";

casper.start('http://www.mtv.com/artists/lady-gaga', function() {
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
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/related-artists/?filter=similar', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});



//Testing following artists page
casper.then(function() {
    this.test.comment("Opening following artists page", "COMMENT")
    this.current_event = "follower-artists:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/related-artists/?filter=followers', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing influencing artists page
casper.then(function() {
    this.test.comment("Opening influencing artists page", "COMMENT")
    this.current_event = "influencer-artists:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/related-artists/?filter=influencedBy', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing genre page
casper.then(function() {
    this.test.comment("Opening genre page", "COMMENT")
    this.current_event = "location:load";
    this.thenOpen('http://www.mtv.com/artists/location/New+York+City%2C+NY/#from-lady-gaga', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing location page
casper.then(function() {
    this.test.comment("Opening location page", "COMMENT")
    this.current_event = "genre:load";
    this.thenOpen('http://www.mtv.com/artists/genre/pop/#from-lady-gaga', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing starting year page
casper.then(function() {
    this.test.comment("Opening starting year page", "COMMENT")
    this.current_event = "startyear:load";
    this.thenOpen('http://www.mtv.com/artists/startyear/2005/#from-lady-gaga', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing music grid page
casper.then(function() {
    this.test.comment("Opening music page", "COMMENT")
    this.current_event = "music-grid:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/music/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing updates grid page
casper.then(function() {
    this.test.comment("Opening updates grid page", "COMMENT")
    this.current_event = "updates-grid:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/updates/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing news and interviews grid page
casper.then(function() {
    this.test.comment("Opening news and interviews grid page", "COMMENT")
    this.current_event = "interviews-grid:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/video-interviews/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing photos grid page
casper.then(function() {
    this.test.comment("Opening photos grid page", "COMMENT")
    this.current_event = "photos-grid:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/photos/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing news grid page
casper.then(function() {
    this.test.comment("Opening news grid page", "COMMENT")
    this.current_event = "news-grid:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/news/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});

//Testing discography grid page
casper.then(function() {
    this.test.comment("Opening discography grid page", "COMMENT")
    this.current_event = "discography-grid:load";
    this.thenOpen('http://www.mtv.com/artists/lady-gaga/discography/', function() {
        this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
        takePicture(this);
    });
});


casper.run();