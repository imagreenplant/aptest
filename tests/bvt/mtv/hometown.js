casper.test.comment('BVT: Hometown page.');

casper.start(casper.environment.mtv + 'artists/location/Nashville%2C+TN/', function() {
    this.test.assertTitle("Nashville, TN Music Artists, Singers, Bands | MTV", 
        "Title is equal to Nashville, TN Music Artists, Singers, Bands | MTV");
});

casper.run(function() {
    this.test.done(1);
});