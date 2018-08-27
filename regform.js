var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var mysql=require('mysql');
const crypto=require('crypto');

var connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'',
database:'register'

});

connection.connect(function(err){
     if(err)throw err
       console.log("DataBase connected...");

}); 

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({extended:true}));

// Running Server Details.
  var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 
app.get('/regform', function (req, res) {
  var html='';
  html +="<body>";
  html += "<form action='/detail'  method='post' name='form1'>";
  html += "Name:<input type= 'text' name='name'><br>";
  html += "Register_No:<input type='text' name='regno'><br>";
  html += "Email_id:<input type='mail' name='mail'><br>";
  html += "Password:<input type='password' name='pass'><br>";
  html += "<input type='submit' value='submit'>";
  html += "<input type='reset'  value='reset'>";
  html += "</form>";
  html += "</body>";
  res.send(html);
});
 
app.post('/detail', urlencodedParser, function (req, res){
  var reply='';
  reply += "Your Name is" + req.body.name+"<br>";
  reply += "Your Register_No is" + req.body.regno+"<br>";
  reply += "Your Email_id is" + req.body.mail+"<br>";

var n=req.body.name;
var r=req.body.regno;
var m=req.body.mail;
var p=req.body.pass;

const cipher=crypto.createCipher('aes192','123');
var encrypted=cipher.update(p,'utf8','hex');

var postdata=req.body;

var sql="insert into studentinfo(name,registerno,email,password) values('"+n+"','"+r+"','"+m+"','"+encrypted+"')";

connection.query(sql,function(err){
  if(err) throw err
console.log("Student record inserted suceessfully..");
})

  res.send(reply);
 });

app.get('/student',function(req,res){
connection.query('select name,registerno,email from studentinfo',function(error,results){
 if(error) throw error;
 res.end(JSON.stringify(results));
})
})