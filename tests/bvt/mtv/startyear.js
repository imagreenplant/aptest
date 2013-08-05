casper.test.comment('BVT: Startyear page.');

casper.start(casper.environment.mtv + 'artists/startyear/2006/', function() {
    this.test.assertTitle("2006's Music | Music Artists from the year 2006 | MTV", 
        "Title is equal to 2006's Music | Music Artists from the year 2006 | MTV");
});

casper.run(function() {
    this.test.done(1);
});