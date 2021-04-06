
var express = require('express');  
var app = express();  
var redirect = require('redirective');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.get('/student_user.html', function (req, res) {  
   res.sendFile(  __dirname + "/" + "student_user.html",__dirname + "/" + "student_user.css");  
})
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/complain', urlencodedParser, function (req, res) {  
   
   response = {  
       complain:req.body.complain
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("login_detail");
	  var query = response;
	  dbo.collection("Complain").insertOne(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 new Complain added");
	    	db.close();
	  		});
		});
 res.redirect('/student_user.html');

})



var server = app.listen(8004, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
})  