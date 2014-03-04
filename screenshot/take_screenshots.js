var base_domain;
var test_urls = {
    "mtv": [
                'artists/',
                'artists/opportunities/',
                'artists/opportunities/opportunity/43/',
                'artists/popular/',
                'artists/emerging/',
                'artists/about/',
                'artists/collections/',
                'artists/downloads/',
                'artists/asdfaskdjfasldkfjsldkfjsaldfkjadslkfj/', // 404 page

                'artists/lady-gaga/',  //Claimed, no video intro
                'artists/kate-nash/',  //Video intro
                'artists/jami/',  //Artistlink only

                'artists/lady-gaga/updates/',
                'artists/lady-gaga/video-interviews/',
                'artists/lady-gaga/photos/',
                'artists/lady-gaga/news/',
                'artists/lady-gaga/discography/',
                'artists/lady-gaga/tourdates/',

                'artists/kate-nash/related-artists/?filter=similar',
                'artists/kate-nash/related-artists/?filter=followers',
                'artists/kate-nash/related-artists/?filter=influencedBy',
                'artists/kate-nash/music/',

                'artists/location/New+York+City%2C+NY/#from-lady-gaga',
                'artists/genre/pop/#from-kate-nash',
                'artists/startyear/2005/#from-kate-nash',

                'artists/collections/weird-vibes/896328/',

                'artists/collections/artists-to-watch/896317/',
                'artists/video-franchise/stop-watch/4245/'
            ],
    "vh1": [ 
                'artists/',
                'artists/collections/',
                'artists/collections/vh1-classic/896674/',
                'artists/collections/artists-to-watch/896317/'    
            ],
    "cmt": [
                'artists/blake-shelton/', 
                'artists/blake-shelton/related-artists/?filter=similar',
                'artists/blake-shelton/related-artists/?filter=followers',
                'artists/blake-shelton/related-artists/?filter=influencedBy',
                'artists/location/New+York+City%2C+NY/#from-blake-shelton',
                'artists/genre/pop/#from-blake-shelton',
                'artists/startyear/2005/#from-blake-shelton',
                'artists/blake-shelton/music/',
                'artists/blake-shelton/updates/',
                'artists/blake-shelton/video-interviews/',
                'artists/blake-shelton/photos/',
                'artists/blake-shelton/news/',
                'artists/blake-shelton/discography/',
                'artists/blake-shelton/tourdates/',
                'artists/collections/',
                'artists/collections/2013-cmt-music-awards/897012/',
                'artists/collections/artists-to-watch/896317/'    
            ],
    "logo": [
                'artists/',
                'artists/collections/', 
                'artists/collections/newnownext/897251/',
            ],
    "tr3s": [           
                'artists/',
            ]
};

var final_url,
    file_name,
    links = [],
    viewports = [
      {
        'name': 'smartphone-portrait',
        'viewport': {width: 320, height: 480}
      },
      {
        'name': 'smartphone-landscape',
        'viewport': {width: 480, height: 320}
      },
      {
        'name': 'tablet-portrait',
        'viewport': {width: 768, height: 1024}
      },
      {
        'name': 'tablet-landscape',
        'viewport': {width: 1024, height: 768}
      },
      {
        'name': 'desktop',
        'viewport': {width: 1280, height: 1024}
      }
    ];
 

// Create links for each() command.
Object.keys(test_urls).forEach(function (key) { 
    for (var i=0;i<test_urls[key].length;i++) {
        if (key === "vh1") { base_domain = casper.environment.vh1; }
        else if (key === "cmt") { base_domain = casper.environment.cmt; }
        else if (key === "logo") { base_domain = casper.environment.logo; }
        else if (key === "tr3s") { base_domain = casper.environment.tr3s; }
        else {base_domain = casper.environment.mtv; }

        final_url = base_domain + test_urls[key][i];
        casper.echo("Adding url: " + final_url);
        // casper.echo("File URL will be: " + makeBetterFileName(test_urls[key][i]));
        links.push(final_url);
    }
});




// casper.start().viewport(400, 768);
casper.start().each(links, function(self, link) {
    self.each(viewports, function(that, viewport) {
      that.then(function() {
        this.echo("Changing to " + viewport.viewport.width);
        this.viewport(viewport.viewport.width, viewport.viewport.height);
      });
      that.thenOpen(link, function() {
        this.echo("Testing " + this.getCurrentUrl(), 'INFO');
      });
      that.then(function(){
        file_name = makeBetterFileName("screenshot/" + link.split("/").slice(3).join("/")) +casper.environment.env.toUpperCase() + "-" + viewport.name + ".png";
        casper.echo("**** Picture Taken ****  -> " + file_name, "ERROR");
        // this.capture(file_name);
        this.capture(file_name, {
            top: 0,
            left: 0,
            width: viewport.viewport.width,
            height: viewport.viewport.height
        });
      });
    });
});



casper.run(function() {
    this.test.done();
});