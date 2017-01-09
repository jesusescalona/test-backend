/**  OBTENER PÁGINA DE INICIO **/
exports.index = function(req, res)
{
  res.render('index', { title: 'Express' });
};