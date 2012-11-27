mtv_q_base_domain = 'http://www.mtv-q.mtvi.com'


var links = [
    '/artists/collections/CMT-Crossroads/896718',
    '/artists/collections/CMT-Edge/896711',
    '/artists/collections/CMT-Listen-Up/896712',
    '/artists/collections/CMT-On-Tour/896713',
    '/artists/collections/CMT-Concrete-Country/896714',
    '/artists/collections/Live-at-CMT/896715',
    '/artists/collections/Unplugged/896716'
];

var cmtpattern = new RegExp ('^http://www.cmt-q.mtvi.com/artists/');

casper.start().each(links, function(self, link) {
    self.thenOpen(mtv_q_base_domain + link, function() {
        this.echo(this.getTitle());
        //this.test.assertTitle('Google','has google title');
        this.test.assertUrlMatch(cmtpattern, 'Domain successfully served from CMT. MLAP-1387');
    });
});

casper.run(function() {
    this.test.renderResults(true);
});