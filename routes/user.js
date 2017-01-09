/** OBTENER LISTA DE USUARIOS **/
exports.list = function(req, res)
{
	res.render('index', { title: 'Test Backend' });
	//res.send('Responder con un recurso');
};