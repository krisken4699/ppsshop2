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
const path = require("path");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const fileupload = require('express-fileupload');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const readline = require('console-read-write');
const bodyParser = require('body-parser');
const Security = require('./Security.js'); //other included files
const FileType = require('file-type');
const db = require('./MongoDB');

//Create App
const app = express();

//set up
app.set('port', (process.env.PORT || 3001))
// app.set('trust proxy', true);
app.set('trust proxy', function (ip) {
    // console.log(`${IP}` + ip);
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

const mongodbCreds = {
    username: 'invent60',
    password: 'TBvi67lc9XcLHTLk'
}

//SetUp Misc
Categories = [
    JSON.stringify({ Name: 'ที่พัก', Image: 'https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%9E%E0%B8%B1%E0%B8%81.svg' }),
    JSON.stringify({ Name: 'อาหาร', Image: 'https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/%E0%B8%AD%E0%B8%B2%E0%B8%AB%E0%B8%B2%E0%B8%A3.svg' }),
    JSON.stringify({ Name: 'การเดินทาง', Image: 'https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%B2%E0%B8%87.svg' }),
    JSON.stringify({ Name: 'กิจกรรม', Image: 'https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1.svg' }),
    JSON.stringify({ Name: 'อื่นๆ', Image: 'https://res.cloudinary.com/pangcu-herokuapp-com/image/upload/v1619846697/Home/Category/%E0%B8%AD%E0%B8%B7%E0%B9%88%E0%B8%99%E0%B9%86.svg' }),
];
for (i = 0; i < Categories.length; i++) {
    Categories[i] = (i + 1) + Categories[i]
    // Categories[i] =  Categories[i]
}

//variables
const DevIP = ['192.168.56.1', '192.168.43.168', '172.20.10.4', '192.168.1.29'];
// const publicPath = path.join(__dirname, 'client', 'build');

//Clear added IPs
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    if (!DevIP.includes(add))
        fs.writeFile('./IP.db', "", function (err) {
            console.log("Cleared IP.db");
        });
})
app.use(cors({ origin: 'http://localhost:8000' }));
app.use(express.static('./gatsby-client/public'));

try {
    //middle ware
    app.get("*", function (req, res, next) {
        req.fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;
        if (req.cookies.token == undefined) {
            res.clearCookie('token');
            res.cookie('token', Date.now())
        }
        // if(req.protocol == 'http')
        //     res.redirect(`https://${req.get('host')}${req.originalUrl}`)
        next();
    })

    app.post('/api/logout', (req, res) => {
        res.clearCookie('user').status(200).end();
    })



    app.use(function (req, res) {
        console.log('Cannot find ', req.url)
        res.status(404);
    });

    app.listen(app.get('port'), function () {
        // console.log("Running : 3001\n192.168.10.19:3001");
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            console.log(err ? err : `http://${add}:3001`);
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