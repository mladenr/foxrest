
/*myHome.save(function(error) {
	if (error) {
		console.log('Error');
		console.log(error);
	} else {
		myHome.save();
		console.log('Home saved.');
	}
});
*/


var express = require("express");
var bodyParser = require('body-parser');

var app = express();
var homeDataService = require('./src/homeDataService');

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());

app.get("/", function(request, response) {

	request.body.id = '25';
	request.body.streetName = 'Generala Stefanika';
	homeDataService.create(request.body, response);
	response.send("Hello world!");
});

app.listen(app.get("port"), function() {
	console.log("App started on port " + app.get("port"));
});
