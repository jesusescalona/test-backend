/** DEPENDENCIAS **/
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var usuarios = require('./routes/usuarios');

/** CONEXIÓN **/
mongoose.connect('mongodb://localhost/db_backend', function(error)
{
	if(error)
	{
		throw error;		
	}
	else
	{
		console.log('Conectado a MongoDB');
	}
});

var UsuarioSchema = mongoose.Schema(
{
	name: {type: String, required: true},
	gender: {type: String, required: true},
	company: {type: String, required: true},
	email: {type: String, required: true},
	phone: {type: String, required: true},
	address: {type: String, required: true}
});

var UsuarioModel = mongoose.model('Usuario', UsuarioSchema);
usuarios.setModel(UsuarioModel);

var app = express();

// ENTORNOS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// DESARROLLO
if ('development' == app.get('env'))
{
  app.use(express.errorHandler());
}


//ROUTES
app.get('/', routes.index);
app.get('/users', user.list);

app.get('/usuarios', usuarios.index);
app.get('/usuarios/create', usuarios.create);
app.post('/usuarios', usuarios.store);
app.get('/usuarios/:id', usuarios.show);
app.get('/usuarios/:id/edit', usuarios.edit);
app.put('/usuarios/:id', usuarios.update);
app.delete('/usuarios/:id', usuarios.destroy);

http.createServer(app).listen(app.get('port'), function()
{
  console.log('Servidor Express  iniciado en el puerto: ' + app.get('port'));
});
