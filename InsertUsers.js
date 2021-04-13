const db = require('./BackUp.js');
const fs = require('fs');
const { Client, Pool } = require('pg');
// db.InsertSQLStockDB();
module.exports.Run = function () {
    return db.InsertUsers();
}
db.InsertUsers();
