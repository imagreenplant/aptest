var casper = require('casper').create();

var utils = require('utils');
var urls = [
        "http://www.mtv.com/artists/",
        "http://www.mtv-d.mtvi.com/artists/",
        "http://www.mtv-q.mtvi.com/artists/"
]

// Maps reporting parameters to reporting actions
reporting_map = {
    "artist-profile:load":{
        "c1":"Lady Gaga",
        //"c7":"claimed",
        "c28":"artist page",
    },
    "biography-overlay:click":{
        "c1":"Lady Gaga",
        "v49":"artists", 
    },
    "photo-overlay:click":{
        "c1":"Lady Gaga",
        "v49":"artists", 
    },
    "album-overlay:click":{
        "c1":"Lady Gaga",
        "v49":"artists", 
    },
}

//if(isInArray(foo,["bar","foobar","foo"])){ (...) }
function isInArray(val,arr) { 
    return arr.indexOf(val)>=0; 
} 

function getParameterByName(url, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec( url );
    //console.log(match + "Logged");
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Boolean test to see if Valid Omniture URL, based on domain.  Checks for cookie 302 redirection.
function isOmnitureURL(url) {

    if ( url.indexOf("viamtv.112.2o7.net") > -1 ) {
        //console.log("PASSED domain test:" + url);
        // Looks for pccr parameter to filter out. See this link for more info.
        // http://blogs.adobe.com/digitalmarketing/analytics/under-the-hood-with-visits-and-visitors/
        return decodeURIComponent(url).indexOf("&pccr=true") > -1 ? false : true;
    }

    else {
        return false
    }
}


// function testReportingCall(url, current_event) {
//     for (var key in validation_messages) {
//        if (validation_messages.hasOwnProperty(key)) {
//          var obj = validation_messages[key];
//          for (var prop in obj) {
//            if (obj.hasOwnProperty(prop)) {
//              alert(prop + " = " + obj[prop]);
//            }
//          }
//        }
//     }
// }

// Trigger on requested resources.  Here, the resource is the Omniture gif.
casper.on('resource.requested', function(resource) {
    //this.echo("DEBUG " + resource.url, 'INFO');

    if ( isOmnitureURL(resource.url) ) {
        this.echo(this.current_event + "---------" + this.getCurrentUrl() + "-------------", 'COMMENT');
        this.test.assert( getParameterByName(resource.url, "c28") === "artist page", "C28 is equal to 'artist page'");
        this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "C1 is equal to 'Lady Gaga'");
        //this.test.assert( getParameterByName(resource.url, "c7") === "claimed", "c7 is set to 'claimed'");
        this.test.assert( getParameterByName(resource.url, "pageName") === "/artists/lady-gaga/photos/7553542", "pageName is equal to photos page");
    }
});


casper.test.comment('Testing reporting on Artist Profile page');
casper.current_event = "artist-profile:load";

casper.start('http://www.mtv.com/artists/lady-gaga', function() {
    this.viewport(1024,768);
    this.echo(this.getCurrentUrl() + " loaded", "INFO"); 
});

casper.then(function() {
    this.test.comment("Opening biography overlay");
    this.current_event = "biography-overlay:click";
    this.click("#profile_detail_bio_box");
});

//Moving page to the photo carousel portion of the page
casper.thenOpen('http://www.mtv.com/artists/lady-gaga#profile_artist_images', function() {});

casper.then(function() {
    this.test.comment("Opening photo overlay", "COMMENT")
    this.current_event = "photo-overlay:click";
    this.click('#profile_artist_images .carousel-item-link-layer a');
});

//Moving page to the album carousel portion of the page
casper.thenOpen('http://www.mtv.com/artists/lady-gaga#profile_albums', function() {});

casper.then(function() {
    this.test.comment("Opening album overlay", "COMMENT")
    this.current_event = "album-overlay:click";
    this.click('#profile_albums .carousel-item-link-layer a');
});

casper.run();