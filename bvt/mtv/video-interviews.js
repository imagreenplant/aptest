casper.test.comment('BVT: interviews page.');

casper.start(casper.environment.mtv + 'artists/taylor-swift/video-interviews/', function() {
    this.test.assertTitle("Lady Gaga | New Music And Songs | MTV", 
        "Title is equal to Lady Gaga | New Music And Songs | MTV");
});

casper.run(function() {
    this.test.done(1);
});