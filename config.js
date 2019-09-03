//Store MYSQL username and password
exports.mysql = {
    connectionLimit: process.env.MYSQL_ConnectionLimit,
    host: process.env.MYSQL_Host,
    user: process.env.MYSQL_USERID,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_Database,
    port: process.env.MYSQL_Port
};