var base_domain = 'http://www.mtv-d.mtvi.com/'
var tested_url = "artist-platform/sign-up/"

//Tests that the artist platform sign-up page has been redirect to AP home.
//http://jira.mtvi.com/browse/MLAP-1890
casper.start(base_domain+tested_url, function() {
    this.test.assertEquals(this.getCurrentUrl(),base_domain+"artists/", "Redirect old beta sign-up page to /artists/ home page.")
})

casper.run(function() {
    this.test.renderResults(true);
});