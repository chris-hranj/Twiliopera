//use for testing the midigen.js functionality.

var mg = require('./midigen.js');

mg('123456789123456789', function(err){
	if(err)
		console.log(err);
})