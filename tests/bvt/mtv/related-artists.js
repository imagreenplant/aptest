casper.test.comment('BVT: Related artists page.');

casper.start(casper.environment.mtv + 'artists/taylor-swift/related-artists/?filter=similar', function() {
    this.test.assertTitle("Artists Like Taylor Swift | Similar to Taylor Swift | MTV", 
        "Title is equal to Artists Like Taylor Swift | Similar to Taylor Swift | MTV");
});

casper.run(function() {
    this.test.done(1);
});