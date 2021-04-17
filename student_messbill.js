
var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/mess_bill', urlencodedParser, function (req, res) {  
   
   response = {  
       roll_no:req.body.mess_bill
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("login_detail");
	  var query = response;
	  /*dbo.collection("mess_bill").insertOne(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("Request to view the mess bill");
	    	db.close();
	  		});
		});*/
   res.end();  

})

var server = app.listen(8007, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
})  