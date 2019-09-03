//Add required modules
require("dotenv").config(); //loads environment variables from a .env file into process.env
const config = require("./config.js"); //exported objects of the MYSQL configuration
const mysql = require("mysql");

var pool = mysql.createPool(config.mysql);

/* Troubleshoot connections if needed

pool.on('acquire', function(connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function(connection) {
    console.log('New connection %d', connection.threadId);
});

pool.on('release', function(connection) {
    console.log('Connection %d released', connection.threadId);
});

*/

module.exports = pool;