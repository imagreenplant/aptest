casper.test.comment('BVT: CMT home page.');

casper.start(casper.environment.cmt + 'artists/', function() {
    this.test.assertTitle("CMT Artists | Discover Music Artists and Bands | CMT", 
        "Title is equal to 'CMT Artists | Discover Music Artists and Bands | CMT'");
});

casper.run(function() {
    this.test.done(1);
});