#cli-argumentor

##A command-line argument handler

- ##Usage:
	``` javascript
	var argumentor = require("cli-argumentor");
	var args = new argumentor(process.argv.slice());

	// this.vars is a global variable holder for the argumentor object
	args.init(function(vars) {
		vars.someGlobalValue = true;
	})
	.add(["--help", "-h"], function() {
		console.log(showHelp);
	})
	.add(["--run"], function() {
		this.vars.someGlobalValue = false;
		// run something
	});

	args.add(["--make"], function() {
		// make something
	});

	args.exec(function(vars) {
		console.log(vars.someGlobalValue);
	});

	```