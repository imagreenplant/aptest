casper.test.comment('BVT: Facebook page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/facebook-updates/', function() {
    this.test.assertTitle("Lady Gaga | New Music And Songs | MTV", 
        "Title is equal to Lady Gaga | New Music And Songs | MTV");
});

casper.run(function() {
    this.test.done(1);
});