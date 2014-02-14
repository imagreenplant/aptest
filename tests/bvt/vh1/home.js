casper.test.comment('BVT: VH1 home page.');

casper.start(casper.environment.vh1 + 'artists/', function() {
    this.test.assertTitle("VH1 Artists | Discover Music Artists and Bands | VH1", 
        "Title is equal to 'VH1 Artists | Discover Music Artists and Bands | VH1'");
});

casper.run(function() {
    this.test.done(1);
});