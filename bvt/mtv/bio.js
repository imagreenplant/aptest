casper.test.comment('BVT: bio page.');

casper.start(casper.environment.mtv + 'artists/taylor-swift/biography/', function() {
    this.test.assertTitle("Taylor Swift Bio | Taylor Swift Career | MTV", 
        "Title is equal to Taylor Swift Bio | Taylor Swift Career | MTV");
});

casper.run(function() {
    this.test.done(1);
});