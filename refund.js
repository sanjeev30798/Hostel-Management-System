
var express = require('express');  
var app = express();  
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
var redirect = require('redirective');
app.get('/student_user.html', function (req, res) {  
   res.sendFile(  __dirname + "/" + "student_user.html",__dirname + "/" + "student_user.css");  
})
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/refund', urlencodedParser, function (req, res) {  
   
   if(req.body.days!="")
   {
	   response = {  
	       type:"mess",
	       roll_no: req.body.roll_no,
	       days: req.body.days,

	   };
	   console.log(response);  
	   MongoClient.connect(url, function(err, db) {
			  if (err) throw err;
			  var dbo = db.db("login_detail");
			  var query = response;
			  dbo.collection("mess_refund").insert(response, function(err, res) {
			    	if (err) throw err;
			    	console.log("1 new request for mess refund added");
			    	db.close();
			  		});
				});
		  res.redirect('/student_user.html');
   }
   else
   {
   		response = {  
	       type:"hospital",
	       roll_no: req.body.roll_no,
	       //days: req.body.days,
	       amount: req.body.amount

	   };
	   console.log(response);  
	   MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("login_detail");
	  var query = response;
	  dbo.collection("hospital_refund").insert(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 new request for hospital bill refund added");
	    	db.close();
	  		});
		});
   	res.redirect('/student_user.html');
   }
  

	

})


var server = app.listen(8006, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
})  