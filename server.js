process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');
var db = mongoose();
var app = express();
var passport = passport();

var port = process.env.PORT || 8080;
//var port = Number(process.env.PORT||3300)
app.listen(port);
//app.listen(3000);
module.exports = app;
console.log('Servidor Ejecutandose en http://locahost:8080/');
