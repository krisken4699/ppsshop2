//Catch logs
console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function () {
    console.logs.push('\n' + Array.from(arguments));
    console.stdlog.apply(console, arguments);
}

//Lib
const express = require('express');
const crypto = require('crypto');
const line = require('./line.js');
const path = require("path");
const cloudinary = require("cloudinary").v2;
const Datastore = require('nedb');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const DatabaseSQL = require('./BackUp.js');
const readline = require('console-read-write');
const bodyParser = require('body-parser');
const Security = require('./KenEncryptionAndDecryptionLibrary.js'); //other included files
const FileType = require('file-type');

//Create App
const app = express();

//set up
app.set('port', (process.env.PORT || 3001))
app.set('view-engine', 'ejs');
app.set('view-engine', 'html');
app.engine('html', require('ejs').renderFile);
// app.set('trust proxy', true);
app.set('trust proxy', function (ip) {
    console.log(`${IP}` + ip);
    return true;
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(bodyParser.json());
app.use(fileupload());
app.use(express.json({ extended: false }));

//Cloudinary Setup
cloudinary.config({
    cloud_name: 'djuzzaprx',
    api_key: '311547878546917',
    api_secret: 'TLpPvAEAXbAnPnN9Thu-5-uyBRs'
});
//SetUp Misc

//variables
const DevIP = ['192.168.56.1', '192.168.43.168', '172.20.10.4', '192.168.1.29'];
const LineNotifyToken = 'j36WDOe3I0JXynCNeYmsFbEXodAK9jxRdh8QWKiMflo';
// const publicPath = path.join(__dirname, 'client', 'build');

//Clear added IPs
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    if (!DevIP.includes(add))
        fs.writeFile('./IP.db', "", function (err) {
            console.log("Cleared IP.db");
        });
})
app.use(express.static('client/build'));
//Program
try {
    //middle ware
    app.get("*", function (req, res, next) {
        // console.log('someone joined');
        if (req.cookies.token == undefined) {
            res.clearCookie('token');
            res.cookie('token', Date.now())
        }
        next();
    })
    //gets and posts
    app.get("/api", (req, res) => {
        res.json({ message: "Hello from server!" });
    });
    app.use(function (req, res) {
        res.status(404).render(path.join(__dirname, './views/Error.ejs'), { status: 404 });
    });

    app.listen(app.get('port'), function () {
        // console.log("Running : 3001\n192.168.10.19:3001");
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            console.log("Running : 3001\nhttp://" + add + ":3001");
            console.log("https://pangcu.herokuapp.com");
        })
    });
    process.on('uncaughtException', function (err) {
        // console.log('Small Error. Chill');
    });
    process.on('uncaughtRejection', function (err) {
        // console.log('Small Error. Chill');
    });
    process.on('warning', function (err) {
        // console.log('Small Error. Chill');
    });
    process.on('unhandledRejection', function (reason, promise) {
        // console.log('Small Error. Chill');
    });
} catch (BigErr) {
    console.log(BigErr);
}