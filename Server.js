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
// app.use(cors({origin:'localhost:8000'}));
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

    //gets and posts
    app.get("/api/content", (req, res) => {
        res.status(200).json({
            message: [
                { name: "Item name 1", id: "bribZNKFb_N", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 1", price: 0, category: [] },
                { name: "Item name 1", id: "CtLHn_5Y6ER", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 2", price: 0, category: [] },
                { name: "Item name 1", id: "LR7Qrv_mDU7", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 3", price: 0, category: [] },
                { name: "Item name 1", id: "pqT4qsXZTT_", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 4", price: 0, category: [] },
                { name: "Item name 1", id: "9jv_CRdPEGi", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 1", price: 0, category: [] },
                { name: "Item name 1", id: "PFCVdKnnAx4", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 2", price: 0, category: [] },
                { name: "Item name 1", id: "krM3SJWi_ZA", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 3", price: 0, category: [] },
                { name: "Item name 1", id: "UwBZkHeRwzH", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 4", price: 0, category: [] },
                { name: "Item name 1", id: "Ptk0I9zugMG", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 1", price: 0, category: [] },
                { name: "Item name 1", id: "_HgK0XNc9wO", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 2", price: 0, category: [] },
                { name: "Item name 1", id: "K8dQ110R59D", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 3", price: 0, category: [] },
                { name: "Item name 1", id: "vBwdJnhp7tb", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 4", price: 0, category: [] },
                { name: "Item name 1", id: "JmNk3gZ6GqZ", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 1", price: 0, category: [] },
                { name: "Item name 1", id: "WlwJ3-C5YXf", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 2", price: 0, category: [] },
                { name: "Item name 1", id: "w7h8BGmXPRd", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 3", price: 0, category: [] },
                { name: "Item name 1", id: "613cFMTBGSf", image: "https://i.pinimg.com/originals/c6/5b/80/c65b8092e8dee33aa662feebeea792bf.jpg", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum atque dolores, quos veritatis nulla culpa maiores, quaerat voluptatem esse odio quas dolore laborum ratione eos officia aliquam labore, nostrum in?", sellerID: "sellerID 4", price: 0, category: [] },
            ]
        });
    });
    app.get("/api/category", (req, res) => {
        res.status(200).json({
            message: (Categories)
        });
    });
    app.use(function (req, res) {
        console.log('Cannot find ', req.url)
        res.status(404);
    });

    app.listen(app.get('port'), function () {
        // console.log("Running : 3001\n192.168.10.19:3001");
        require('dns').lookup(require('os').hostname(), function (err, add, fam) {
            console.log("Running : 3001\t\t\t\thttp://" + add + ":3001\t\t\thttps://pangcu.herokuapp.com");
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