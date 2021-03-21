
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

app.post('/credentials', urlencodedParser, function (req, res) {  
   
   response = {  
       email:req.body.email,  
       password:req.body.pwd, 
       user_type: req.body.type
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("login_detail");
	  var query = response;
	  dbo.collection("Users").find(query).toArray(function(err, result) {
	    if (err) 
	    	res.end("Users not found");
	    console.log(result);
	    db.close();
	  });
	});
   res.end();  

})

var server = app.listen(8000, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
})  