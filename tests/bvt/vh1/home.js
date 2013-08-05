casper.test.comment('BVT: VH1 home page.');

casper.start(casper.environment.vh1 + 'artists/', function() {
    this.test.assertTitle("Artists.VH1 | Discover Music Artists and Bands | VH1", 
        "Title is equal to Artists.VH1 | Discover Music Artists and Bands | VH1");
});

casper.run(function() {
    this.test.done(1);
});