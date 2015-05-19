var config = require('./config'),
	session = require('express-session'),
	express = require('express'),
  	morgan = require('morgan'),
  	compress = require('compression'),
  	bodyParser = require('body-parser'),
  	methodOverride = require('method-override'),
  	flash = require('connect-flash'),
  	passport = require('passport');



module.exports = function(){
	var app = express();
	if(process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));
	//Configurar el motor view de la aplicacion y el directorio views
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	
	//Cargar los archivos de enrutamieto 
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/tickets.server.routes.js')(app);

	//Configurar el servidor de archivos estaticos
	app.use(express.static('./public'));

	//Devolver la instancia de la aplicacion Express
	return app;
};