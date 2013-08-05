casper.test.comment('BVT: MTV artist profile page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/', function() {
    // this.test.assertHttpStatus(200, 'Received 200 Status response');
    // this.test.assertTitle("Lady Gaga | New Music And Songs | MTV", 
    //     "Title is equal to Lady Gaga | New Music And Songs | MTV");
    // this.test.assertEquals(this.fetchText('h1'), 'Lady Gaga', "H1 text is 'Lady Gaga'");
    // this.test.assertEquals(this.getElementAttribute('meta[name=description]','content'), 
    //     "Lady Gaga Music, Tour Dates, Photos, Videos, and official news updates directly from Lady Gaga's Twitter and Facebook .",
    //     'meta tag description is correct');
    // this.test.assertEquals(this.getElementAttribute('link[rel=canonical]','href'), 
    //     'http://www.mtv.com/artists/lady-gaga/', 
    //     'Canonical link is correct');

    this.echo("Opening " + this.getCurrentUrl(), 'INFO');
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    testSEOTagsForArtist(this, { name:"Lady Gaga", alias:"lady-gaga", brand:"mtv" }, "profile");
});

casper.run(function() {
    this.test.done();
});