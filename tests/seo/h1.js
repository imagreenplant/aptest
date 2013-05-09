var base_domain = casper.environment.mtv;
var test_urls = [
    'artists/kate-nash/', 
    'artists/kate-nash/related-artists/?filter=similar/',
    'artists/kate-nash/related-artists/?filter=followers',
    'artists/kate-nash/related-artists/?filter=influencedBy',
    'artists/location/New+York+City%2C+NY/#from-lady-gaga/',
    'artists/genre/pop/#from-kate-nash',
    'artists/startyear/2005/#from-kate-nash',
    'artists/kate-nash/music/',
    'artists/lady-gaga/updates/',
    'artists/lady-gaga/video-interviews/',
    'artists/lady-gaga/photos/',
    'artists/lady-gaga/news/',
    'artists/lady-gaga/discography/',
    'artists/lady-gaga/tourdates/',
    'artists/collections/',
    'artists/ace-ventura/',
    'artists/',
    'artists/about/',
    'artists/opportunities/',
    'artists/popular/',
    'artists/emerging/',
    'artists/collections/vh1-classic/896674/',
    'artists/collections/weird-vibes/896328/',
    'artists/collections/2013-cmt-music-awards/897012/',
    'artists/collections/artists-to-watch/896317/'    
    ];
var links = [];

// Create links for each() command.
for (var i=0;i<test_urls.length;i++) {
    links.push(base_domain+test_urls[i]);
}

//Some artists had biographies set to null.  We should check for this, and remove the bio.  This test case tests that logic.
//http://jira.mtvi.com/browse/MLAP-1837
casper.start().each(links, function(self, link) {
    self.thenOpen(link, function() {
        this.echo("Testing " + this.getCurrentUrl(), 'INFO');
        this.test.assertEval(function() {
            return __utils__.findAll('h1').length === 1;
        }, 'Only 1 H1 exists @ ' + link);
        this.test.assertNotEquals(this.fetchText('h1').length,0, "H1 is not empty. H1: " + this.fetchText('h1'));
    });
})

casper.run(function() {
    this.test.done();
});