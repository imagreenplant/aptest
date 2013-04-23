casper.echo("Testing for VH1 linkback on VH1 photo asset page.", "COMMENT");
casper.start(casper.environment.mtv + "artists/norah-jones/photos/7051837/", function() {
    this.echo("Opening "+this.getCurrentUrl(), "COMMENT");
    this.test.assertExists("a.link-back-to-vh1-image", "Linkback element exists.");
    this.test.assertEquals(this.fetchText('a.link-back-to-vh1-image'), "More from this VH1 Photo Collection", 
        "Text matches 'More from this VH1 Photo Collection'");
    this.test.assertEquals(this.getElementAttribute('a.link-back-to-vh1-image', 'href'), 
        "http://www.vh1.com/photos/gallery/?fid=1227303&pid=7051837&dyn=artist", "Link shown matches expected vh1.com link.");
});

casper.run(function() {
    this.test.done();
});
