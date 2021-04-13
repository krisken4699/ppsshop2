const { Client, Pool } = require('pg');
const fs = require('fs');
const fetch = require('node-fetch');
// process.env.DATABASE_URL = "postgres://wjfktljwltekjz:631afbee4187a90be90b7c5c992d23427e5a02a3e6cef4044f80e86b2a344715@ec2-54-73-68-39.eu-west-1.compute.amazonaws.com:5432/daf5b7rjgrac6d";
const exec = require('util').promisify(require('child_process').exec);
global.updatedDatabaseCreds = false;
async function ls() {
    const { stdout, stderr } = await exec('heroku config');
    console.log(stdout.replace('\n', "").replace('=== pangcu Config Vars', "").replace('DATABASE_URL: ', '').replace('\n', ""));
    process.env.DATABASE_URL = stdout.replace('\n', "").replace('=== pangcu Config Vars', "").replace('DATABASE_URL: ', '').replace('\n', "");
    global.updatedDatabaseCreds = true;
}
ls();
let DelayedWhile = async (milliseconds) => {
    while (!global.updatedDatabaseCreds) {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }
        await sleep(milliseconds);
    }
    global.client = new Client(
        {
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    // LoadAllSQL();
}
DelayedWhile(100)

function InsertUsers() {
    try {
        try {
            client.connect();
        } catch (error) {
            client.end();
            client.connect();
        }
        fs.readFile('./Users.db', 'utf-8', (err, data) => {//UPDATE public."Users" SET "Users"='';
            client.query('UPDATE public."Users" SET "Users"=\'' + data + '\';', function (err, res) {
                console.log('Users Backup Complete!');
            });
        });
    } catch (error) {
        console.log(error);
    }
}
function insertTransactionSQL() {
    try {
        try {
            client.connect();
        } catch (error) {
            client.end();
            client.connect();
        }
        setTimeout(() => {
            fs.readFile('./transaction.db', 'utf-8', (err, data) => {
                // console.log(data);
                ///UPDATE public."Transaction"	SET "Transaction"='Test';
                client.query('UPDATE public."Transaction"	SET "Transaction"=\'' + data + '\' RETURNING *;', function (err, res) {
                    // console.log(res.rows)
                    console.log('Transaction Backup Complete!');
                });
            })
        }, 100);
    } catch (error) {
        console.log(error);
    }
}

function insertURL(url) {
    try {
        try {
            client.connect();
        } catch (error) {
            client.end();
            client.connect();
        }
        setTimeout(() => {
            // console.log(data);
            ///UPDATE public."Transaction"	SET "Transaction"='Test';
            client.query('INSERT INTO public."ImageURLs"( "ImageURLs") VALUES (\''+ url+'\') RETURNING *;', function (err, res) {
                console.log('Image Upload Backup Complete!');
            });
        }, 100);
    } catch (error) {
        console.log(error);
    }
}
// uploadImages()
// function uploadImages(req) {
//     var imgae = "";
//     fs.promises.readFile('')
//     var options = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ key: "8eeb2a252dc232aca65ac791fe33ee61", image: image })
//     };
//     fetch('https://api.imgbb.com/1/upload', options).then((response) => { return response.json() }).then((responseJson) => {
//         console.log(responseJson);
//     })
// }

function insertFilesSQL() {
    try {
        try {
            client.connect();
        } catch (error) {
            client.end();
            client.connect();
        }
        setTimeout(() => {
            // const fs2 = fs.promises;
            // const contents = await fs2.readdir('./share', { encoding: 'utf-8' });
            fs.readdir('./share', { encoding: 'utf-8' }, (Err, contents) => {
                var FileJson = [];
                /*
                for (i = 0; i < contents.length; i++) {
                    const index = i;
                    console.log(contents[i]);
                    // function readFile(file, callback){
                    fs.readFile("./share/" + contents[i], 'base64', (err, data) => {
                        // client.query('UPDATE public."Transaction"	SET "Transaction"=\'' + data + '\' RETURNING *;', function (err, res) {
                        // console.log('Transaction Backup Complete!');
                        console.log(index);
                        FileJson[index] = {
                            Name: contents[index], Data: data
                        };
                    });
                    // }

                    if (index == contents.length - 1)
                        setTimeout(() => {
                            console.log(FileJson);
                        }, 1000);
                }
                // fs.writeFile('./Files.json', FileJson, function (err) {
                //     // console.log("Users File was updated!");
                // });
                */
                loop(contents.length, contents)
                function loop(times, contents) {
                    async function main() {
                        if (i < times) {
                            console.log(contents[i]);
                            // console.log(i);
                            const fs2 = fs.promises;
                            // FileJson[i] = JSON.stringify({ Data: await fs2.readFile('./share/' + contents[i], { encoding: 'base64' }), Name: contents[i] });
                            const Security = require('./KenEncryptionAndDecryptionLibrary');
                            // client.query('INSERT INTO public."Files"( "Name", "Data") VALUES (\'' + contents[i] + '\', \'\\x' +
                            //     // Security.String2Hex(await fs2.readFile('./share/' + contents[i], { encoding: 'base64' }))
                            //     +'\');')
                            i++;
                            main();
                        } else {
                            fs.readFile('./share/Cat.png', function (err, data) {
                                const temp = Buffer.from("\\x" + Buffer.from(data.buffer).toString('hex'))
                                // console.log(Buffer.from("\\x"+ Buffer.from(data.buffer)).toString('hex'));
                                fs.writeFile('./Files', temp, function (err) {
                                    console.log(err)
                                });
                                // client.query('INSERT INTO public."Files"( "Name", "Data") VALUES (\'' + 1 + '\', \'' +
                                //     temp
                                //     + '\');')
                            })
                            // client.query('SELECT "Name", "Data" FROM public."Files";')
                            //     .then(res => {
                            //         try {
                            //             console.log(res.rows[1].Data.toString())
                            //         } catch (error) {
                            //             console.log(error);
                            //         }
                            //     })
                            //     .catch(e => console.error(e.stack))
                            console.log('Ended Reading');
                            // console.log(FileJson.toString());
                            // const temp = FileJson.toString();
                            // client.query('UPDATE public."Files"	SET "Files"=\'' + temp + '\' RETURNING *;')
                            // fs.writeFile('./Files.db', FileJson, function (err) {
                            //     console.log('wrote file')
                            // });
                        }
                    }
                    if (typeof i == 'undefined') {
                        var i = 0;
                        main();
                    }
                    else {
                        main();
                    }
                }
            });
        }, 100);
    } catch (error) {
        console.log(error);
    }
}

function InsertSQLStockDB() {
    try {
        try {
            client.connect();
        } catch (error) {
            client.end();
            client.connect();
        }
        console.log('Db Disconnected');
        setTimeout(() => {//INSERT INTO public."Stock"("Stock", "StockChanges") VALUES (?, ?);
            fs.readFile('Stock.db', 'utf-8', (err, stockData) => {
                fs.readFile('StockChanges.db', 'utf-8', (err, stockChangesData) => {
                    //INSERT INTO public."Stock"("Stock", "StockChanges") VALUES (\'' + data + '\', \'' + data + '\');
                    //UPDATE public."Stock" SET "Stock"=?, "StockChanges"=;
                    client.query('UPDATE public."Stock" SET "Stock"=\'' + stockData + '\', "StockChanges"=\'' + stockChangesData + '\';', (err, res) => {
                        console.log('Stock Backup Complete!');
                    });
                });
            });
        }, 2000);
    } catch (error) {
        console.log(error);
    }
}
function InsertSQLStockChangesDB() {
    try {
        try {
            client.connect();
        } catch (error) {
            client.end();
            client.connect();
        }
        console.log('Db Disconnected');
        setTimeout(() => {
            fs.readFile('Stock.db', 'utf-8', (err, stockData) => {
                fs.readFile('StockChanges.db', 'utf-8', (err, stockChangesData) => {
                    //INSERT INTO public."Stock"("Stock", "StockChanges") VALUES (\'' + data + '\', \'' + data + '\');
                    //UPDATE public."Stock" SET "Stock"=?, "StockChanges"=;
                    client.query('UPDATE public."Stock" SET "Stock"=\'' + stockData + '\', "StockChanges"=\'' + stockChangesData + '\';', (err, res) => {
                        console.log('Stock Backup Complete!');
                    });
                });
            });
        }, 2000);
    } catch (error) {
        console.log(error);
    }
}
function LoadUsersSQL() {
    try {
        client.connect();
    } catch (error) {
        client.end();
        client.connect();
    }
    client.query('SELECT "Users" FROM public."Users";')
        .then(res => {
            try {
                fs.writeFile('./Users.db', res.rows[res.rows.length - 1].Users, function (err) {
                    console.log("Users File was updated!");
                });
            } catch (error) {
                console.log(error);
            }
        })
        .catch(e => console.error(e.stack))


}
function LoadStockSQL() {
    try {
        client.connect();
    } catch (error) {
        client.end();
        client.connect();
    }
    console.log('Db Disconnected');
    client.query('SELECT "Stock" FROM public."Stock";', (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                fs.writeFile('./Stock.db', res.rows[res.rows.length - 1].Stock, function (err) {
                    console.log("Stock File was updated!");
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
}
function LoadStockChangesSQL() {
    try {
        client.connect();
    } catch (error) {
        client.end();
        client.connect();
    }
    console.log('Db Disconnected');
    client.query('SELECT "StockChanges" FROM public."Stock";', (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                fs.writeFile('./StockChanges.db', res.rows[res.rows.length - 1].StockChanges, function (err) {
                    console.log("Stock Changes File was updated!");
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
}
function LoadTransactionSQL() {
    try {
        client.connect();
    } catch (error) {
        client.end();
        client.connect();
    }
    console.log('Db Disconnected');
    client.query('SELECT "Transaction" FROM public."Transaction";', (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                fs.writeFile('./transaction.db', res.rows[res.rows.length - 1].Transaction, function (err) {
                    console.log("Transaction File was updated!");
                    console.log("Res rows: " + res.rows);
                });
            } catch (error) {
                console.log(error);
            }
        }
    });
}
function LoadAllSQL() {
    try {
        client.connect();
    } catch (error) {
        client.end();
        client.connect();
    }
    client.query('SELECT "Users" FROM public."Users";', (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                if (res.rows[res.rows.length - 1].Users != null)
                    fs.writeFile('./Users.db', res.rows[res.rows.length - 1].Users, function (err) {
                        console.log("Users File was updated!");
                    });
                else
                    console.log('Err: >>>>>>>>>>>> Users is null!!! <<<<<<<<<<<<')
            } catch (error) {
                console.log(error);
            }
        }
    });
    client.query('SELECT "Transaction" FROM public."Transaction";', (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                if (res.rows[res.rows.length - 1].Transaction != null)
                    fs.writeFile('./transaction.db', res.rows[res.rows.length - 1].Transaction, function (err) {
                        console.log("Transaction File was updated!");
                        // console.log("Res rows: " + res.rows[res.rows.length - 1].Transaction);
                    });
                else
                    console.log('Err: >>>>>>>>>>>> Transaction is null!!! <<<<<<<<<<<<')
            } catch (error) {
                console.log(error);
            }
        }
    });
    client.query('SELECT "Stock" FROM public."Stock";', (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                if (res.rows[res.rows.length - 1].Stock != null)
                    fs.writeFile('./Stock.db', res.rows[res.rows.length - 1].Stock.toString(), function (err) {
                        console.log("Stock File was updated!");
                    });
                else
                    console.log('Err: >>>>>>>>>>>> Stock is null!!! <<<<<<<<<<<<')
            } catch (error) {
                console.log(error);
            }
        }
    });
    client.query('SELECT "StockChanges" FROM public."Stock";', (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            try {
                if (res.rows[res.rows.length - 1].StockChanges != null)
                    fs.writeFile('./StockChanges.db', res.rows[res.rows.length - 1].StockChanges.toString(), function (err) {
                        console.log("Stock Changes File was updated!");
                    });
                else
                    console.log('Err: >>>>>>>>>>>> StockChanges is null!!! <<<<<<<<<<<<')
            } catch (error) {
                console.log(error);
            }
        }
    });

}
module.exports.LoadUsersSQL = function () {
    return LoadUsersSQL();
}
// module.exports.updatedDatabaseCreds = global.updatedDatabaseCreds;
module.exports.LoadStockSQL = function () {
    return LoadStockSQL();
}
module.exports.LoadStockChangesSQL = function () {
    return LoadStockChangesSQL();
}
module.exports.InsertUsers = function () {
    return InsertUsers();
}
module.exports.insertTransactionSQL = function () {
    return insertTransactionSQL();
}
module.exports.InsertSQLStockDB = function () {
    return InsertSQLStockDB();
}
module.exports.InsertSQLStockChangesDB = function () {
    return InsertSQLStockChangesDB();
}
module.exports.LoadAllSQL = function () {
    return LoadAllSQL();
}
module.exports.LoadTransactionSQL = function () {
    return LoadTransactionSQL();
}
module.exports.insertURL = function (url) {
    return insertURL(url);
}