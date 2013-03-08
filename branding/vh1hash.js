casper.start("http://www.mtv-d.mtvi.com/artists/#vh1", function() {
	this.echo(this.getCurrentUrl());
});

casper.run(function() {
	this.echo(this.getCurrentUrl());
	this.test.assertExists('a#logo.vh1',"Found 'vh1' class on logo element");
	this.test.assertNotExists('a#logo.mtv',"Did NOT find 'mtv' class on logo element");
	this.test.assertNotExists('a#logo.cmt',"Did NOT find 'mtv' class on logo element");
});