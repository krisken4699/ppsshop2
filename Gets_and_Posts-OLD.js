

    app.get('/login', function (req, res) {
        res.render(path.join(__dirname, "/views/LoginPage.ejs"), { Err: "" });
    });

    app.get('/problems', function (req, res) {
        res.render(path.join(__dirname, "/views/Problems Faced.ejs"));
    });

    app.get('/register.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/Register.js"));
    });

    app.get('/views/style/css/animations.css', function (req, res) {
        res.sendFile(path.join(__dirname, "./views/style/css/animations.css"));
    });

    app.get('/logo', function (req, res) {
        res.sendFile(path.join(__dirname, "./PanyaprateepLogoWithoutLabel.png"));
    });

    app.get('/views/GuestBackground.jpg', function (req, res) {
        res.sendFile(path.join(__dirname, "./views/GuestBackground.jpg"));
    });

    app.get('/views/Admin.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/Admin.js"));
    });

    app.get('/views/style/css/transition.css', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/style/css/transition.css"));
    });

    app.get('/crypto-js.min.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/crypto-js.min.js"));
    });

    app.get('/bootstrap.min.css', (req, res) => {
        res.sendFile(path.join(__dirname, "./node_modules/bootstrap/dist/css/bootstrap.min.css"));
    })

    app.get('/bootstrap.min.css.map', (req, res) => {
        res.sendFile(path.join(__dirname, "./node_modules/bootstrap/dist/css/bootstrap.min.css.map"));
    })

    app.get('/client.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/Client.js"));
    });

    app.get('/Portfolio', function (req, res) {
        res.render(path.join(__dirname, "/views/Portfolio.html"));
    });

    app.get('/KenEncryptionAndDecryptionLibrary.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/KenEncryptionAndDecryptionLibrary.js"));
    });

    app.get('/require.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/require.js"));
    });

    app.get('/Login.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/Login.js"));
    });

    app.get('/views/style/css/style.css', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/style/css/style.css"));
    });

    app.get('/views/style/css.js', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/style/css.js"));
    });

    app.get('/views/test.ejs', function (req, res) {
        res.render(path.join(__dirname, "/views/test.ejs"));
    });

    app.post('/views/bootstrapLink.html', function (req, res) {
        res.json(bootstrapLinkHTML);
    });

    app.get('/register', function (req, res) {
        res.render(path.join(__dirname, "/views/RegisterPage.ejs"));
    });

    app.get('/views/Error404', function (req, res) {
        res.sendFile(path.join(__dirname, "/views/Error404.png"));
    });

    app.get('/security/decrypt:hash', (req, res, next) => {
        res.send(Security.Decrypt_aes256cbc(req.params.hash))
    });

    app.get('/Contact', (req, res) => {
        res.render(path.join(__dirname, "./views/Contact.ejs"));
    })

    app.get('/Admin.js', function (req, res) {
        res.sendFile(path.join(__dirname, "./views/Admin.js"), { name: "Guest" });
    });

    app.get('/line/image', function (req, res) {
        res.sendFile(path.join(__dirname, "./image.png"));
    });

    app.post('/client/Modal.html', function (req, res) {
        res.sendFile(path.join(__dirname, "./views/Modal.html"));
    });

    app.get('/YuuThumbnail.jpg', function (req, res) {
        res.sendFile(path.join(__dirname, "./Yuu Thumbnail.jpg"));
    });

    app.get('/error401', function (req, res) {
        res.sendFile(path.join(__dirname, "./views/Error.ejs"), { status: 401 });
    });

    app.get('/views/FileSaver.js', function (req, res) {
        res.sendFile(path.join(__dirname, "./views/FileSaver.js"));
    });

    app.get('/views/DownloadReport.js', function (req, res) {
        res.sendFile(path.join(__dirname, "./views/DownloadReport.js"));
    });

    app.get('/register/success', function (req, res) {
        res.render(path.join(__dirname, "/views/registerSuccess.ejs"), { name: '---' });
    });

    app.post('/User/All', function (req, res) {
        console.log('UserALL');
        IP.loadDatabase(function (err) {
            IP.find({ IP: Security.GetClientIp(req) }, function (err, docs) {
                user.loadDatabase(function (err) {
                    try {
                        if (docs[0] != undefined)
                            user.find({ Users: docs[0].User_id }, function (err, docs) {
                                res.json(docs[0]);
                            });
                        else
                            res.json('Failed');
                    } catch (error) {
                        res.json('Failed');
                    }
                });
            });
        })
    });

    app.post('/client/OpenTrasactions', function (req, res) {
        var Reply = [];
        transaction.loadDatabase(function (err) {
            try {
                req.body.Users.forEach(ids => {
                    transaction.find({ User: ids }, function (err, docs) {
                        Reply[Reply.length] = docs;
                    })
                });
                setTimeout(() => {
                    res.json(Reply);
                }, 100);
            } catch (error) { };
        })
    });

    app.post('/admin/transaction/force', function (req, res) {
        const time = Security.convertUTCDateToLocalDate(new Date());
        const basket = Date.now();
        Security.AuthenUser(req, function (auth
        ) {
            // console.log(req.body);
            var fail = false;
            user.loadDatabase((err) => {
                req.body.Time.forEach(ids => {
                    user.find({ Time: ids }, async function (err, Udocs) {
                        // console.log(docs);
                        if (Udocs[0] == undefined)
                            fail = true;
                        else {
                            if (req.body.Product == "Custom")
                                db.insertTransaction({
                                    User: Udocs[0].Time,
                                    Username: Udocs[0].Users,
                                    'TransactionID': Date.now(),
                                    IP: Security.GetClientIp(req),
                                    Product: {
                                        Name: req.body.Name,
                                        Quantity: 1,
                                        Size: null,
                                        Gender: null,
                                        Price: req.body.Price,
                                        ProductID: null,
                                    },
                                    Time: {
                                        TimeStamp: Security.convertUTCDateToLocalDate(new Date()).toString(),
                                    },
                                    Pending: { Status: "Pending" },
                                    Confirmed: true,
                                    BasketID: basket,
                                    Basket_Confirm_Time: {
                                        Full: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
                                        Date: time.getDate(),
                                        Day: time.getDay(),
                                        Month: parseInt(time.getMonth()) + 1,
                                        Year: time.getFullYear(),
                                        Hour: time.getHours(),
                                        Minute: time.getMinutes(),
                                    }
                                });
                            else {
                                stock.loadDatabase(function (err) {
                                    stock.find({ Name: req.body.Product }, function (err, docs) {
                                        if (docs[0] != undefined && docs[0] != null) {
                                            IP.loadDatabase(function (err) {
                                                IP.find({ IP: Security.GetClientIp(req) }, function (err, userDoc) {
                                                    user.loadDatabase(function (err) {
                                                        user.find({ Users: userDoc[0].User_id }, async (err, docs2) => {
                                                            db.insertTransaction({ //Save transaction
                                                                User: Udocs[0].Time,
                                                                Username: Udocs[0].Users + ' Forced by: ' + docs2[0].Users,
                                                                'TransactionID': Date.now(),
                                                                IP: Security.GetClientIp(req),
                                                                Product: {
                                                                    Name: req.body.Product,
                                                                    Quantity: req.body.Quantity,
                                                                    Size: req.body.Size,
                                                                    Gender: req.body.Gender,
                                                                    Price: docs[0].Price,
                                                                    ProductID: docs[0].ID.toString()
                                                                },
                                                                Time: {
                                                                    TimeStamp: Security.convertUTCDateToLocalDate(new Date()).toString(),
                                                                },
                                                                Pending: { Status: "Complete" },
                                                                Confirmed: true,
                                                                BasketID: Date.now(),
                                                                Basket_Confirm_Time: {
                                                                    Full: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
                                                                    Date: Security.convertUTCDateToLocalDate(new Date()).getDate(),
                                                                    Day: Security.convertUTCDateToLocalDate(new Date()).getDay(),
                                                                    Month: parseInt(Security.convertUTCDateToLocalDate(new Date()).getMonth()) + 1,
                                                                    Year: Security.convertUTCDateToLocalDate(new Date()).getFullYear(),
                                                                    Hour: Security.convertUTCDateToLocalDate(new Date()).getHours(),
                                                                    Minute: Security.convertUTCDateToLocalDate(new Date()).getMinutes(),
                                                                }
                                                            });
                                                            // console.log('forced');
                                                            const temp = await UpdateStock({ Name: req.body.Product }, "Subtract", req.body.Gender, req.body.Quantity, "", "", req.body.Size, res, false, "stock", Date.now(), req.body.Price, '', '');
                                                            // console.log(temp);
                                                            if (temp == '<0')
                                                                fail = true;
                                                            setTimeout(() => {
                                                                UpdateUserBalance();
                                                            }, 100);
                                                        });
                                                    });
                                                });
                                            });
                                        }
                                    });
                                });
                            }
                            setTimeout(() => {
                                if (!fail) {
                                    console.log('Completed Force Transaction')
                                    res.json('Complete');
                                } else {
                                    res.json('Failed');
                                    console.log('Failed force Transaction')
                                }
                                UpdateUserBalance();
                                DatabaseSQL.insertTransactionSQL();
                            }, 1000);
                        }
                    })
                });
            })
        })
    });
    app.post('/Admin/GetUsers', function (req, res) {
        try {
            user.loadDatabase(function (err) {
                user.find({}, function (err, docs) {
                    res.json(docs);
                });
            });
        } catch (error) { }
    })

    app.post('/security/cred', function (req, res) {
        console.log(Security.String2Hex(Security.iv))
        res.json([Security.String2Hex(Security.iv), Security.String2Hex(Security.key)]);
    })

    app.post('/Admin/stock/create', function (req, res) {
        var temp = req.body;
        stock.loadDatabase(function (err) {
            stock.find({ Name: req.body.Name }, (err, docs) => {
                if (docs[0] == undefined) {
                    try {
                        temp.Price = parseInt(temp.Price);
                        temp.ID = Date.now().toString();
                        if (temp.Filter == 'Numbers') {
                            var MinSize = parseInt(temp.Size.Min);
                            var MaxSize = parseInt(temp.Size.Max);
                            // console.log('MaxSize: ' + MaxSize);
                            // console.log('MinSize: ' + MinSize);
                            delete temp.Size.Max;
                            delete temp.Size.Min;
                            delete temp.Size;
                            var j = 0;
                            temp.Male = {};
                            temp.Content1 = req.body.Content.Content1;
                            temp.Content2 = req.body.Content.Content2;
                            temp.Female = {};
                            temp.Male.Sizes = [];
                            temp.Male.Quantity = [];
                            temp.Female = {};
                            temp.Female.Sizes = [];
                            temp.Female.Quantity = [];
                            for (i = MinSize; i < MaxSize + 1; i++) {
                                // console.log(i + ' ' + MaxSize)
                                temp.Female.Sizes[j] = i;
                                temp.Male.Sizes[j] = i;
                                temp.Male.Quantity[j] = 0;
                                temp.Female.Quantity[j] = 0;
                                j++;
                            }
                            temp.Picture = temp.Thumb;
                            temp.Picture2 = temp.Thumb;
                            delete temp.Thumb;
                            delete temp.Thumb2;
                            delete temp.Content;
                            db.insertStock(temp);
                            res.json('Complete');
                        } else if (temp.Filter == 'SML') {
                            delete temp.Size.Max;
                            delete temp.Size.Min;
                            delete temp.Size;
                            temp.Male = {
                                S: 0,
                                M: 0,
                                L: 0,
                                XL: 0,
                                XXL: 0,
                                XXXXL: 0,
                            };
                            temp.Female = {
                                S: 0,
                                M: 0,
                                L: 0,
                                XL: 0,
                                XXL: 0,
                                XXXXL: 0,
                            };
                            temp.Picture = temp.Thumb;
                            temp.Picture2 = temp.Thumb2;
                            temp.Content1 = req.body.Content.Content1;
                            temp.Content2 = req.body.Content.Content2;
                            delete temp.Content;
                            delete temp.Thumb;
                            delete temp.Thumb2;
                            db.insertStock(temp);
                            res.json('Complete');
                        } else if (temp.Filter == 'None') {
                            delete temp.Size.Max;
                            delete temp.Size.Min;
                            delete temp.Size;
                            var j = 0;
                            temp.Picture = temp.Thumb;
                            temp.Picture2 = temp.Thumb2;
                            temp.Content1 = req.body.Content.Content1;
                            temp.Content2 = req.body.Content.Content2;
                            delete temp.Content;
                            delete temp.Thumb;
                            delete temp.Thumb2;
                            temp.Quantity = 0;
                            db.insertStock(temp);
                            res.json('Complete');
                        }
                    } catch (error) {
                        res.json('Error')
                    }
                } else {
                    res.json('Existed');
                }
            })
        })
    });

    app.post('/Admin/stock/delete', function (req, res) {
        stock.loadDatabase(function (err) {
            stock.find({ Name: req.body.Name }, (err, docs) => {
                // console.log(docs);
                if (docs[0] != undefined) {
                    stock.remove({ Name: req.body.Name }, {}, function (err, numRemoved) {
                        stock.persistence.compactDatafile();
                    });
                    transaction.loadDatabase(function (err) {
                        transaction.find({}, (err, temp) => {
                            var temp2 = "";
                            var temp3 = [];
                            temp.forEach(element => {
                                if (element.Product.ProductID == docs[0].ID && element.Confirmed == false) {
                                    temp2 = element;
                                    temp3[temp3.length] = element.TransactionID;
                                }
                            });
                            console.log(temp3);
                            temp3.forEach(temp4 => {
                                transaction.remove({ TransactionID: temp4 }, {}, function (err, numRemoved) {
                                    // transaction.persistence.compactDatafile();
                                });
                            });

                        })
                    })
                    res.json('Complete');
                    db.insertStock();
                    db.insertTransaction();
                } else {
                    res.json('Missing');
                }
            })
        })
    });

    app.post('/client/stock/quantitycheck', function (req, res) {
        try {
            stock.loadDatabase(function (err) {
                stock.find({ Name: req.body.Name }, function (err, docs) {
                    // console.log(req.body);
                    try {
                        // console.log(docs[0].Filter);
                        if (docs[0].Filter == 'SML') {
                            res.json(docs[0][req.body.Gender][req.body.Size].toString());
                            res.end();
                        } else if (docs[0].Filter == 'None') {
                            if (docs[0].Quantity != null && docs[0].Quantity != undefined)
                                res.json(docs[0].Quantity);
                            else
                                res.json('-');
                            res.end();
                        } else if (docs[0].Filter == 'Numbers') {
                            const sizeIndex = docs[0][req.body.Gender].Sizes.indexOf(parseInt(req.body.Size));
                            res.json(docs[0][req.body.Gender].Quantity[sizeIndex]);
                            res.end();
                        }
                    } catch (err) {
                        console.log(err);
                        console.log('Failed to send back size');
                        res.end();
                    }
                });
            })
        } catch (error) {

        }
    });

    app.get('/login:message', (req, res, next) => {
        console.log(decodeURIComponent(Security.hex2a(req.params.message)));
        let reqMessage = JSON.parse(decodeURIComponent(Security.hex2a(req.params.message)));
        // console.log(reqMessage);
        if (token == reqMessage.token) {
            // user.loadDatabase(function(err){
            // user.find({ID: reqMessage.username}, (err,docs)=>{
            if (reqMessage.username == "Admin1") {
                res.render(path.join(__dirname, "./views/AdminHome.ejs"), { css: bootstrapLinkHTML });
            } else {
                res.render(path.join(__dirname, "/views/ClientHome.ejs"), { name: reqMessage.username });
            }
            // })
            // })
        } else {
            res.redirect('/login')
            console.log('Wrong Token. token = ' + token + "   " + reqMessage.token);
        }
    });

    app.get('/test', async (req, res) => {
        if (req.body.username == "Admin1") {
            res.render(path.join(__dirname, "/views/LoginPage.ejs"));
        }
    })

    app.post('/fetch/stock', async (req, res) => {
        stock.loadDatabase(function (err) {
            stock.find({}, function (err, docs) {
                res.json(docs);
            });
        });
    })

    app.post('/User/SignOut', (req, res) => {
        try {
            db.RemoveIP(Security.GetClientIp(req));
            console.log(Security.GetClientIp(req) + ' Signed Out')
        } catch (error) {
            console.log(error)
        }
    });

    app.post('/line/webhook', (req, res) => {
        // console.log(JSON.stringify(req.body.events[0]));
        var reply_token = req.body.events[0].replyToken;
        if (req.body.events[0].message.type == 'text') {
            var ClientMessage = req.body.events[0].message.text.toString();
            console.log("ClientMessage > " + ClientMessage);
            line.GetUserProfile(req.body.events[0].source.userId).then((temp) => {
                line.PushMessage('text', temp.displayName + "\t \t " + ClientMessage, 'U0baeda9bf6bbaa6205bd21e25936a7cb'); //send to ken
                line.reply(reply_token, ['ฝากทำอันนี้ด้วยนะเพื่อน Form Covid-19 ขอให้ทำตอนนี้เลย ขอบคุณมักๆๆ ครับ'], 'text');
            })
        } else if (req.body.events[0].message.type == 'image') {
            var ImageID = req.body.events[0].message.id.toString();
            console.log("Image Id > " + ImageID);
            line.GetUserProfile(req.body.events[0].source.userId).then((temp) => {
                line.PushMessage('image', ImageID, 'U0baeda9bf6bbaa6205bd21e25936a7cb'); //send to ken
                line.reply(reply_token, ['ฝากทำอันนี้ด้วยนะเพื่อน Form Covid-19 ขอให้ทำตอนนี้เลย ขอบคุณมักๆๆ ครับ'], 'text');
            })
        }
        res.status(200);
    });

    app.post('/login', async (req, res) => {
        console.log('Got a Login Request!');
        try {
            user
                .loadDatabase(function (err) {
                    user.find({}, function (err, docs) {
                        var temp = {};
                        console.log(req.body.password);
                        for (var i = 0; i < docs.length; i++) {
                            if (docs[i].Users.toString().toLowerCase() == req.body.username.toString().toLowerCase())
                                temp = docs[i];
                        }
                        if (temp.Users != undefined) {
                            if (temp.Users.toString().toLowerCase() == req.body.username.toString().toLowerCase()) {

                                if (temp.Password == (req.body.password)) {
                                    // if (req.body.username != 'Admin1') {
                                    token = Math.floor(Math.random() * 99999);
                                    // console.log(req.body.password);
                                    console.log('Found user!');
                                    // }
                                    // else {
                                    //     res.json({ Success: 'admin' });
                                    //     res.end();
                                    //     console.log('Admin logged in!');
                                    // }
                                    db.RemoveIP(Security.GetClientIp(req));
                                    setTimeout(() => {
                                        db.insertIP({ IP: Security.GetClientIp(req), User_id: temp.Users, Keep: req.body.Keep });
                                        res.json({ Success: "Success", token: token, Gender: temp.Gender });
                                        res.end();
                                    }, 200);
                                } else {
                                    res.json('Invalid password');
                                    console.log('Invalid password');
                                }
                            }
                        } else {
                            res.json("User doesn't Exist!");
                            console.log('Cannot find user!');
                        }
                    });
                });
        } catch (err) {
            console.log("ERROR!: " + err);
        }
    })

    app.post('/client/DeleteAccount', async (req, res) => {
        console.log('Got a Delete Request! - ' + req.ips);
        try {
            user.loadDatabase(function (err) {
                user.find({}, function (err, docs) {
                    var temp = {};
                    for (var i = 0; i < docs.length; i++) {
                        if (docs[i].Users == req.body.username)
                            temp = docs[i];
                    }
                    if (temp.Users == req.body.username) {
                        // if (temp.Password == Security.Encrypt_aes256cbc(req.body.password)) {
                        db.RemoveUser({ _id: temp._id });
                        res.json('Complete');
                        // } else {
                        //     res.json('Invalid password');
                        //     console.log('Invalid password');
                        // }
                    } else {
                        console.log('Cannot find user!');
                    }
                });
            });
        } catch (err) {
            console.log("ERROR!: " + err);
        }
    })

    app.get('/client/username/change:password', async (req, res) => {
        console.log('Got a Password Change Request! - ' + req.ips);
        try {
            console.log(decodeURIComponent(Security.hex2a(Security.Decrypt_aes256cbc(req.params.password))));
            // console.log("test2 "+ ((decodeURIComponent(req.params.password))));
            // console.log("test3 "+ (Security.Decrypt_aes256cbc(decodeURIComponent(req.params.password))));
            // console.log("test4 "+ (req.params.password));
            try {
                user.loadDatabase((err) => {
                    Security.ipAuthenToUsername(req, IP, function (result) {
                        user.find({ Users: result }, function (err, docs) {
                            console.log(docs[0]);
                            setTimeout(() => {
                                user.update({ Time: docs[0].Time }, { $set: { Password: Security.Encrypt_aes256cbc(decodeURIComponent(Security.hex2a(Security.Decrypt_aes256cbc(req.params.password)))) } }, {}, function (err, numReplaced) {
                                    user.persistence.compactDatafile();
                                });
                            }, 100);
                        })
                    });

                })
            } catch (error) {

            }
            // console.log(req.params.password);
            res.redirect('/home');
        } catch (err) {
            console.log("ERROR!: " + err);
        }
    })

    app.get('/share/:file', async (req, res) => {
        try {
            const filename = req.params.file;
            if (fs.existsSync('./share/' + filename)) {
                const temp = await Security.GetContentType('./share/' + filename);
                // console.log(temp);
                res.sendFile(path.join(__dirname, './share/' + filename), { headers: { 'Content-Type': temp } });
            } else
                res.render(path.join(__dirname, './views/guestHome.ejs'));
        } catch (error) { }
    })

    app.get('/share2/:file', async (req, res) => {
        try {
            const filename = req.params.file;
            // console.log(filename + ' Requested');
            if (fs.existsSync('./share2/' + filename)) {
                const temp = await Security.GetContentType('./share2/' + filename);
                // console.log(temp);
                res.sendFile(path.join(__dirname, './share2/' + filename), { headers: { 'Content-Type': temp } });
            } else
                res.render(path.join(__dirname, './views/guestHome.ejs'));
        } catch (error) { }
    })

    app.get('/admin/images', (req, res) => {
        Security.AuthenUser(req, function (auth) {
            if (auth) {
                var temp = "";
                cloudinary.api.resources(function (err, result) {
                    // result.resources.forEach(images => {
                    for (i = 0; i < result.resources.length; i++) {
                        // console.log(result.resources[i].secure_url);
                        temp += '<div style="padding:5px" class="col-md-3"><img src="' + result.resources[i].secure_url + '" id="' + result.resources[i].secure_url + '" alt="not found""><label for="' + result.resources[i].secure_url + '" id="' + i + 'label" style="font-size:xx-small; word-break:break-all;">' + result.resources[i].secure_url + '</label><button class="btn btn-primary" onclick="copyToClipboard(\'' + i + 'label\')">Copy</button><button id="' + result.resources[i].secure_url + 'delete" class="btn btn-danger" style="margin:10px" onclick="fetch(\'/admin/images/delete\', {method: \'POST\',body: JSON.stringify({id:this.id}),headers: { \'Content-Type\': \'application/json\' }}).then((response) => { return response.json() }).then((response) => {if(response == \'Complete\'){this.parentElement.remove()}}); ">Delete</button></div>'
                    }
                    // });
                    res.render(path.join(__dirname, './views/getImages.ejs'), { body: temp });
                });
            }
            else {
                res.status(404).render(path.join(__dirname, './views/Error.ejs'), { status: 401 });
            }
        })
    })

    app.post('/admin/images/delete', (req, res) => {
        Security.AuthenUser(req, function (auth) {
            if (auth) {
                // console.log(req.body.id);
                cloudinary.api.resources(function (err, result) {
                    // result.resources.forEach(images => {
                    for (i = 0; i < result.resources.length; i++) {
                        // console.log(result.resources[i].secure_url);
                        if (result.resources[i].secure_url + 'delete' == req.body.id) {
                            // console.log(result.resources[i].public_id);
                            cloudinary.api.delete_resources([result.resources[i].public_id],
                                function (error, result) {
                                    // console.log(error);
                                    if (error == undefined) { res.json('Complete'); }
                                });
                        }
                    }
                });
            }
            else {
                res.status(404).render(path.join(__dirname, './views/Error.ejs'), { status: 401 });
            }
        })
    })

    app.post('/share/upload', (req, res) => {
        var i = 0;
        if (req.files != null)
            while (req.files[i] != undefined) {
                const image = req.files[i]
                // console.log(image);
                const path = __dirname + '/share/' + image.name;
                image.mv(path);
                const base64Str = (`data:${req.files[i].mimetype};base64,${req.files[i].data.toString('base64')}`)
                function temp(name) {
                    setTimeout(() => {
                        // console.log(name);
                        cloudinary.uploader.upload("./share/" + name, { public_id: name },
                            function (error, result) {
                                if (error)
                                    console.log(error)
                                // DatabaseSQL.insertURL(result.secure_url);
                                // console.log(result.secure_url);
                                // console.log(result);
                                // res.json("Complete");
                            });
                    }, 1000);
                }
                const name = image.name;
                temp(name)
                i++;
            }
        res.json('Success');
    });
    app.get('/cursor', async (req, res) => {
        res.sendFile(path.join(__dirname, '/views/cursor.svg'));
    })


    app.post('/share/', async (req, res) => {
        try {
            const filename = req.body.path;
            if (fs.existsSync('./share/' + filename)) {
                const temp = await Security.GetContentType('./share/' + filename);
                // console.log(temp);
                fs.readFile('./share/' + filename, (err, data) => {
                    res.json(data.toString('utf-8'));
                    // console.log(data.toString('utf-8'));
                });
            } else
                res.status(404);
        } catch (error) { }
    })

    app.get('/home', (req, res) => {
        // console.log('Get /home');
        // console.log(Security.GetClientIp(req));
        const time = Security.convertUTCDateToLocalDate(new Date());
        // console.log(time);
        IP.loadDatabase(function (err) {
            // console.log(Security.GetClientIp(req))
            IP.find({ IP: Security.GetClientIp(req) }, function (err, docs) {
                if (docs[0] != undefined)
                    // console.log(docs[0].User_id + ` logged in. ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}-${time.getUTCHours()}:${time.getMinutes()}`);
                    res.render(path.join(__dirname, "./views/ClientHome.ejs"), { name: docs[0].User_id });
                else {
                    res.redirect('/');
                    // console.log('test')
                }
            });
        });
    })

    app.get('/admin', (req, res) => {
        IP.loadDatabase(function (err) {
            IP.find({ IP: Security.GetClientIp(req) }, function (err, docs) {
                user.loadDatabase(function (err) {
                    try {
                        user.find({ Users: docs[0].User_id, Admin: true }, function (err, docs2) {
                            if (docs2[0].Admin)
                                try {
                                    res.render(path.join(__dirname, "./views/AdminHome.ejs"));
                                } catch (error) {
                                    res.redirect('/');
                                }
                        })
                    } catch (error) {
                        res.redirect('/');
                    }
                })
            });
        });
    })

    // app.get('/admin/', (req, res) => {
    //     IP.loadDatabase(function (err) {
    //         IP.find({ IP: Security.GetClientIp(req) }, function (err, docs) {
    //             user.loadDatabase(function (err) {
    //                 try {
    //                     user.find({ Users: docs[0].User_id, Admin: true }, function (err, docs2) {
    //                         if (docs2[0].Admin)
    //                             try {
    //                                 res.render(path.join(__dirname, "./views/AdminHome.ejs"));
    //                             } catch (error) {
    //                                 res.redirect('/');
    //                             }
    //                     })
    //                 } catch (error) {
    //                     res.redirect('/');
    //                 }
    //             })
    //         });
    //     });
    // })

    app.post('/register', (req, res) => {
        var used = false;
        // console.log('Got a Login Request! - ' + req.ips);
        try {
            user.loadDatabase(function (err) {
                user.find({}, function (err, docs) {
                    // console.log(req.body)
                    docs.forEach(J => {
                        // console.log(J.Users.toString().toLowerCase() + "   " + req.body.username.toString().toLowerCase())
                        if (J.ID == req.body.ID)
                            used = true;
                        if (J.Users.toString().toLowerCase() == req.body.username.toString().toLowerCase())
                            used = true;
                    });
                    if (!used)
                        try {
                            db.insertUser({ ID: req.body.ID, Users: req.body.username, Password: req.body.password, Email: req.body.email, Gender: req.body.Gender, Balance: 3000, Time: Date.now(), Admin: false });
                            // console.log('ID: ' + req.body.ID + 'Time: ' + Date.now() + ' username: ' + req.body.username + ' password: ' + req.body.password + ' email: ' + req.body.email);
                            // console.log("Decrypted password : " + Security.Decrypt_aes256cbc(Security.hex2a(req.body.password)));
                            res.json('success');
                        }
                        catch (err) {
                            // console.log("ERROR!: " + err);
                            res.redirect('/login');
                        }
                    else {
                        res.json("Existed");
                        // console.log('User Existed, cannot register')
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
    })

    app.post('/UserDB', (req, res) => {
        try {
            fs.readFile('./Users.db', function read(err, data) {
                if (err) {
                    throw err;
                }
                res.json({ message: Security.String2Hex(data.toString()) });
            });
        } catch (err) {
            console.log("ERROR!: " + err)
            res.redirect('/login')
        }
    })

    app.post('/admin/CreateNewAdmin', (req, res) => {
        try {
            Security.AuthenUser(req, function (auth) {
                if (auth) {
                    // console.log(auth);
                    user.loadDatabase(function (err) {
                        user.find({}, (err, k) => {
                            if (k[0] != undefined) {
                                var taken = false;
                                k.forEach(j => {
                                    if (j.Users.toLowerCase() == req.body.username.toLowerCase())
                                        taken = true;
                                });
                                if (!taken) {
                                    db.insertUser({ ID: 'XXXX', Users: req.body.username, Password: Security.Encrypt_aes256cbc(req.body.password), Email: null, Gender: null, Balance: 3000, Time: Date.now(), Admin: true });
                                    setTimeout(() => {
                                        res.json('Complete');
                                    }, 1000);
                                } else
                                    res.json('Existed');
                            } else
                                res.json('Failed');
                        });
                    });

                } else
                    res.json('Failed');
                // res.status(401).render(path.join(__dirname, './views/Error.ejs'), { status: 401 });
            })
        } catch (err) {
            console.log("ERROR!: " + err)
            res.json('Failed');
        }
    });

    app.post('/StockDB', (req, res) => {
        try {
            fs.readFile('./Stock.db', function read(err, data) {
                if (err) {
                    throw err;
                }
                res.json({ message: Security.String2Hex(data.toString()) });
            });
        } catch (err) {
            console.log("ERROR!: " + err)
            res.redirect('/login')
        }
    })

    app.get('/cookie', function (req, res) {
        console.log(req.cookies);
        // res.cookie('token', Date.now());
        res.end('Done');
    })

    app.get('/', function (req, res) {
        IP.loadDatabase(function (err) {
            // console.log(Security.GetClientIp(req));
            // console.log(req.headers)
            IP.find({ IP: Security.GetClientIp(req) }, function (err, docs) {
                // console.log(docs[0])
                if (docs[0] == undefined) {
                    res.render(path.join(__dirname, "./views/guestHome.ejs"));
                    // console.log(docs);
                } else {
                    res.redirect('/home');
                }

            });
        });
    });

    app.post('/stock', function (req, res) {
        // console.log(req.body);
        stock.loadDatabase(function (err) {
            UpdateStock({ Name: req.body.Type }, req.body.Mode, req.body.Gender, req.body.Quantity, req.body.Thumb, req.body.Thumb2, req.body.Size, res, true, "stock", Date.now(), req.body.Price, req.body.Content1, req.body.Content2);
        });
    });

    app.post('/client/order', function (req, res) {
        // console.log(req.body);
        // const TransactionID =  Date.now();
        const time = Security.convertUTCDateToLocalDate(new Date());
        try {
            // console.log(req.body);
            stock.loadDatabase(function (err) {
                StockChanges.loadDatabase(function (err) {
                    stock.find({ Name: req.body.Product }, function (err, docs) {
                        // console.log(docs[0]);
                        if (docs[0] != undefined && docs[0] != null) {
                            /*
                            if (docs[0].Filter == 'SML') { // SML SML SML SML SML SML SML SML SML SML SML SML SML SML SML SML SML SML SML SML 
                                tempStock = docs[0];
                                tempStock[req.body.Gender][req.body.Size] -= parseInt(req.body.Quantity);
                                stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                    stock.persistence.compactDatafile();
                                });
                                res.json('Complete');
                            }
                            if (docs[0].Filter == 'Numbers') { // Numbers Numbers Numbers Numbers Numbers Numbers Numbers Numbers Numbers Numbers Numbers Numbers Numbers 
                                tempStock = docs[0];
                                var sizeTemp = tempStock[req.body.Gender].Sizes.indexOf(parseInt(req.body.Size));
                                tempStock[req.body.Gender].Quantity[sizeTemp] = parseInt(tempStock[req.body.Gender].Quantity[sizeTemp]) - parseInt(req.body.Quantity)
                                stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                    stock.persistence.compactDatafile();
                                });
                                res.json('Complete');
                            }
                            if (docs[0].Filter == 'None') { // None None None None None None None None None None None None None None None None None None None None None None None None  
                                try {
                                    tempStock = docs[0];
                                    if (tempStock.Quantity - parseInt(req.body.Quantity) != null && tempStock.Quantity - parseInt(req.body.Quantity) != undefined) {
                                        tempStock.Quantity -= parseInt(req.body.Quantity);
                                        stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                            stock.persistence.compactDatafile();
                                        });
                                        res.json('Complete');
                                    }
                                    else
                                        res.json('Failed');
                                } catch (error) { }
                            }
                            */
                            IP.loadDatabase(function (err) {
                                IP.find({ IP: Security.GetClientIp(req) }, function (err, userDoc) {
                                    user.loadDatabase(function (err) {
                                        user.find({ Users: userDoc[0].User_id }, (err, docs2) => {
                                            db.insertTransaction({ //Save transaction
                                                User: docs2[0].Time,
                                                Username: docs2[0].Users,
                                                'TransactionID': Date.now(),
                                                IP: Security.GetClientIp(req),
                                                Product: {
                                                    Name: req.body.Product,
                                                    Quantity: req.body.Quantity,
                                                    Size: req.body.Size,
                                                    Gender: req.body.Gender,
                                                    Price: docs[0].Price,
                                                    ProductID: docs[0].ID.toString()
                                                },
                                                Time: {
                                                    TimeStamp: Security.convertUTCDateToLocalDate(new Date()).toString(),
                                                },
                                                Pending: { Status: "In Basket" },
                                                Confirmed: false,
                                                BasketID: null,
                                                Basket_Confirm_Time: {
                                                    Full: `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`,
                                                    Date: time.getDate(),
                                                    Day: time.getDay(),
                                                    Month: parseInt(time.getMonth()) + 1,
                                                    Year: time.getFullYear(),
                                                    Hour: time.getHours(),
                                                    Minute: time.getMinutes(),
                                                }
                                            });
                                            setTimeout(() => {
                                                UpdateUserBalance();
                                            }, 100);
                                        });
                                        // db.insertStockChanges({
                                        //     User: userDoc[0].User_id,
                                        //     TransactionID: TransactionID,
                                        //     Old: JSON.parse(oldStock),
                                        //     New: tempStock
                                        // });
                                        // setTimeout(() => {
                                        //     DatabaseSQL.InsertUsers();
                                        // }, 200);
                                    });
                                });
                            });
                            res.json('Complete');
                        }
                    });
                });
            });
        } catch (error) {
            console.log(error)
            res.send('Failed');
        }
    });

    app.post('/StockChanges/clear', function (req, res) {
        StockChanges.loadDatabase(function (err) {
            StockChanges.remove({}, { multi: true }, function (err, numRemoved) {
                res.json(numRemoved);
                stock.persistence.compactDatafile();
                setTimeout(() => {
                    DatabaseSQL.InsertSQLStockChangesDB();
                }, 1000);
            });
        })
    });

    app.post('/transaction/removeAt', function (req, res) {
        Security.AuthenUser(req, function (auth) {
            if (auth)
                try {
                    transaction.loadDatabase(function (err) {
                        transaction.find({ TransactionID: req.body.TransactionID }, (err, docs) => {
                            if (docs[0] != undefined)
                                transaction.remove({ _id: docs[0]._id }, { multi: false }, (err, numRemoved) => {
                                    if (err)
                                        res.json('Failed');
                                    else
                                        res.json('Complete');
                                })
                        });
                    })
                } catch (error) {
                    res.json('Failed');
                }
        })
    });

    app.post('/Transactions/clear', function (req, res) {
        transaction.loadDatabase(function (err) {
            transaction.remove({}, { multi: true }, function (err, numRemoved) {
                res.json(numRemoved);
                transaction.persistence.compactDatafile();
            });
            setTimeout(() => {
                DatabaseSQL.insertTransactionSQL();
            }, 100);
            UpdateUserBalance();
        })
    });

    app.get('/YuuThumbnail.svg', function (req, res) {
        res.sendFile(path.join(__dirname, "./YuuThumbnail.svg"));
    });

    app.get('/YuuThumbnailEdited.svg', function (req, res) {
        res.sendFile(path.join(__dirname, "./YuuThumbnailEdited.svg"));
    });

    app.post('/admin/report/:db', function (req, res) {
        var dbType = req.params.db.replace('#', "");
        var auth = true;
        IP.loadDatabase(function (err) {
            IP.find({ IP: Security.GetClientIp(req) }, function (err, docs) {
                user.loadDatabase(function (err) {
                    user.find({ Users: docs[0].User_id, Admin: true }, (err, docs2) => {
                        if (docs2[0].Admin)
                            auth = true;
                    })
                })
                // console.log(auth);
                console.log(docs);
                if (auth) {
                    if (dbType == 'transaction') {
                        transaction.loadDatabase(function (err) {
                            transaction.find({ Confirmed: true }, function (err, docs) {
                                res.json(docs);
                            })
                        })
                    }
                    if (dbType == 'stockchanges') {
                        StockChanges.loadDatabase(function (err) {
                            StockChanges.find({}, function (err, docs) {
                                res.json(docs);
                            })
                        })
                    }
                    if (dbType == 'basket') {
                        transaction.loadDatabase(function (err) {
                            transaction.find({ Confirmed: false }, function (err, docs) {
                                res.json(docs);
                            })
                        })
                    }
                    if (dbType == 'user') {
                        user.loadDatabase(function (err) {
                            user.find({}, function (err, docs) {
                                res.json(docs);
                            });
                        });
                    }
                    if (dbType == 'stock') {
                        stock.loadDatabase(function (err) {
                            stock.find({}, function (err, docs) {
                                // setTimeout(() => {
                                const temp = docs;
                                console.log(temp)
                                res.json(temp);
                                // }, 1000);
                            });
                        });
                    }
                } else {
                    res.status(401).render(path.join(__dirname, './views/Error.ejs'), { status: 401 });
                }
            })
        });
    })

    app.post('/client/transaction/confirm', function (req, res) {
        transaction.loadDatabase(function (err) {
            if (req.body.User != undefined || req.body.User != null)
                try {
                    transaction.find({ User: req.body.User, Confirmed: false }, function (err, docs) {
                        if (docs[0] != undefined) {
                            var l = 0;
                            const BasketID = Date.now();
                            loop();
                            var back = [];
                            async function loop() {
                                const temp = await UpdateStock(
                                    { ID: docs[l].Product.ProductID.toString() },      //json that indicates which stock will be updated
                                    'Subtract',                             //Add or subtract
                                    docs[l].Product.Gender,                 //Product gender
                                    docs[l].Product.Quantity,               //Quantity
                                    "",                                     //Change thumbnail; Leave "" if there will be no changes
                                    '',
                                    docs[l].Product.Size,                   //Size of Product
                                    res,                                    //res
                                    false,                                  //whether the function should automatically resond to client
                                    'buy',
                                    BasketID,
                                    0,
                                    "",
                                    ""
                                );
                                if (temp == 'Complete')
                                    transaction.update(
                                        {
                                            User: req.body.User,
                                            Confirmed: false,
                                            TransactionID: docs[l].TransactionID
                                        },
                                        { $set: { 'Confirmed': true, 'BasketID': BasketID, Pending: { Status: "Pending" } } }, {}, function (err, numReplaced) {
                                            transaction.persistence.compactDatafile();
                                        });
                                else
                                    back[back.length] = '<0';
                                l++;
                                // console.log(temp + "test");
                                if (l < docs.length)
                                    setTimeout(() => {
                                        loop();
                                    }, 100);
                                else {
                                    setTimeout(() => {
                                        // console.log(back);
                                        if (back.includes('<0'))
                                            res.json('<0');
                                        else {
                                            res.json('Complete');
                                        }
                                        setTimeout(() => {
                                            // console.log('test');
                                            // res.json(back);
                                            DatabaseSQL.insertTransactionSQL();
                                        }, 1000);
                                        UpdateUserBalance();
                                    }, 100);
                                }
                            }
                        }
                        else {
                            res.json('No Products');
                        }
                    });
                    const lineNotify = require('line-notify-nodejs')(LineNotifyToken);
                    lineNotify.notify({
                        message: 'There is a new order!',
                    }).then(() => {
                        console.log('Notified in line group.');
                    });
                } catch (error) {
                }
        })
    })

    app.post('/client/transaction/remove', function (req, res) {
        transaction.loadDatabase(function (err) {
            if (req.body.ID != undefined || req.body.ID != null) {
                try {
                    transaction.find({ TransactionID: parseInt(req.body.ID) }, (err, docs) => {
                        console.log(docs);
                        if (docs[0] != undefined) {
                            db.RemoveTransaction({ _id: docs[0]._id });
                            res.json('Complete');
                        } else
                            res.json('Failed');

                    })
                } catch (error) {
                    res.json('Failed');
                }
            } else
                res.json('Failed');
        })
    })

    app.get('/restart', function (req, res) {
        DatabaseSQL.LoadAllSQL();
        res.redirect('/');
    });

    app.get('/logs', (req, res) => {
        var tempStr = ''
        console.logs.forEach(logs => {
            tempStr += logs + '';
        });
        res.render(path.join(__dirname, "./logs.ejs"), { logs: tempStr });
    })
    app.get('/views/FontAwesome', (req, res) => {
        res.render(path.join(__dirname, "./views/FontAwesome.ejs"));
    })

    app.get('/admin/orders', (req, res) => {
        Security.AuthenUser(req, function (auth) {
            // console.log(auth)
            if (auth)
                res.render(path.join(__dirname, "./views/pendingOrdersPage.ejs"));
            else {
                res.status(401).render(path.join(__dirname, './views/Error.ejs'), { status: 401 });
            }
        })
    })

    app.get('/admin/pendingOrders.js', (req, res) => {
        Security.AuthenUser(req, function (auth) {
            // console.log(auth)
            if (auth)
                res.sendFile(path.join(__dirname, "./views/pendingOrders.js"));
            else {
                res.status(401);
            }
        })
    })

    app.post('/admin/orders', (req, res) => {
        Security.AuthenUser(req, function (auth) {
            if (auth)
                transaction.loadDatabase((err) => {
                    transaction.find({ Pending: { Status: "Pending" }, Confirmed: true }, (err, docs) => {
                        res.json(docs);
                    })
                })
            else {
                res.status(401);
            }
        })
    })


    app.post('/admin/orders/complete', (req, res) => {
        Security.AuthenUser(req, function (auth) {
            const time = Security.convertUTCDateToLocalDate(new Date());
            // console.log(parseInt(req.body.TransactionID))
            if (auth)
                if (!(req.body.TransactionID == null || req.body.TransactionID == undefined))
                    transaction.loadDatabase((err) => {
                        transaction.update({ TransactionID: parseInt(req.body.TransactionID) }, { $set: { Pending: { Status: "Completed", Date: time.getDate(), Month: time.getMonth() + 1 } } }, {}, (err, numUpdated) => {
                            if (numUpdated != 0) {
                                res.json('success');
                                DatabaseSQL.insertTransactionSQL();
                            }
                            else
                                res.json('failed')
                        })
                    })
                else
                    res.json('failed')
            else {
                res.status(401);
            }
        })
    })

    app.get('/admin/report/:db', (req, res) => {
        var dbType = req.params.db;
        var auth = false;
        Security.AuthenUser(req, function (auth) {
            if (auth)
                res.render(path.join(__dirname, "./views/Download.html"), { title: 'Report ' + dbType });
            else
                res.render(path.join(__dirname, './views/Error.ejs'), { status: 401 });
        })
    });

    app.get('/admin/sitemap', (req, res) => {
        res.sendFile(path.join(__dirname, "./SiteMap.xml"));
    });

//








//Declare Functions
function UpdateStock(
    filter, //json that indicates which stock will be updated
    mode, //Add or subtract
    gender, //Product gender
    quantity, //Quantity
    thumb, //Change thumbnail; Leave "" if there will be no changes
    thumb2, //Change thumbnail; Leave "" if there will be no changes
    size, //Size of Product
    res, //res
    respondBool, //if the function should automatically respond after updating via express js with res.json();
    content, //if the function should automatically respond after updating via express js with res.json();
    BasketID, //if the function should automatically respond after updating via express js with res.json();
    Price,
    Content1,
    Content2
) {
    return new Promise(function (resolve) {
        try {
            // console.log(parseInt(Price));
            const time = Security.convertUTCDateToLocalDate(new Date());
            // console.log(quantity + 'q');
            stock.find(filter, function (err, docs) {
                // console.log(docs[0])
                // console.log(docs[0])
                if (docs[0] != undefined) {

                    Filter = docs[0].Filter.toString();
                    var quantityNew = 0;
                    tempStock = docs[0];
                    if (Filter == "SML") //Make sure the types has sizes and genders
                    {
                        if (thumb.toString().replace(' ', '') != '') {
                            tempStock.Picture = thumb;
                        }
                        if (thumb2.toString().replace(' ', '') != '') {
                            tempStock.Picture2 = thumb2;
                        }
                        if (Content1.toString().replace(' ', '') != '') {
                            tempStock.Content1 = Content1;
                        }
                        if (Content2.toString().replace(' ', '') != '') {
                            tempStock.Content2 = Content2;
                        }
                        if (parseInt(Price) >= 1) {
                            tempStock.Price = parseInt(Price);
                        }
                        if (quantity == NaN || quantity == "" || quantity == null || quantity == undefined)
                            stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                stock.persistence.compactDatafile();
                                quantityNew = tempStock[gender][size];
                            })
                        if (quantity != NaN && quantity != "" && quantity != null && quantity != undefined) {
                            if (mode == 'Add') {
                                tempStock[gender][size] += parseInt(quantity);
                                stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                    stock.persistence.compactDatafile();
                                    quantityNew = tempStock[gender][size];
                                })
                                if (respondBool)
                                    res.json('Complete');
                                else
                                    resolve('Complete')
                            } else
                                if (tempStock[gender][size] - parseInt(quantity) >= 0) {
                                    tempStock[gender][size] -= parseInt(quantity);
                                    stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                        stock.persistence.compactDatafile();
                                        quantityNew = tempStock[gender][size];
                                    })
                                    if (respondBool)
                                        res.json('Complete');
                                    else
                                        resolve('Complete')
                                } else
                                    if (respondBool)
                                        res.json('<0');
                                    else
                                        resolve('<0');
                        }
                        // db.insertStock(tempStock);

                        // DatabaseSQL.InsertSQLStockChangesDB();
                        // db.insertStock(tempStock);
                    } else if (Filter == "None") {
                        if (thumb2.toString().replace(' ', '') != '') {
                            tempStock.Picture2 = thumb2;
                        }
                        if (thumb.toString().replace(' ', '') != '') {
                            tempStock.Picture = thumb;
                        }
                        if (Content1.toString().replace(' ', '') != '') {
                            tempStock.Content1 = Content1;
                        }
                        if (Content2.toString().replace(' ', '') != '') {
                            tempStock.Content2 = Content2;
                        }
                        if (parseInt(Price) >= 1) {
                            tempStock.Price = parseInt(Price);
                        }
                        if (quantity == NaN || quantity == "" || quantity == null || quantity == undefined)
                            stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                stock.persistence.compactDatafile();
                                quantityNew = tempStock.Quantity;
                            })
                        if (quantity != NaN && quantity != "" && quantity != null && quantity != undefined) {
                            if (mode == 'Add') {
                                tempStock.Quantity += parseInt(quantity);
                                stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                    stock.persistence.compactDatafile();
                                    quantityNew = tempStock.Quantity;
                                })
                                if (respondBool)
                                    res.json('Complete');
                                else
                                    resolve('Complete')
                            } else {
                                if (tempStock.Quantity - parseInt(quantity) >= 0) {
                                    tempStock.Quantity -= parseInt(quantity);
                                    stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                        stock.persistence.compactDatafile();
                                        quantityNew = tempStock.Quantity;
                                    })
                                    if (respondBool)
                                        res.json('Complete');
                                    else
                                        resolve('Complete')
                                } else {
                                    if (respondBool)
                                        res.json('<0');
                                    else
                                        resolve('<0');
                                }
                            }
                        }
                        // db.insertStock(tempStock);
                        // db.insertStock(tempStock);
                        // DatabaseSQL.InsertSQLStockChangesDB();
                        // console.log(tempStock.Quantity - parseInt(quantity));
                    } else if (Filter == "Numbers") {
                        {
                            var sizeTemp = tempStock[gender].Sizes.indexOf(parseInt(size));
                            if (thumb.toString().replace(' ', '') != '') {
                                tempStock.Picture = thumb;
                            }
                            if (thumb2.toString().replace(' ', '') != '') {
                                tempStock.Picture2 = thumb2;
                            }
                            if (Content1.toString().replace(' ', '') != '') {
                                tempStock.Content1 = Content1;
                            }
                            if (Content2.toString().replace(' ', '') != '') {
                                tempStock.Content2 = Content2;
                            }
                            console.log(parseInt(Price));
                            if (parseInt(Price) >= 1) {
                                tempStock.Price = parseInt(Price);
                            }
                            if (quantity == NaN || quantity == "" || quantity == null || quantity == undefined)
                                stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                    stock.persistence.compactDatafile();
                                    quantityNew = tempStock[gender].Quantity[sizeTemp];
                                })
                            if (quantity != NaN && quantity != "" && quantity != null && quantity != undefined) {
                                if (mode == 'Add') {
                                    tempStock[gender].Quantity[sizeTemp] = parseInt(tempStock[gender].Quantity[sizeTemp]) + parseInt(quantity);
                                    stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                        stock.persistence.compactDatafile();
                                        quantityNew = tempStock[gender].Quantity[sizeTemp];
                                    })
                                    if (respondBool)
                                        res.json('Complete');
                                    else
                                        resolve('Complete')
                                } else
                                    if (parseInt(tempStock[gender].Quantity[sizeTemp]) - parseInt(quantity) >= 0) {
                                        tempStock[gender].Quantity[sizeTemp] = parseInt(tempStock[gender].Quantity[sizeTemp]) - parseInt(quantity);
                                        stock.update({ _id: docs[0]._id }, tempStock, {}, function (err, numReplaced) {
                                            stock.persistence.compactDatafile();
                                            quantityNew = tempStock[gender].Quantity[sizeTemp];
                                        })
                                        if (respondBool)
                                            res.json('Complete');
                                        else
                                            resolve('Complete')
                                    } else
                                        if (respondBool)
                                            res.json('<0');
                                        else
                                            resolve('<0')
                            }
                            // DatabaseSQL.InsertSQLStockChangesDB();
                            // db.insertStock(tempStock);
                        }
                    }
                    setTimeout(() => {
                        db.insertStockChanges({
                            User: 'Admin',
                            StockingID: BasketID,
                            Gender: gender,
                            Size: size,
                            Quantity: quantity,
                            Quantity2: quantityNew,
                            Mode: mode,
                            Name: tempStock.Name,
                            ProductID: tempStock.ID,
                            Product__Price: tempStock.Price,
                            Content: content,
                            Date: time.getDate(),
                            Day: time.getDay(),
                            Month: parseInt(time.getMonth()) + 1,
                            Year: time.getFullYear(),
                            Hour: time.getHours(),
                            Minute: time.getMinutes(),
                        });
                    }, 100);
                    console.log(tempStock.ID)
                    // resolve(tempStock.ID);
                }
                if (respondBool)
                    resolve('Failed');
            })
        } catch (error) {
            res.json('Error');
            console.log('Error');
        }
    });
}

function UpdateUserBalance() {
    user.loadDatabase(function () {
        user.find({}, function (err, UserToUpdateBalance) {
            UserToUpdateBalance.forEach(TheUser => {
                transaction.loadDatabase(function (err) {
                    transaction.find({ User: TheUser.Time, Confirmed: true }, (err, UserTransactionJsonArray) => {
                        TheUser.Balance = UserInitialBalance;
                        UserTransactionJsonArray.forEach(UserTransactionJson => {
                            TheUser.Balance -= UserTransactionJson.Product.Price * UserTransactionJson.Product.Quantity;
                        });
                        user.update({ ID: TheUser.ID }, TheUser, {}, function (err, numReplaced) {
                            user.persistence.compactDatafile();
                        });
                    })
                })
            });
        })
    })
    setTimeout(() => {
        DatabaseSQL.InsertUsers();
    }, 2000);
}
