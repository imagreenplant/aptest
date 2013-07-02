casper.test.comment('BVT: MTV tourdates page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/tourdates/', function() {
    this.test.assertTitle("Lady Gaga Tours | Buy Tickets to Concerts, Live Performances | MTV", 
        "Title is equal to Lady Gaga Tours | Buy Tickets to Concerts, Live Performances | MTV");
});

casper.run(function() {
    this.test.done(1);
});