casper.test.comment('BVT: interviews page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/video-interviews/', function() {
    this.test.assertTitle("Lady Gaga Interviews | MTV", 
        "Title is equal to 'Lady Gaga Interviews | MTV'");
});

casper.run(function() {
    this.test.done(1);
});