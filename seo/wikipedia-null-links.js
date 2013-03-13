var base_domain = 'http://www.mtv-d.mtvi.com/';
var test_urls = ['artists/ake-zetterstrom/', 'artists/ace-ventura/'];
var links = [];

// Create links for each() command.
for (var i=0;i<test_urls.length;i++) {
	links.push(base_domain+test_urls[i]);
}

//Some artists had biographies set to null.  We should check for this, and remove the bio.  This test case tests that logic.
//http://jira.mtvi.com/browse/MLAP-1837
casper.start().each(links, function(self, link) {
	self.thenOpen(link, function() {
        this.echo(this.getTitle());
        this.echo("Testing " + this.getCurrentUrl(), 'INFO');
    	this.test.assertDoesntExist('a#profile_detail_bio', 'The bio element #profile_detail_bio link does not exist.');
    });
})

casper.run(function() {
    this.test.renderResults(true);
    this.test.done();
});