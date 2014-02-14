casper.test.comment('BVT: MTV home page.');

casper.start(casper.environment.mtv + 'artists/', function() {
    this.test.assertTitle("MTV Artists | Discover Music Artists and Bands | MTV", 
        "Title is equal to 'MTV Artists | Discover Music Artists and Bands | MTV'");
});

casper.run(function() {
    this.test.done(1);
});