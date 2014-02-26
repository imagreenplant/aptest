/*  Helpful functions for the test suite. */


/*****************************************************************
            Functions to parse cookies from a page.
******************************************************************/

function getCookies(raw_cookies) {
    var c = raw_cookies, v = 0, cookies = {};
    if (document.cookie.match(/^\s*\$Version=(?:"1"|1);\s*(.*)/)) {
        c = RegExp.$1;
        v = 1;
    }
    if (v === 0) {
        c.split(/[,;]/).map(function(cookie) {
            var parts = cookie.split(/=/, 2),
                name = decodeURIComponent(parts[0].trimLeft()),
                value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
            cookies[name] = value;
        });
    } else {
        c.match(/(?:^|\s+)([!#$%&'*+\-.0-9A-Z^`a-z|~]+)=([!#$%&'*+\-.0-9A-Z^`a-z|~]*|"(?:[\x20-\x7E\x80\xFF]|\\[\x00-\x7F])*")(?=\s*[,;]|$)/g).map(function($0, $1) {
            var name = $0,
                value = $1.charAt(0) === '"' ? $1.substr(1, -1).replace(/\\(.)/g, "$1") : $1;
            cookies[name] = value;
        });
    }
    return cookies;
}

function getCookie(name, cookies) {
    return getCookies(cookies)[name];
}



/*****************************************************************
The following functions help with reporting suites for Omniture.
******************************************************************/

//Parse through parameters given in Omniture URL
function getParameterByName(url, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec( url );
    if (casper.DEBUG > 1) { console.log(match + "Logged");}
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Boolean test to see if Valid Omniture URL, based on domain.  Checks for cookie 302 redirection.
function isOmnitureURL(url) {

    if ( url.indexOf("viamtv.112.2o7.net") > -1 || url.indexOf("devmtvvia.112.2o7.net") > -1) {
        if (casper.DEBUG > 1) { console.log("PASSED domain test:" + url);}
        // Looks for pccr parameter to filter out. See this link for more info.
        // http://blogs.adobe.com/digitalmarketing/analytics/under-the-hood-with-visits-and-visitors/
        if (decodeURIComponent(url).indexOf("&pccr=true") < 0 &&
            decodeURIComponent(url).indexOf("&ch=artists") > -1) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/*****************************************************************
This function makes it easy to take a screenshot of the moment at
which you call it.  You must pass in the casper object.
******************************************************************/

//Optionally take Pictures during DEBUG
function takePicture(cobject) {
    /**** Do you want to take screenshots.  Then put casper in debug mode ****/
    if (casper.logLevel === "debug") {
        casper.wait(2000,function() {
            cobject.capture('reporter' + casper.picture_count + '.png');
        });
        casper.echo("**** Picture Taken ****  -> reporter" + casper.picture_count + ".png", "WARN");
        casper.picture_count++;
    }
}

function makeBetterFileName(name_string) {
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var timedata = year + "-" + month + "-" + day;

    var arr = name_string.split("/");
    var str;
    var clean;
    var map = Array.prototype.map;

    if(name_string === "") {
        return "home/" + timedata; 
    }
    else {
        str = arr.slice(-5);
        cleaned = map.call(str,function(substring) {
            return substring.replace(/\W/g, '');
        });
        return cleaned.join("/") + "/" + timedata;
    }
}

function takeScreenshot(cobject, name_string) {
    file_name = makeBetterFileName(name_string);
    casper.wait(2000,function() {
        cobject.capture('reporter' + casper.picture_count + '.png');
    });
    casper.echo("**** Picture Taken ****  -> " + file_name + ".png", "DEBUG");
}


/*****************************************************************
Function to test the major pieces of SEO tags, taking the input of
the name, url-alias, and brand of the artist.
******************************************************************/

function testSEOTagsForArtist(that, artist_object, type) {
    var environment = that.environment[artist_object.brand.toLowerCase()];
    var seo = {
        bio:{
            title: artist_object.name + " Bio | "+artist_object.name+" Career | " + artist_object.brand.toUpperCase(),
            h1: 'About ' + artist_object.name,
            desc: "Interesting wiki facts about "+artist_object.name+". Find out the latest biography details including "+artist_object.name+"'s personal life, family, and musical career.",
            canonical: environment + 'artists/' + artist_object.alias + '/biography/'
        },
        profile:{
            title: artist_object.name + " | New Music And Songs | " + artist_object.brand.toUpperCase(),
            h1: artist_object.name,
            desc: artist_object.name +" new music, concerts, photos, and official news updates directly from " + artist_object.name + "'s Twitter and Facebook.",
            canonical: "http://www.mtv.com/artists/" + artist_object.alias + '/'
        },
        similar:{
            title: "Artists Like " + artist_object.name + " | Similar to " + artist_object.name + " | " + artist_object.brand.toUpperCase(),
            h1: "Artists Similar To " + artist_object.name,
            desc: "A complete list of similar artists to "+artist_object.name+" and other artists like "+artist_object.name+" on MTV.",
            canonical: environment + 'artists/' + artist_object.alias + '/related-artists/?filter=similar'
        },
        influencers:{
            title: artist_object.name + " Music Influences | " + artist_object.brand.toUpperCase(),
            h1: "Artist Influences for " + artist_object.name,
            desc: artist_object.name + " Music Influences.",
            canonical: environment + 'artists/' + artist_object.alias + '/related-artists/?filter=influencedBy'
        },
        followers:{
            title: artist_object.name + " Followers | " + artist_object.brand.toUpperCase(),
            h1: "Artists Following " + artist_object.name,
            desc: artist_object.name + " Followers on MTV.com",
            canonical: environment + 'artists/' + artist_object.alias + '/related-artists/?filter=followers'
        },
        photo_asset:{
            title: artist_object.photo_name + " from " + artist_object.name + " | " + artist_object.brand.toUpperCase(),
            h1: artist_object.photo_name,
            desc:  artist_object.caption + " ",
            canonical: environment + 'artists/' + artist_object.alias + '/photos/' + artist_object.photo_id + "/"
        },
        ts_video_asset:{
            title: artist_object.video + " by " + artist_object.name + " | " + artist_object.brand.toUpperCase(),
            h1: artist_object.video + " by " + artist_object.name,
            desc:  artist_object.video + " by " + artist_object.name,
            canonical: environment + 'artists/' + artist_object.alias + '/videos/' + artist_object.id + "/"
        },
        track_asset:{
            title: artist_object.track + " " + artist_object.name + " from " + artist_object.album + " | " + artist_object.brand.toUpperCase(),
            h1: artist_object.track,
            desc:  artist_object.track + " by " + artist_object.name + " from " + artist_object.album + " - " + artist_object.description,
            canonical: environment + 'artists/' + artist_object.alias + '/tracks/' + artist_object.id + "/"
        },
        playlist_asset:{
            title: artist_object.name + " " + artist_object.playlist_name + " | " + artist_object.brand.toUpperCase(),
            h1: artist_object.name + " " + artist_object.playlist_name,
            desc:  artist_object.playlist_name + "  - Music, Songs from " + artist_object.name,
            canonical: environment + 'artists/' + artist_object.alias + '/playlist/' + artist_object.playlist_id + "/"
        },
        topspin_photo_asset:{
            title: artist_object.photo_name + " from " + artist_object.name + " | " + artist_object.brand.toUpperCase(),
            h1: artist_object.photo_name,
            desc:  artist_object.caption,
            canonical: environment + 'artists/' + artist_object.alias + '/photos/' + artist_object.mgid + "/"
        },
        soundstream:{
            title: artist_object.name + " Audio Song Clips, Music Samples | " + artist_object.brand.toUpperCase(),
            h1: artist_object.name + " Audio Samples",
            desc:  "A collection of streaming audio clips and music samples from " + artist_object.name,
            canonical: "http://www.mtv.com/artists/" + artist_object.alias + '/soundstream/'
        }
    };

    var tdata = seo[type];

    if (artist_object) {
        that.echo("Performing SEO test cases on " + that.getCurrentUrl(), 'INFO');
        that.test.assertTitle(tdata.title, "Title matches SEO document.");
        that.test.assertEquals(that.fetchText('h1').trim(), tdata.h1, "H1 matches SEO document.");
        that.test.assertEquals(that.getElementAttribute('meta[name=description]','content'), tdata.desc,
            'meta tag description matches SEO document.');
        that.test.assertEquals(
            that.getElementAttribute('link[rel=canonical]','href'), tdata.canonical, 'Canonical link matches SEO document.');    
    } else {
        that.test.assert(false, "Test failure.  Artist object passed to testSEOtags() function is undefined");
    }
}

/*****************************************************************
Simple echo function to tell developers that testcases have been
removed.  Optionally, a jira ticket can be given.
******************************************************************/

function notifyHiddenTests (that, jira) {
    jira = typeof jira !== 'undefined' ? jira : '<No jira ticket specified>';
    that.echo(
        "**************************************************\n"+
        "   Test cases have been hidden from this file.    \n"+
        "   Please see " + jira + "\n"+
        "**************************************************\n"
    );
}

function testDualReporting(url, brand) {
    casper.echo("Thesting dual reporting", "COMMENT");
}

function dumpHeaders (resource) {
    if ( resource.url.match(/^http:\/\/www.(mtv|vh1|cmt|logotv).*\/artists\//g) ) {
        if (!resource.url.match(/createbrandcookie/g)) {
            casper.echo("Loading: " + resource.url, "COMMENT");
            for (key in resource.headers) {
                if (resource.headers[key].name === "Referer") {
                    casper.echo("Referrer: "+ resource.headers[key].value, "COMMENT");
                }
            }
        }
    }
}