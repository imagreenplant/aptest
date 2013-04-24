var test_links = {
    'dev_or_q': [
        'artists/the-zutler-trio/',
        // 'artists/olivia/',
        // 'artists/the-sawg/',
        // 'artists/mindy-smith/'
    ],
    'live': [
        'artists/the-sawg/',
        // 'artists/jami/',
        // 'artists/lady-gaga/',
        // 'artists/rihanna/'
    ]
}

var links = casper.environment.env === "live" ? test_links.live : test_links.dev_or_q;
    
casper.start();
// casper.echo("Links to be tested: "+ casper.renderJSON(links), "DEBUG");
casper.each(links, function(self, link) {
    self.thenOpen(this.environment.cmt + link, function() {
        this.echo("Opened: " + this.getTitle(), "INFO");
    });
    self.waitForResource('sprite.png', function() {});

    self.then(function(){
    	this.test.assertExists('li.topspinActive', "li item with class 'topspinActive' exists");
        this.test.assertExists('li.topspinActive span.icon', "span element with class 'icon' exists");
        this.test.assertExists('li.topspinActive span.label', "span element with class 'icon' exists");
        this.test.assertEquals(this.fetchText('li.topspinActive span.label'),"Active", "Text in label element is 'Active'");
        this.test.assert(this.resourceExists('sprite.png'), "sprite.png appears to have been loaded correctly");
    });
    self.then(function(){
        this.clear();
    });
});

casper.run(function() {
    this.test.done();
});
