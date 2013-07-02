casper.test.comment("BVT: MTV artist's music page.");

casper.start(casper.environment.mtv + 'artists/lady-gaga/music/', function() {
    this.test.assertTitle("Lady Gaga New Songs | Listen to Lady Gaga | MTV", 
        "Title is equal to 'Lady Gaga New Songs | Listen to Lady Gaga | MTV'");
});

casper.run(function() {
    this.test.done(1);
});