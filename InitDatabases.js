const Datastore = require('nedb');
const user = new Datastore({ filename: 'Users.db' });
const IP = new Datastore({ filename: 'IP.db' });
const stock = new Datastore({ filename: 'Stock.db' });
const stockChanges = new Datastore({ filename: 'StockChanges.db' });
const stockHis = new Datastore({ filename: 'StockHistory.db' });
const transaction = new Datastore({ filename: 'transaction.db' });
const DatabaseSQL = require('./BackUp.js');

function RemoveIP(ip) {
    IP.loadDatabase(function (err) {
        // IP.persistence.compactDatafile();
        IP.remove({ IP: ip }, {}, function (err, numRemoved) {
            // console.log(numRemoved + "num");
        });
        setTimeout(() => {
            IP.persistence.compactDatafile();
        }, 1000);
    });
}

function get(par) {
    user.loadDatabase(function (err) {
        // user.persistence.compactDatafile();
        user.find(par, function (err, docs) {
            console.log(docs);
        });
        setTimeout(() => {
            user.persistence.compactDatafile();
        }, 1000);
    });
}
// get({});
function insertUser(json) {
    // user.persistence.compactDatafile();
    user.loadDatabase(function (err) {
        user.insert([
            json
        ]);
    });
    setTimeout(() => {
        user.persistence.compactDatafile();
        DatabaseSQL.InsertUsers();
    }, 2000);
}

function RemoveUser(json) {
    // user.persistence.compactDatafile();
    user.loadDatabase(function (err) {
        user.remove(json, {}, function (err, numRemoved) {
        });
    });
    setTimeout(() => {
        user.persistence.compactDatafile();
        DatabaseSQL.InsertUsers();
    }, 2000);
}

function RemoveTransaction(json) {
    // transaction.persistence.compactDatafile();
    transaction.loadDatabase(function (err) {
        transaction.remove(json, {}, function (err, numRemoved) {
            // setTimeout(() => {
            //     return numRemoved;                
            // }, 100);
        });
    });
    setTimeout(() => {
        transaction.persistence.compactDatafile();
        DatabaseSQL.insertTransactionSQL();
    }, 2000);
}

function insertIP(json) {
    IP.loadDatabase(function (err) {
        IP.insert([
            json
        ]);
    });
    setTimeout(() => {
        IP.persistence.compactDatafile();
    }, 1000);
}

function insertStock(json) {
    // stock.persistence.compactDatafile();
    stock.loadDatabase(function (err) {
        stock.insert([
            json
        ]);
    });
    setTimeout(() => {
        stock.persistence.compactDatafile();
        DatabaseSQL.InsertSQLStockDB();
    }, 2000);
}
function insertStockChanges(json) {
    // stockChanges.persistence.compactDatafile();
    stockChanges.loadDatabase(function (err) {
        stockChanges.insert([
            json
        ]);
    });
    setTimeout(() => {
        stockChanges.persistence.compactDatafile();
        DatabaseSQL.InsertSQLStockChangesDB();
    }, 2000);
}
function insertTransaction(json) {
    // transaction.persistence.compactDatafile();
    setTimeout(() => {
        transaction.loadDatabase(function (err) {
            transaction.insert([
                json
            ]);
        });
        setTimeout(() => {
            transaction.persistence.compactDatafile();
        }, 1000);
        setTimeout(() => {
            DatabaseSQL.insertTransactionSQL();
        }, 2000);
    }, 100);
}

module.exports.get = function (par) {
    return get(par);
}
module.exports.insertUser = function (json) {
    return insertUser(json);
}
module.exports.insertStock = function (json) {
    return insertStock(json);
}
module.exports.insertStockChanges = function (json) {
    return insertStockChanges(json);
}
module.exports.insertIP = function (json) {
    return insertIP(json);
}
module.exports.RemoveUser = function (json) {
    return RemoveUser(json);
}
module.exports.RemoveTransaction = function (json) {
    return RemoveTransaction(json);
}
module.exports.insertTransaction = function (json) {
    return insertTransaction(json);
}
module.exports.RemoveIP = function (ip) {
    return RemoveIP(ip);
}
    //{ID:"0001", Users:"Test", Password:"Test", Email:"Test@test", "Ballance": 3000,Time:"0000000000001"}