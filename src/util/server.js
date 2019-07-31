//for local server
const express = require('express');
const mysql = require('mysql');
const PORT = process.env.PORT || 3000;
const app = express();

/*const connection = mysql.createConnection({
  connectionLimit: 10,
  database: 'u0766695_sportevents',
  host: "31.31.198.65",
  user: "u0766695_vksport",
  password: "7Y7x7O9o"
});*/

const pool = mysql.createPool({
  connectionLimit: 10,
  database: 'u0766695_sportevents',
  host: "31.31.198.65",
  user: "u0766695_vksport",
  password: "7Y7x7O9o"
});

//app.use(express.static('public'));

app.get('/', (req, res, next) => {
  pool.getConnection(function(err, connection){
    connection.query('SELECT * FROM football', function(err, data) {
      connection.release();
      if(err) throw err;
      res.send(JSON.stringify(data));
    });
  });
});
//app.post('/', (req, res, next) => {
  //console.log(req.query);
  /*pool.getConnection(function(err, connection){
    connection.query('SELECT * FROM football', function(err, data) {
      connection.release();
      if(err) throw err;
      res.send(JSON.stringify(data));
    });
  });*/
//});
/*app.get('', (req, res, next) => {
  connection.connect(function(err){
    (err)? console.log(err) : console.log('Connected');
  });
  connection.query('SELECT * FROM football', function(err, data) {
    (err)?res.send(err):res.json({football: data});
  });
  connection.end(function(err) {
  if (err) {
    return console.log('error:' + err.message);
  }
  console.log('Close the database connection.');
  });
})*/

//require('./html-routes')(app,connection);
//for local server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});
