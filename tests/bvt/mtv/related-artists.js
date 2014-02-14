casper.test.comment('BVT: Related artists page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/related-artists/?filter=similar', function() {
    this.test.assertTitle("Artists Like Lady Gaga | Similar to Lady Gaga | MTV", 
        "Title is equal to Artists Like 'Lady Gaga | Similar to Lady Gaga | MTV'");
});

casper.run(function() {
    this.test.done(1);
});