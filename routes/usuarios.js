var Usuario;
exports.setModel = function(modelo)
{
	Usuario = modelo;
};
exports.index = function(req, res)
{
	Usuario.find({}, function(error, usuarios)
	{
		if(error)
		{
			res.send('Ha surgido un error.');
		}
		else
		{
			res.render('usuarios/index',
			{
				usuarios: usuarios,
				title: 'Test Backend'
			});
		}
	})
};
exports.create = function(req, res)
{
	res.render('usuarios/save', 
	{
		put: false,
		action: '/usuarios/',
		usuario: new Usuario(
		{
			name: '',
			gender: '',
			company: '',
			email: '',
			phone: '',
			address: ''
		}),
		title: 'Test Backend'
	});
};
exports.store = function(req, res)
{
	var usuario = new Usuario(
	{
		name: req.body.name,
		gender: req.body.gender,
		company: req.body.company,
		email: req.body.email,
		phone: req.body.phone,
		address: req.body.address
	});

	usuario.save(function(error, documento)
	{
		if(error)
		{
			res.send('Error al intentar guardar el usuario.');
		}
		else
		{	
			console.log(documento);
			res.redirect('/usuarios');
		}
	});
};
exports.show = function(req, res)
{
	Usuario.findById(req.params.id, function(error, documento)
	{
		if(error)
		{
			res.send('Error al intentar ver el usuario.');
		}
		else
		{
			res.json(200,documento);
			res.render('usuarios/show', 
			{	

				usuario: documento,
				title: 'Test Backend'
			});
		}
	});
};
exports.edit = function(req, res)
{
	Usuario.findById(req.params.id, function(error, documento)
	{
		if(error)
		{
			res.send('Error al intentar ver el usuario.');
		}
		else
		{
			res.render('usuarios/save', 
			{
				put: true,
				action: '/usuarios/' + req.params.id,
				usuario: documento,
				title: 'Test Backend'
			});
		}
	});
};
exports.update = function(req, res)
{
	Usuario.findById(req.params.id, function(error, documento)
	{
		if(error)
		{
			res.send('Error al intentar modificar el usuario.');
		}
		else
		{
			var usuario = documento;
			usuario.name = req.body.name;
			usuario.gender = req.body.gender;
			usuario.company = req.body.company;
			usuario.email = req.body.email;
			usuario.phone = req.body.phone;
			usuario.address = req.body.address;
			usuario.save(function(error, documento)
			{
				if(error)
				{
					res.send('Error al intentar guardar el usuario.');
				}else
				{	
					res.redirect('/usuarios');
				}
			});
		}
	});
};
exports.destroy = function(req, res)
{
	Usuario.remove({_id: req.params.id}, function(error)
	{
		if(error)
		{
			res.send('Error al intentar eliminar el usuario.');
		}
		else
		{	
			res.redirect('/usuarios');
		}
	});
};
