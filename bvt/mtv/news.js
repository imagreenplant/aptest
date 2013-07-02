casper.test.comment('BVT: news page.');

casper.start(casper.environment.mtv + 'artists/taylor-swift/news/', function() {
    this.test.assertTitle("Taylor Swift News Updates | MTV", 
        "Title is equal to Taylor Swift News Updates | MTV");
});

casper.run(function() {
    this.test.done(1);
});