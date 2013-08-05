casper.test.comment('BVT: CMT home page.');

casper.start(casper.environment.cmt + 'artists/', function() {
    this.test.assertTitle("Artists.CMT | Discover Music Artists and Bands | CMT", 
        "Title is equal to Artists.CMT | Discover Music Artists and Bands | CMT");
});

casper.run(function() {
    this.test.done(1);
});