var path=require('path')
var express = require('express');  
const session = require('express-session');
const flash = require('flash');
var app = express();  
var redirect = require('redirective');
var bodyParser = require('body-parser');  
const port = process.env.PORT || 8001;

  app.use(session({
    secret:'hostelmanagement',
    saveUninitialized: true,
    resave: true
}));

var urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.get('/func.html', function (req, res) {  
   res.sendFile(  __dirname + "/" + "func.html",__dirname + "/" + "func.css");  
})  

app.get('/superuser.html', function (req, res) {  
   res.sendFile(  __dirname + "/" + "superuser.html",__dirname + "/" + "superuser.css");  
})  

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.post('/mess_bill', urlencodedParser, function (req, res) {  
   
   response = {  
       roll_no:req.body.bill 
   };  
  console.log(response);  

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("login_detail");
	  var query = response;
  	dbo.collection("mess_bill").find(query).toArray(function(err, result) {
	    if (err) 
	    	res.end("Roll not found");
	    console.log(result);
	    db.close();
	 });
		
	});
   res.redirect('/func.html');
})
app.post('/mess_bill_calculation', urlencodedParser, function (req, res) {  
   
   response = {  

   	 start_date:req.body.mess_bill_startdate,
   	 end_date:req.body.mess_bill_enddate

   };  
  console.log(response);  

	  MongoClient.connect(url, function(err, db) {
	  	if (err) throw err;
	  	var dbo = db.db("login_detail");

	  	//var newvalues = {$set: {start_date: response.end_date,end_date:response.end_date}};
	  	dbo.collection("mess_bill").insertOne(response, function(err, res) {
	    	if (err) throw err;
	    	console.log("1 new user added");
	    	db.close();
	  		});
	   res.redirect('/superuser.html');
})
});
var server = app.listen(8001, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("App listening at http://%s:%s", host, port)  
});  