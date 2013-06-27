var base_domain = casper.environment.mtv;
var test_urls = ['artists/ake-zetterstrom/', 'artists/ace-ventura/'];
var negative_test_urls = ['artists/lady-gaga/', 'artists/rihanna/', 'artists/band-of-horses/'];
var links = [];
var negative_case_links = [];

// Create links for each() command.
for (var i=0;i<test_urls.length;i++) {
	links.push(base_domain+test_urls[i]);
}

// Create negative testing links for each() command.
for (var j=0;j<negative_test_urls.length;j++) {
	negative_case_links.push(base_domain+negative_test_urls[j]);
}

//Some artists had biographies set to null.  We should check for this, and remove the bio.  This test case tests that logic.
//http://jira.mtvi.com/browse/MLAP-1837
casper.start().each(links, function(self, link) {
	self.thenOpen(link, function() {
        this.echo("Testing " + this.getCurrentUrl(), 'INFO');
        this.test.assertDoesntExist('a#profile_detail_bio', 'The bio element #profile_detail_bio link does not exist.');
    });
});

//Just to make sure we didn't break anything, testing the negative case
casper.each(negative_case_links, function(self, link) {
	self.thenOpen(link, function() {
        this.echo("Testing " + this.getCurrentUrl(), 'INFO');
        this.test.assertExists('a#profile_detail_bio', 'The bio element #profile_detail_bio link DOES exist.');
    });
});

casper.run(function() {
    this.test.done();
});