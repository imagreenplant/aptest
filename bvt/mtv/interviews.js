casper.test.comment("BVT: MTV artist's interviews page.");

casper.start(casper.environment.mtv + 'artists/lady-gaga/interviews/', function() {
    this.test.assertTitle("Artist Platform | MTV", 
        "Title is equal to Artist Platform | MTV");
});

casper.run(function() {
    this.test.done(1);
});