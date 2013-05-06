/*  Helpful functions for the test suite. */


/*****************************************************************
            Functions to parse cookies from a page.
******************************************************************/

function getCookies(cookies) {
    var c = cookies, v = 0, cookies = {};
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
                value = $1.charAt(0) === '"'
                          ? $1.substr(1, -1).replace(/\\(.)/g, "$1")
                          : $1;
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

/*****************************************************************
This function makes it easy to take a screenshot of the moment at
which you call it.  You must pass in the casper object.

Also note: takePicture will only activate if the debug level is 
set to 1 or higher.
******************************************************************/

//Optionally take Pictures
function takePicture(cobject) {
    /**** Do you want to take screenshots.  Then put casper in debug mode ****/
    if (casper.logLevel === "debug") {
    //if (casper.DEBUG > 0) {
        cobject.capture('reporter' + counter + '.png', {
            top: 0,
            left: 0,
            width: 960,
            height: 3000
        });
        casper.echo("**** Picture Taken ****  -> reporter" + counter + ".png", "WARN");
        counter++;
    }
}



