
var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');  
var redirect = require('redirective');
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  

app.get('/superuser.html', function (req, res) {  
   res.sendFile(  __dirname + "/" + "superuser.html",__dirname + "/" + "superuser.css");  
})  
 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/suggestion', urlencodedParser, function (req, res) {  
   
   response = {  
       suggestion:req.body.suggestion
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("login_detail");
	  var query = response;
	  dbo.collection("suggestion").insertOne(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 new suggestion added");
	    	db.close();
	  		});
		});
  res.redirect('/superuser.html');

})



var server = app.listen(8005, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
})  