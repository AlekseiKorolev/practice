
module.exports = function(app, connection){
  app.get('/', function(req,res) {
    connection.query('SELECT * FROM football', function(err, data) {
      (err)?res.send(err):res.json({football: data});
    })
  })
}
