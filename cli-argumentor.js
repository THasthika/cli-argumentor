#!/usr/bin/env node

/**
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE 
INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR 
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, 
DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR 
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
**/

module.exports = function(args) {
	var args = args;
	args.shift();
	args.shift();
	var argumentor = {};
	argumentor.params = {};
	argumentor.vars = {};
	argumentor.init = function(cb) {
		cb(this.vars);
		return this;
	};
	argumentor.add = function(keywords, func) {

		if(keywords == undefined || keywords == "" || keywords == [] || keywords.length == 0)
			throw new Error('Keywords must be a string or an array!');

		if(typeof keywords == "string")
			keywords = [keywords];

		func = (func == undefined || typeof func != "function") ? function() {} : func;

		var o = {};
		o.func = func;
		o.count = func.length;

		for(var i = 0; i < keywords.length; i++) {
			this.params[keywords[i]] = o;
		}

		return this;
	};
	argumentor.exec = function(cb) {
		while(args.length > 0) {
			var arg = args.shift();
			for(var k in this.params) {
				if(k === arg) {
					var o = this.params[k];
					var params = [];
					for(var i = 0; i < o.count; i++) {
						params.push(args.shift());
					}
					o.func.apply(this, params);
				}
			}
		}
		cb(this.vars);
	};
	return argumentor;
};