casper.echo("*****************************************************************************\n"+
			"|   This test is based on a JB and the moonshine band highlight that        |\n"+
			"|   should exist until 2014.  The entry in UMA is here:                     |\n"+
			"|  http://uma.mtvi.com/posting/new_shows/event_edit.jhtml?eventId=896912    |\n"+
			"*****************************************************************************\n", "COMMENT");

casper.start(casper.environment.cmt + "artists/jb-and-the-moonshine-band/", function() {
	this.echo("Opening " + this.getCurrentUrl(), "COMMENT");
});

casper.then(function() {
	this.test.assertExists('table.ap-highlights', "table with class 'ap-highlights' found");
	// this.test.assertExists('td.copy-container div.copy a'#profile-details-navi', "Header information <ul> exists: bio, hometown...");
	this.test.assertEquals(this.fetchText('td.copy-container div.copy a'), "Read More", "Should find text 'Read More' for main link");
	this.test.assertEquals(this.fetchText('td.copy-container div.copy').replace(/(^\s+|\s+$)/g,' '), " CMT Listen Up: Whether they're singing of passionate love or passionate partying, this group brings the vigor to their spirited set. Watch as this Texas group performs \"The Only Drug,\" \"Perfect Girl\" and more during their live performance. Read More ", "should find text");
	this.test.assertEvalEquals(function() {
		return document.querySelector('table.ap-highlights td.thumb-container a img').getAttribute('src');
		}, "http://www.mtv.com/shared/promoimages/cmt/collections/listen_up/140x105.jpg", 'correct CMT Listen up logo url found in img src');
	this.test.assertResourceExists('140x105.jpg', 'img resource 140x105.jpg was loaded');

});

casper.run(function() {
	this.test.done();
});