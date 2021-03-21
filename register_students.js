
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

app.post('/register', urlencodedParser, function (req, res) {  
   
   response = {  
       email:req.body.email,  
       password:req.body.pwd, 
       type: "Student"
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("Users");
	  var query = response;
	  	dbo.collection("Users").insertOne(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 new user added");
	    	db.close();
	  		});
		});
   res.sendFile(path.join(__dirname + '/Home.html'));; 

})
app.post('/password', urlencodedParser, function (req, res) {  
   
   response = {  
       email:req.body.email,  
       password:req.body.pwd, 
       type: "Student"
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("Users");
	  var query = response;
	  	dbo.collection("Users").insertOne(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 new user added");
	    	db.close();
	  		});
		});
   res.redirect('/Home');  

})


var server = app.listen(8001, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
})  