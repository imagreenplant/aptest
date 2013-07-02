casper.test.comment('BVT: MTV discography page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/discography', function() {
    this.test.assertTitle("Lady Gaga Latest Albums | MTV", 
        "Title is equal to Lady Gaga Latest Albums | MTV");
});

casper.run(function() {
    this.test.done(1);
});