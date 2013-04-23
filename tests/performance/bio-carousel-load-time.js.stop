var base_domain = casper.environment.mtv
var control_url = "artists/lady-gaga/"
var experiment_url = "artists/lady-gaga/indexbio/"

var start, end, time, control_avg, experiment_avg;
var repeat = 100;
var control_sum = 0;
var experiment_sum = 0;

casper.start();

casper.repeat(repeat,function(){
	start = new Date().getTime();
	this.thenOpen(base_domain+control_url, function() {
		end = new Date().getTime();
	});
	this.then(function(){
		time = (end - start) * 0.001;
		this.echo("time is "+ time + " seconds", "INFO");
		control_sum += time;
	});
	this.clear();
});

casper.then(function(){
	control_avg = control_sum/repeat;
	this.echo("Control URL is complete.  Average is "+control_avg, "INFO");
});

casper.repeat(repeat,function(){
	start = new Date().getTime();
	this.thenOpen(base_domain+experiment_url, function() {
		end = new Date().getTime();
	});
	this.then(function(){
		time = (end - start) * 0.001;
		this.echo("time is "+ time + " seconds", "INFO");
		experiment_sum += time;
	});
	this.clear();
});

casper.then(function(){
	experiment_avg = experiment_sum/repeat;
	this.echo("Experiment URL is complete.  Average is "+experiment_avg, "INFO");
	this.echo("Control AVG: "+control_avg+", Experiment AVG: "+experiment_avg, "INFO");
	var load_time_change = experiment_avg - control_avg;
	var percent_change = load_time_change / control_avg;
	this.echo("Average load time changed " + percent_change + "%, with a change of " + load_time_change + " seconds", "INFO");
});


casper.run(function() {
    this.test.done();
});
