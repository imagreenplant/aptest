var test_links = {
    'dev': [
        'artists/the-zutler-trio/',
        'artists/olivia/',
        'artists/the-sawg/',
        'artists/mindy-smith/'
    ],
    'live_or_q': [
        'artists/the-sawg/',
        'artists/jami/',
        'artists/lady-gaga/',
        'artists/rihanna/'
    ]
};

var links = casper.environment.env === "dev" ? test_links.dev : test_links.live_or_q;
    
casper.start();
casper.each(links, function(self, link) {
    self.thenOpen(this.environment.cmt + link, function() {
        this.echo("Opened: " + this.getCurrentUrl(), "INFO");
        this.echo("Page Title: " + this.getTitle(), "INFO");
    });

    self.then(function(){
        this.test.assertExists('li.topspinActive', "li item with class 'topspinActive' exists");
        this.test.assertExists('li.topspinActive span.icon', "span element with class 'icon' exists");
        this.test.assertExists('li.topspinActive span.label', "span element with class 'icon' exists");
        this.test.assertEquals(this.fetchText('li.topspinActive span.label'),"Active", "Text in label element is 'Active'");
        // Had to remove this case.  There is a bug where successive calls of thenOpen will cause
        // resources not to show as loaded, and thus this case will fail in every case after the
        // first url tested.
        // this.test.assert(this.resourceExists('sprite.png'), "sprite.png appears to have been loaded correctly");
    });
});

casper.run(function() {
    this.test.done();
});
