

mtv_q_base_domain = 'http://www.cmt.com'

var fs = require('fs');
var artists_file = fs.read('./integration/CMT/CMTartists.txt');
var artists = artists_file.split("\n");

// console.log(artists[0]);

//Tests for cmt domain, that the link was properly redirected.
var cmtpattern = new RegExp ('^http://www.(cmt|mtv).com/artists/');

casper.start().each(artists, function(self, artist) {
    clink = self.environment.cmt + "artists/az/" + artist + "/artist.jhtml";
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

if (casper.environment.env !== "live") {
    casper.echo("This test file is not meant to be used with DEV or Q environments.", "INFO");
    casper.test.done();
}
else {
    casper.run(function() {
        this.test.renderResults(true);
        this.test.done();
    });
}