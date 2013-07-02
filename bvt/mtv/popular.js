casper.test.comment('BVT: popular page.');

casper.start(casper.environment.mtv + 'artists/popular/', function() {
    this.test.assertTitle("Top Music Artists | Top Bands | MTV", 
        "Title is equal to Top Music Artists | Top Bands | MTV");
});

casper.run(function() {
    this.test.done(1);
});