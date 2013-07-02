casper.test.comment('BVT: MTV artist photos page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/photos/', function() {
    this.test.assertTitle("Lady Gaga Photos | Pictures of Lady Gaga | MTV", 
        "Title is equal to Lady Gaga Photos | Pictures of Lady Gaga | MTV");
});

casper.run(function() {
    this.test.done(1);
});