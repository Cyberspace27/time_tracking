process.env.NODE_ENV = process.env.NODE_ENV || 'development'; 
var mongoose = require('./config/mongoose'),
	express = require('./config/express'),
	passport = require('./config/passport');
var db = mongoose();
var app = express();
var passport = passport();

var port = Number(process.env.PORT||3000)

server.listen(port);

app.listen(port);
module.exports = app;
console.log('Servidor Ejecutandose en http://locahost:3000/');
