casper.test.comment('BVT: Genre page.');

casper.start(casper.environment.mtv + 'artists/genre/contemporary+country/', function() {
    this.test.assertTitle("Artists.MTV | Discover Music Artists and Bands | MTV", 
        "Title is equal to Artists.MTV | Discover Music Artists and Bands | MTV");
});

casper.run(function() {
    this.test.done(1);
});