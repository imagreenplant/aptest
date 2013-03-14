casper.setEnviron = function setEnviron() {
	this.environment = {
		mtv:"http://www.mtv.com/",
		cmt:"http://www.cmt.com/",
		vh1:"http://www.vh1.com/",
	}
	this.echo("Environment set to Live!", "COMMENT");
}

casper.setEnviron();
casper.test.done();