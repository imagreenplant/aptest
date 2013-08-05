casper.test.comment('BVT: interviews page.');

casper.start(casper.environment.mtv + 'artists/taylor-swift/video-interviews/', function() {
    this.test.assertTitle("Taylor Swift | New Music And Songs | MTV", 
        "Title is equal to Taylor Swift | New Music And Songs | MTV");
});

casper.run(function() {
    this.test.done(1);
});