const mysql = require('mysql');

/*const con = mysql.createConnection({
  connectionLimit: 10,
  database: 'u0766695_sportevents',
  host: "31.31.198.65",
  user: "u0766695_vksport",
  password: "7Y7x7O9o"
});

/*console.log('Get connection ...');
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('SELECT * FROM football',(err,rows) => {
  if(err) throw err;
  console.log(rows);
})*/

const dataBaseConnection = function(){
  console.log('Im in!');
  const con = mysql.createConnection({
    connectionLimit: 10,
    database: 'u0766695_sportevents',
    host: "31.31.198.65",
    user: "",
    password: ""
  });
  console.log('Get connection ...');
  try{
    con.connect();
    console.log("Connected!");
  }catch(error){
    console.log(error.message);
  }
}
/*export const DataBase = {
  connection: mysql.createConnection({
    database: 'u0766695_sportevents',
    host: "31.31.198.65",
    user: "u0766695_vksport",
    password: "7Y7x7O9o"
  }),

  connectToDataBase(){
    console.log('Get connection ...');
    this.connection.connect( function(error) {
      if (error) throw error;
      console.log("Connected!");
    });
  },

  /*printAllData(){
    try{
      this.connection.query('SELECT * FROM football',(error,rows) => {
        console.log(rows);
      })
    }catch(error){
      console.log(error.message);
    }
  }*/

//}
/*
https://oauth.vk.com/authorize?
client_id=7037509&
display=page&
redirect_uri=//https://oauth.vk.com/blank.html&
scope=friends,notify,messages&
response_type=token&
v=5.52
*/
//export default DataBase;
dataBaseConnection();
module.exports = dataBaseConnection;
