casper.test.comment('BVT: CMT artist profile page.');

casper.start(casper.environment.cmt + 'artists/blake-shelton', function() {
    this.test.assertTitle("Blake Shelton | New Music And Songs | CMT", 
        "Title is equal to 'Blake Shelton | New Music And Songs | CMT'");
});

casper.run(function() {
    this.test.done(1);
});