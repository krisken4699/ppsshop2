const crypto = require('crypto');
const Security = require('./KenEncryptionAndDecryptionLibrary.js')
const Datastore = require('nedb');
const IP = new Datastore({ filename: 'IP.db' });
const fs = require('fs');
const user = new Datastore({ filename: 'Users.db' });
const FileType = require('file-type');

console.log("Load Ken Security Encryption")
function LogAlgorithms() {
    console.log(crypto.getHashes())
    console.log(crypto.getCiphers())
}

function EncryptSHA1(PasswordToHash) {
    var hash = crypto.createHash('sha1').update(PasswordToHash).digest('hex');
    console.log(hash)
    return
}

//our main iv is 07a3bc1d7cd94e4a3f213f10f7b11408

let iv = "xDxKy6GyXbgr3fhX";
let key = "Pangcu_Shop_by_Ken12/4/2021/7:45"
function Decrypt_aes256cbc(PasswordToDecrypt) {
    //Key Of Panyaprateep Shop By Ken!
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(PasswordToDecrypt, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}
// function String2Hex(tmp) {
//     var hex;
//     var result = "";
//     for (i = 0; i < tmp.length; i++) {
//         hex = tmp.charCodeAt(i).toString(16);
//         result += ("000" + hex).slice(-4);
//     }
//     return result
// }
function String2Hex(str) {
    return Array.from(str).map(c =>
        c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
            encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
    ).join('');
};
function hex2a(hex) {
    var hex = hex.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}
console.log(Encrypt_aes256cbc('lasttest'))

function ipAuthenToUsername(req, IPdb, callback) {
    IPdb.loadDatabase((err) => {
        IPdb.find({ IP: GetClientIp(req) }, (err, k) => {
            callback(k[0].User_id);
        })
    })
}

function AuthenUser(req, callback) {
    // return new Promise(function (resolve) {

    // });
    var auth = false;
    IP.loadDatabase(function (err) {
        IP.find({ IP: Security.GetClientIp(req) }, function (err, docs) {
            user.loadDatabase(function (err) {
                if (docs[0] != undefined)
                    user.find({ Users: docs[0].User_id, Admin: true }, (err, docs2) => {
                        if (docs2[0].Admin)
                            auth = true;
                    })
            })
            // console.log(auth);
            setTimeout(() => {
                // if (auth) {
                callback(auth)
                // }
                // else{
                //     callback
                // }
            }, 100);
        })
    });
}


async function GetContentType(filepath) {
    return new Promise(function (resolve) {
        if (fs.existsSync(filepath))
            resolve(FileType.fromFile(filepath));
        else
            resolve();
    });
};

function Encrypt_aes256cbc(PasswordToEncrypt) {
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(PasswordToEncrypt, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}


function GetClientIp(req) {
    // console.log(req.ip)
    // console.log(req.connection.remoteAddress)
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // ip = ip.toString().replace('::ffff:', '').split(',')[0];
    const ip = req.cookies.token;
    // const ip = req.fingerprint.hash;
    return ip;
}

const DelayedLoop = async (milliseconds, times, func) => {
    for (k = 0; k < times; k++) {
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        }
        func();
        await sleep(milliseconds);
    }
}

// const DelayedWhile = async (milliseconds, condition, func) => {
//     while (condition) {
//         const sleep = (milliseconds) => {
//             return new Promise(resolve => setTimeout(resolve, milliseconds));
//         }
//         func();
//         await sleep(milliseconds);
//     }
// }

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}

// DelayedLoop(10, 10000, function(){
//     console.log(document.querySelector('.loadingBrocket').getBoundingClientRect().left)
// });

function convertUTCDateToLocalDate(date) {
    // console.log(new Date(date.getTime()))

    // console.log(new Date((date.getTime() - date.getTimezoneOffset() * 60 * 1000) + 25200000/60))
    return (convertTZ(new Date((date.getTime() - date.getTimezoneOffset() * 60 * 1000)), 'Asia/Bangkok'));
}

//Exports
module.exports.iv = iv;
module.exports.key = key;

module.exports.Encrypt_aes256cbc = function (message) {
    return Encrypt_aes256cbc(message);
}
module.exports.DelayedLoop = function (milliseconds, times, func) {
    return DelayedLoop(milliseconds, times, func);
}
// module.exports.DelayedWhile = function (milliseconds, condition, func) {
//     return DelayedWhile(milliseconds, condition, func);
// }
module.exports.convertUTCDateToLocalDate = function (date) {
    return convertUTCDateToLocalDate(date);
}
module.exports.Decrypt_aes256cbc = function (message) {
    return Decrypt_aes256cbc(message);
}
module.exports.hex2a = function (message) {
    return hex2a(message);
}
module.exports.String2Hex = function (message) {
    return String2Hex(message);
}
module.exports.GetClientIp = function (req) {
    return GetClientIp(req);
}
module.exports.ipAuthenToUsername = function (req, IPdb, callback) {
    return ipAuthenToUsername(req, IPdb, callback);
}
module.exports.AuthenUser = function (req, callback) {
    return AuthenUser(req, callback);
}
module.exports.GetContentType = function (filepath) {
    return GetContentType(filepath);
}
// console.log(String2Hex("test\ntest"));