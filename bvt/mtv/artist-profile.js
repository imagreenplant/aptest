casper.test.comment('BVT: MTV artist profile page.');

casper.start(casper.environment.mtv + 'artists/lady-gaga/', function() {
    this.test.assertHttpStatus(200, 'Received 200 Status response');
    this.test.assertTitle("Lady Gaga | New Music And Songs | MTV", 
        "Title is equal to Lady Gaga | New Music And Songs | MTV");
});

casper.run(function() {
    this.test.done(2);
});