var links = [
    'artists/collections/behind-the-music/896662/',
    'artists/collections/as-heard-on-vh1/896668/',
    'artists/'
];

var links_tested = 5;
var sublinks = [];

function start(link) {
    this.thenOpen(link, function() {
        this.echo('Page title: ' + this.getTitle());
        this.echo(this.getCurrentUrl());
        if(link.indexOf("-jq.") > -1) {
            link = link.replace("-jq.","-q.");
        }
        this.test.assertEquals(link, this.getCurrentUrl(), "Link given in page matches link navigated to -> good SEO");
    });
}

casper.start().each(links, function(self, link) {
    self.thenOpen(this.environment.vh1 + link, function() {
        this.echo("Opened: " + this.getTitle(), "INFO");
    });
    self.then(function(){
        // Grabs all of the artist links within the artist grid page given.
        hrefs = this.evaluate(function(){
            var elements = document.querySelectorAll('.list-artists .grid-item a');
            return [].map.call(elements, function(element) {
                return element.href;
            });
        });
    });
    self.then(function(){
        for(var i = 0; i < links_tested && i < hrefs.length; i++) {
            // this.echo("i = "+i+", link is "+hrefs[i], "DEBUG");
            start.call(this, hrefs[i]);
        }
    });
    self.then(function() {
        sub_links = [];
    });
});

casper.run(function() {
    this.test.done();
});
