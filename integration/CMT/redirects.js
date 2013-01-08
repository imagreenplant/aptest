mtv_q_base_domain = 'http://www.cmt.com'

var fs = require('fs');
var artists_file = fs.read('CMTartists.txt');
var artists = artists_file.split("\n");

// console.log(artists[0]);

//Tests for cmt domain, that the link was properly redirected.
var cmtpattern = new RegExp ('^http://www.(cmt|mtv).com/artists/');

casper.start().each(artists, function(self, artist) {
    clink = mtv_q_base_domain + "/artists/az/" + artist + "/artist.jhtml";
    self.thenOpen(clink, function() {
        this.echo("Requested link: " + clink)
        this.echo(this.getTitle());
        this.echo(this.getCurrentUrl());
        // Test to make sure a CMT owned collection, when linked under mtv.com domain, 
        // will redirect to be under a CMT domain.
        this.test.assertUrlMatch(cmtpattern, 'Domain successfully served from CMT. MLAP-1387');
        this.test.assertNotEquals(this.getCurrentUrl(), "http://www.mtv.com/artists/null/", "Artist url should NOT be directed to the NULL artist at /artists/null")
    });
});

casper.run(function() {
    this.test.renderResults(true);
});