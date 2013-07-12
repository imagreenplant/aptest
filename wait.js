var bvt_wait_time = 120000;

casper.test.comment('Waiting for ' + bvt_wait_time/1000 + ' seconds for build to deploy and start.');

casper.start('http://www.example.com/', function() {
    this.wait(bvt_wait_time, function() {});
});

casper.run(function() {
    this.test.done();
});