casper.test.comment("BVT: MTV artist's interviews page.");

casper.start(casper.environment.mtv + 'artists/lady-gaga/interviews/', function() {
    this.test.assertTitle("MTV Artists | Discover Music Artists and Bands", 
        "Title is equal to 'MTV Artists | Discover Music Artists and Bands'");
});

casper.run(function() {
    this.test.done(1);
});