var casper = require('casper').create();

// function getLinks() {
//     var links = document.querySelectorAll('h3.r a');
//     return Array.prototype.map.call(links, function(e) {
//         return e.getAttribute('href')
//     });
// }

function getParameterByName(url, name) {
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec( url );
    //mlapora console.log(match + "Logged");
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


// Boolean test to see if Valid Omniture URL, based on domain.  Checks for cookie 302 redirection.
function isOmnitureURL(url) {

    if ( url.indexOf("viamtv.112.2o7.net") > -1 ) {
        
        // Looks for pccr parameter to filter out. See this link for more info.
        // http://blogs.adobe.com/digitalmarketing/analytics/under-the-hood-with-visits-and-visitors/
        if ( decodeURIComponent(url).indexOf("&pccr=true") > -1) {
            return true
        }
        else {
//            console.log("Omniture cookie drop forwarding.  Discarding.")
            return false
        }
    }

    else {
        return false
    }
}


// Trigger on requested resources.  Here, the resource is the Omniture gif.
casper.on('resource.requested', function(resource) {
    
    if ( isOmnitureURL(resource.url) ) {
        this.test.assert( getParameterByName(resource.url, "c28") === "artist page", "C28 is equal to 'artist page'");
        this.test.assert( getParameterByName(resource.url, "c1") === "Lady Gaga", "C1 is equal to 'Lady Gaga'");
        //this.test.assert( getParameterByName(resource.url, "c28") === "artist page", "C28 is equal to 'artist page'");
        //this.test.assert( getParameterByName(resource.url, "c28") === "artist page", "C28 is equal to 'artist page'");
    }

});


casper.test.comment('Testing reporting on Artist Profile page');

casper.start('http://mtv.com/artists/lady-gaga/', function() {});

casper.run(function() {
    this.echo("All done")
});
