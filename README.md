#Argumentor

##A command-line argument handler

- ##Usage:
	``` javascript
	var argumentor = require("argumentor");
	var args = new argumentor(process.argv.slice());

	args.init(function(vars) {
		vars.someGlobalValue = true;
	});

	args.add(["--help", "-h"], function() {
		console.log(showHelp);
	});

	args.add(["--run"], function() {
		// run something
	});

	args.exec(function(vars) {
		console.log(vars.someGlobalValue);
	});

	```