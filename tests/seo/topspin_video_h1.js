var base_domain = casper.environment.mtv;
var test_url, h1_text, title_tag;


if (casper.environment.env === "live") {
    test_url =  '/artists/miguel/videos/81583/';
    h1_text = 'Miguel Backstage by Miguel';
    title_tag = 'Miguel Backstage by Miguel | MTV';
}
else {
    test_url = '/artists/the-sawg/videos/253/';
    h1_text = 'Rbsp Launch 480p by The SAWG';
    title_tag = 'Rbsp Launch 480p by The SAWG | MTV';
}

//Some artists had biographies set to null.  We should check for this, and remove the bio.  This test case tests that logic.
//http://jira.mtvi.com/browse/MLAP-1837
casper.start(casper.environment.mtv + test_url, function() {
    this.echo("Testing " + this.getCurrentUrl(), 'INFO');
    this.test.assertExists('h1', 'H1 exists');
    this.test.assertEquals(this.fetchText('h1').trim(), h1_text, "H1 text includes video title and band: " + h1_text);
    this.test.assertTitle(title_tag, "Title tag includes video title and band: " + title_tag);
});

casper.run(function() {
    this.test.done();
});