
var Loading = true;
window.addEventListener('DOMContentLoaded', (event) => { Loading = false; console.log('Loaded') });
function waitUntil(condition) {
    setTimeout(() => {
        if (condition) {
            waitUntil(condition);
        }
    }, 100);
}
waitUntil(Loading);

try {
    var UserJson = {};
    const altPicture = 'https://stickershop.line-scdn.net/stickershop/v1/product/1082549/LINEStorePC/main.png'
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    var AllProductJson = { "Test": "Test" };
    // const URLMessage = decodeURI(hex2a(window.location.href.replace(window.location.origin + '/login', "")));
    load();
    const username = document.getElementById('username').innerHTML;
    function hex2a(hex) {
        var j;
        var hexes = hex.match(/.{1,4}/g) || [];
        var back = "";
        for (j = 0; j < hexes.length; j++) {
            back += String.fromCharCode(parseInt(hexes[j], 16));
        }
        return back;
    }
    function load() {
        console.log('load Function Called');
        var userGender = '';
        document.getElementById('MainCardDiv').innerHTML = "";
        fetch('/fetch/stock', options).then((response) => { return response.json() }).then((responseJson) => {
            // console.log('Name: ' + JSON.stringify(JSON.parse(URLMessage).username).substring(1, JSON.stringify(JSON.parse(URLMessage).username).length - 1));
            AllProductJson = responseJson;
            console.log(AllProductJson);
            var userData = {
                // "Name": 
                // "Name": JSON.stringify(JSON.parse(URLMessage).username).substring(1, JSON.stringify(JSON.parse(URLMessage).username).length - 1)
            };
            const options2 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            };
            setTimeout(() => {
                fetch('/User/All', options2).then((response2) => { return response2.json() }).then((responseJson2) => {
                    UserJson = responseJson2;
                    console.log(responseJson2);
                    userGender = responseJson2.Gender;
                    console.log("Gender: " + userGender);
                    if (UserJson.Admin) {
                        document.getElementsByClassName('dropdown-menu')[0].removeChild(document.getElementsByClassName('dropdown-menu')[0].lastElementChild);
                        document.getElementsByClassName('dropdown-menu')[0].removeChild(document.getElementsByClassName('dropdown-menu')[0].lastElementChild);
                        document.getElementsByClassName('dropdown-menu')[0].innerHTML += ('<hr><a class="dropdown-item" href="/admin" ChangeLanguage>Admin Settings</a>');
                    }
                    else {
                        document.getElementsByClassName('dropdown-menu')[0].removeChild(document.getElementsByClassName('dropdown-menu')[0].lastElementChild);
                        document.getElementsByClassName('dropdown-menu')[0].innerHTML += ('<span></span>');
                        document.getElementsByClassName('dropdown-menu')[0].removeChild(document.getElementsByClassName('dropdown-menu')[0].lastElementChild);
                        document.getElementsByClassName('dropdown-menu')[0].innerHTML += ('<span></span>');
                    }
                    for (i = 0; i < responseJson.length; i++) {
                        function Product(Name, Gender) {
                            this.Name = Name;
                            this.Gender = Gender;
                        }
                        console.table(new Product(responseJson[i].Name, responseJson[i].Gender))
                        var temp = "";
                        var picture = altPicture;
                        if (responseJson[i].Picture != "")
                            picture = responseJson[i].Picture;

                        if (document.getElementById('DesignToggle').checked)
                            temp = '<div class="col-md-3"><div style="border:0px;" class="card mb-3 shadow-sm"><div style="margin: 0px; padding : 0px;" class="card"><img class="card-img-top" style="object-fit:contain; height:18rem;" src="' + picture + '"onerror="this.src=\'/views/Error404\'"><div class="card-body" id="' + "Div" + i + '"><h5 class="card-title" id="' + "CardTitle" + i + '">' + responseJson[i].Name + '</h5><p class="card-text">Content</p><a id="' + "Button" + i + '" style="color:white;" onclick="PopUp(event)" class="btn btn-primary">View</a></div></div></div></div>';
                        else
                            temp = `<!-- client cards --> <div class="mb-3 flip-card col-sm-3" onmouseover="this.style.zIndex = 1002" zindex="` + (1000 - i) + `" onmouseout="this.style.zIndex = this.getAttribute('zindex');" style="z-index: ` + (1000 - i) + `; margin-bottom: auto; -webkit-transform-style: preserve-3d;transform-style: preserve-3d;perspective: 2000px;-webkit-perspective: 2000px;overflow: visible; min-height: 41vh; "> <div class="front" style="transition: all 0.3s cubic-bezier(.56,.49,.83,.67);padding: 0; overflow:hidden;padding:5px;background: none; box-shadow: none;-webkit-transform-style: preserve-3d;transform-style: preserve-3d;perspective: 2000px;-webkit-perspective: 2000px;"> <div role="img" aria-label="Cannot get image." style="height:100%;width: 100%; overflow: hidden; padding: 0; background-image: url(` + picture + `); -webkit-transform-style: preserve-3d; background-size: cover;background-position: center; "> <h1 style="-webkit-transform: translateZ(100px);font-size: 2em; font-family: Prompt, sans-serif;" class="display-2 oppositeColor">` + responseJson[i].Name + `</h1> </div> </div> <div class="back" style="transition: all 0.3s cubic-bezier(.56,.49,.83,.67);box-shadow: none; background: none; min-height:41vh; height:100%;width: 100%;  backface-visibility: hidden;"> <div> <div style="border:0px; width: 100%; height:100%;" class="card mb-3 shadow-sm"> <div style="margin: 0px; padding : 0px; width: 100%; height:100%;" class="card"> <div role="img" aria-label="Cannot get image." style=" display: table; margin: 0 auto; width: 20vw; height:30vh;  overflow: hidden;  padding: 0; background-repeat: no-repeat; background-image: url(` + picture + `); background-size: contain;background-position:  center;"> <a id="` + "Button" + i + `" style="width: 100%;height: 100%; background: none;border: none; color:white;" onclick="PopUp(event)" class="btn btn-primary"></a> </div> <div class="card-body" id="` + "Div" + i + `"> <h5 class="card-title" id="` + "CardTitle" + i + `">` + responseJson[i].Name + `</h5> <p class="card-text">` + responseJson[i].Content1.substring(0, 50) + `...` + `</p> <button type="button" id="` + "Button" + i + `"  onclick="PopUp(event)" class="btn btn-outline-secondary" translate>View</button> </div> </div> </div> </div> </div> </div>`;

                        if (document.getElementById("GenderToggle").checked) {
                            if (userGender == "Others" || !(userGender == 'Female' && responseJson[i].Gender == "Male") && !(userGender == 'Female' && responseJson[i].Gender == "Male"))
                                //uncomment the "if" up here to alow only gender
                                document.getElementById('MainCardDiv').innerHTML += temp;
                        }
                        else {
                            document.getElementById('MainCardDiv').innerHTML += temp;
                        }
                    }
                    loadBalance();
                    $('#loading').hide();
                    OpenSelectedTransactions();
                });
            }, 200);
        });
    }
    function loadBalance() {
        document.getElementById("Balance").innerHTML = 0;
        var i = 0;
        if (UserJson.Balance < 0)
            document.getElementById('Balance').style.color = "red";
        else
            document.getElementById('Balance').style.color = "#E4701E";
        console.log(UserJson)
        addUp();
        function addUp() {
            if (Math.round(i) != UserJson.Balance) {
                setTimeout(() => {
                    document.getElementById("Balance").innerHTML = Math.round(i);
                    i += UserJson.Balance / 230;
                    addUp();
                }, 1);
            }
            else {
                document.getElementById("Balance").innerHTML = UserJson.Balance;
            }
        }
    }
    function encrypted(message) {
        var b = CryptoJS.enc.Hex.parse('7844784b793647795862677233666858');
        var a = CryptoJS.enc.Hex.parse("4b6579204f662050616e7961707261746565702053686f70204279204b656e21");
        let encrypt = CryptoJS.AES.encrypt(message, a, {
            iv: b,
            mode: CryptoJS.mode.CBC,
            format: CryptoJS.format.Hex,
            padding: CryptoJS.pad.Pkcs7
        });
        console.log('password Encrypted: ' + encrypt.toString(CryptoJS.format.Hex));
        return encrypt.toString(CryptoJS.format.Hex);
    }
    function String2Hex(str) {
        return Array.from(str).map(c =>
            c.charCodeAt(0) < 128 ? c.charCodeAt(0).toString(16) :
                encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
        ).join('');
    };
    var thisProductJson = {};
    var StocksLeft = 0;
    function PopUp(event) {

        $('#cartAnimation2').hide();
        var TempName = event.target.id.toString().replace('Button', "");
        // console.log(event.target.parentNode.id);
        $('#ProductModal').modal('toggle');
        document.getElementById("ProductName").innerHTML = document.getElementById("CardTitle" + TempName).innerText;
        const productName = document.getElementById("ProductName").innerHTML;
        for (i = 0; i < AllProductJson.length; i++) {
            if (AllProductJson[i].Name == productName)
                thisProductJson = AllProductJson[i];
        }
        console.log(thisProductJson);
        document.getElementById("Description2").innerText = thisProductJson.Content1;
        document.getElementById("Description3").innerText = thisProductJson.Content2;
        //Images
        if (thisProductJson.Picture == '')
            document.getElementById('picture1').src = '/views/Error404'
        else
            document.getElementById('picture1').src = thisProductJson.Picture

        if (thisProductJson.Picture2 == '')
            document.getElementById('picture2').src = '/views/Error404'
        else
            document.getElementById('picture2').src = thisProductJson.Picture2
        console.log(thisProductJson.Picture2)

        // Gender
        document.getElementById("ProductPrice").innerHTML = '฿' + thisProductJson.Price;
        if (thisProductJson.Gender != 'Others')
            document.getElementById("ProductGender").innerHTML = thisProductJson.Gender;
        else
            document.getElementById("ProductGender").innerHTML = '';
        // document.getElementById("ProductSelectGender").innerHTML = '<option value="" disabled selected>Choose your gender</option>';
        document.getElementById("ProductSelectGender").innerHTML = '';
        if (thisProductJson.Gender == 'Male' || thisProductJson.Gender == 'Others')
            document.getElementById("ProductSelectGender").innerHTML += '<option value="Male" ChangeLanguage>Male</option>';
        if (thisProductJson.Gender == 'Female' || thisProductJson.Gender == 'Others')
            document.getElementById("ProductSelectGender").innerHTML += '<option value="Female" ChangeLanguage>Female</option>';
        // size
        document.getElementById('ProductSelectSize').innerHTML = '';
        if (thisProductJson.Filter == 'SML') {
            document.getElementById('ProductSelectSize').innerHTML += '<option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option><option>XXXXL</option>';
        }
        if (thisProductJson.Filter == 'None') {
            document.getElementById('ProductSelectSize').innerHTML = '<option value="" disabled selected ChangeLanguage>No need to choose size :D</option>';
            document.getElementById('ProductSelectGender').innerHTML = '<option value="" disabled selected ChangeLanguage>No need to choose gender :D</option>';
        }
        if (thisProductJson.Filter == 'Numbers') {
            for (i = 0; i < thisProductJson[document.getElementById('ProductSelectGender').value].Sizes.length; i++)
                document.getElementById('ProductSelectSize').innerHTML += '<option>' + thisProductJson[document.getElementById('ProductSelectGender').value].Sizes[i] + '</option>';
        }
        update();
    }
    function order() {
        update();
        var userData = {
            Product: thisProductJson.Name,
            User: username,
            Quantity: document.getElementById('Quantity').value,
            Gender: document.getElementById('ProductSelectGender').value,
            Size: document.getElementById('ProductSelectSize').value
        }
        if (!(UserJson.Balance - (userData.Quantity * thisProductJson.Price) < 0) && userData.Quantity > 0 && StocksLeft - userData.Quantity >= 0 && (document.getElementById('Quantity').value > 0 && document.getElementById('ProductSelectSize').value != '' && document.getElementById('ProductSelectGender').value != "" || thisProductJson.Filter == "None")) {
            document.getElementById('OrderError').innerHTML = '';
            fetch('/client/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
                .then((response) => { return response.json() }).then((response) => {
                    console.log(response);
                    if (response == "Failed")
                        console.log('Failed to order, please try again or contact the admin.');
                    if (response == "Complete") {
                        document.getElementById('OrderError').innerHTML = 'Order Complete!';
                        document.getElementById('OrderError').style.color = 'green';
                        load();

                        $('#cartAnimation2').fadeIn(500);
                        $('#cartAnimation2').removeClass('MoveOutRight');
                        $('#cartAnimation2').removeClass('jump');
                        $('.modal-backdrop').animate({ 'opacity': '0' }, 2000)
                        $('#cartAnimation2').addClass('jump');
                        setTimeout(() => {
                            $('#cartAnimation2').addClass('MoveOutRight');
                            // $("#cartAnimation2").css("animation-play-state", "running");
                            setTimeout(() => {
                                $('#cartAnimation2').hide();
                                $('#ProductModal').modal('hide');
                            }, 1000);
                        }, 400);
                    }
                    console.log('Transaction Complete');
                });
        }
        else {
            console.log('Requirements for order not met.');
            document.getElementById('OrderError').style.color = 'red';
            document.getElementById('OrderError').innerHTML = "";
            if (userData.Quantity == "")
                document.getElementById('OrderError').innerHTML += 'Quantity is blank!; ';
            else if (StocksLeft - userData.Quantity <= 0)
                document.getElementById('OrderError').innerHTML += 'Not enough items!; ';
            if (document.getElementById('ProductSelectSize').value == '' && thisProductJson.Filter != 'None')
                document.getElementById('OrderError').innerHTML += 'No size chosen!; ';
            if (document.getElementById('ProductSelectGender').value == '' && thisProductJson.Filter != 'None')
                document.getElementById('OrderError').innerHTML += 'No gender chosen!; ';
            if (UserJson.Balance - (userData.Quantity * thisProductJson.Price) < 0)
                document.getElementById('OrderError').innerHTML += 'Not enough money!; ';
        }
        setTimeout(() => {
            update();
            // load();
        }, 1000);
    }
    function ConfirmBasket(sender_id) {
        console.log(sender_id);
        const content = { User: UserJson.Time };
        // $('cartAnimation').
        Loading = true;
        ShowLoading();
        fetch('/client/transaction/confirm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) })
            .then((response) => { return response.json() }).then((response) => {
                console.log('Basket Confirm Response:');
                console.log(response);
                if (response == 'Complete' || response[0] == undefined) {
                    Loading = false;
                    $('#loading').fadeOut();
                    load();
                }
                else if (response == '<0') {
                    Loading = false;
                    $('#loading').fadeOut();
                    document.getElementById('ConfirmBasketButton').innerText = `There aren't enough products! Some products will be left in the basket!`;
                    setTimeout(() => {
                        document.getElementById('ConfirmBasketButton').innerText = 'Check Out';
                    }, 3000);
                }
                if (response == 'No Products') {
                    Loading = false;
                    $('#loading').fadeOut();
                    document.getElementById('ConfirmBasketButton').innerText = 'Basket is empty!';
                    setTimeout(() => {
                        document.getElementById('ConfirmBasketButton').innerText = 'Check Out';
                    }, 3000);
                }
                checkLanguage()
                setTimeout(() => {
                    OpenSelectedTransactions();
                }, 800);
            });
    }
    function RemoveTransaction(sender_id) {
        Loading = true;
        ShowLoading();
        console.log(sender_id);
        const content = { ID: sender_id };
        fetch('/client/transaction/remove', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) })
            .then((response) => { return response.json() }).then((response) => {
                console.log(response);
                // setTimeout(() => {
                if (response == 'Complete')
                    $('#loading').fadeOut();
                Loading = false;
                setTimeout(() => {
                    OpenSelectedTransactions();
                }, 200);
                if (response == 'Failed')
                    $('#loading').fadeOut();
                Loading = false;
                setTimeout(() => {
                    OpenSelectedTransactions();
                }, 200);
                // }, 10000);


            });
    }
    function OpenSelectedTransactions() {
        var SelectedIDs = [UserJson.Time];
        var content = { Users: SelectedIDs };
        fetch('/client/OpenTrasactions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) })
            .then((response) => { return response.json() }).then((response) => {
                console.log(response);
                document.getElementById('TotalPriceLabel').innerHTML = "";
                document.getElementById('TransactionIdLabel').innerHTML = "";
                document.getElementById('ProductLabel').innerHTML = "";
                document.getElementById('QuantityLabel').innerHTML = ""
                document.getElementById('RemoveButtonLabel').innerHTML = "";
                document.getElementById('TotalPriceLabel2').innerHTML = "";
                document.getElementById('TransactionIdLabel2').innerHTML = "";
                document.getElementById('BasketIDLabel2').innerHTML = "";
                document.getElementById('PendingLabel2').innerHTML = "";
                document.getElementById('ProductLabel2').innerHTML = "";
                document.getElementById('QuantityLabel2').innerHTML = ""
                var totalPrice = 0;
                response[0].forEach(transactionJson => {
                    if (transactionJson.Confirmed) {
                        document.getElementById('TransactionIdLabel2').innerHTML += '<li class="list-group-item">' + transactionJson.TransactionID + '\t</li>';
                        document.getElementById('BasketIDLabel2').innerHTML += '<li class="list-group-item">' + transactionJson.BasketID + '\t</li>';
                        document.getElementById('PendingLabel2').innerHTML += '<li class="list-group-item">' + transactionJson.Pending.Status + '\t</li>';
                        document.getElementById('ProductLabel2').innerHTML += ('<li class="list-group-item">' + transactionJson.Product.Name.toString() + '\t</li>');
                        document.getElementById('QuantityLabel2').innerHTML += '<li class="list-group-item">' + transactionJson.Product.Quantity + '\t</li>';
                        document.getElementById('TotalPriceLabel2').innerHTML += '<li class="list-group-item">' + (transactionJson.Product.Price * transactionJson.Product.Quantity) + '\t</li>';
                    }
                    else if (transactionJson.Confirmed == false) {
                        document.getElementById('RemoveButtonLabel').innerHTML += '<li style="padding:5px;" class="list-group-item"><button st type="button" id="' + transactionJson.TransactionID + '" onclick="RemoveTransaction(this.id)" class="removeTransactionButton btn btn-danger" ChangeLanguage>Remove from <i class="fa fa-shopping-basket fa-xs" aria-hidden="true"></i></button>\t</li>';
                        document.getElementById('TransactionIdLabel').innerHTML += '<li class="list-group-item">' + transactionJson.TransactionID + '\t</li>';
                        document.getElementById('ProductLabel').innerHTML += ('<li class="list-group-item">' + transactionJson.Product.Name.toString() + '\t</li>');
                        document.getElementById('QuantityLabel').innerHTML += '<li class="list-group-item">' + transactionJson.Product.Quantity + '\t</li>';
                        document.getElementById('TotalPriceLabel').innerHTML += '<li class="list-group-item">' + (transactionJson.Product.Price * transactionJson.Product.Quantity) + '\t</li>';
                    }
                    if (!transactionJson.Confirmed) {
                        totalPrice += parseInt(transactionJson.Product.Quantity) * parseInt(transactionJson.Product.Price);
                        document.getElementById('totalPrice').innerText = totalPrice;
                    }
                });
                if (response[0][0] == undefined) {
                    document.getElementById('modalBody').style.display = 'none';
                    document.getElementById('BlankMessage').style.display = 'block';
                }
                else {
                    document.getElementById('BlankMessage').style.display = 'none';
                    document.getElementById('modalBody').style.display = 'inline';
                }
                var j = 0;
                response[0].forEach(k => {
                    if (!k.Confirmed)
                        j++;
                });
                if (j == 0) {
                    $('#badge').hide();
                }
                else {
                    $('#badge').show();
                    document.getElementById('badge').innerText = j;
                }
                checkLanguage();
            });
    }
    function update() {
        // console.log('Update(); function called');
        var userData = {
            Name: thisProductJson.Name,
            Gender: document.getElementById('ProductSelectGender').value,
            Size: document.getElementById('ProductSelectSize').value
        }
        // console.log(userData)
        if ((userData.Gender != "" && userData.Size != "" && thisProductJson.Filter == 'SML') || (userData.Gender != "" && userData.Size != "" && thisProductJson.Filter == 'Numbers') || thisProductJson.Filter == 'None')
            fetch('/client/stock/quantitycheck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
                .then((response) => { return response.json() }).then((response) => {
                    console.log(response);
                    StocksLeft = parseInt(response);
                    document.getElementById('Quant').innerText = '0';
                    if (response != "0" && response != 0) {
                        document.getElementById('Quant').innerText = response;
                        document.getElementById('Description1').innerHTML = "There are " + response + " " + thisProductJson.Name + ' at your preferences left in stock';
                    }
                    else
                        document.getElementById('Description1').innerHTML = "We are out of stock for this item. We are sorry. 😞";
                })
                .catch(error => document.getElementById('Description1').innerHTML = "You aren't supposed to see this message. Fetching stock probably has an error. This is a bug :D. Please inform Ken if you see this :D. Or maybe it's the server timeout. I guess you've been leaving this website hanging for quite a while right? The server probably went to sleep now. Refresh to wake it up! XD");

        checkLanguage();
    }

    function SignOut() {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/User/SignOut', options);
        console.log(location.hostname)
        // setTimeout(() => {
        window.location.href = '/login';
        // }, 500);
    }
    function ChangePassword() {
        // console.log(encrypted(String2Hex(document.getElementById('NewPassword').value)));
        if (document.getElementById('NewPassword').value.length < 19)
            window.location.href = '/client/username/change' + encodeURI(encrypted(String2Hex(document.getElementById('NewPassword').value)));
    }
    function showConsole() {
        $('#ConsoleModal').modal('toggle');
        document.getElementById('ConsoleText').innerHTML = "";
        for (i = 0; i < console.logs.length; i++) {
            try {
                document.getElementById('ConsoleText').innerHTML += i + ' : \n' + JSON.stringify(console.logs[i]) + '\n';
            } catch (error) {
                document.getElementById('ConsoleText').innerHTML += i + ' : \n' + console.logs[i] + '\n';
            }
        }
    }
    function showSettings() {
        // <a onclick="ChangePassword()" class="btn btn-primary" href="#" role="button">Change Password</a>
        document.getElementById('SettingsText').innerText = "";
        $('#SettingsModal').modal('toggle');
        var temp = JSON.stringify(UserJson, null, 4).split('\n');
        console.log(temp);
        temp.forEach(lines => {
            if (lines.includes('Password') && !lines.includes('Username'))
                document.getElementById('SettingsText').innerHTML += (lines + '<div style="width:20rem;float:right;margin-right:20px;" class="form-group"><input style="margin-bottom:10px;" type="text" class="form-control" id="NewPassword" aria-describedby="helpId" placeholder="New Password"><a style=" float:right;border-radius: 10px;background: linear-gradient(145deg, #fafafa, #d3d3d3); box-shadow:  10px 10px 17px #c7c7c7, -10px -10px 17px #ffffff;" onclick="ChangePassword()" class="btn btn-primary" href="#" role="button"> Change Password</a></div><br>');
            else
                document.getElementById('SettingsText').innerHTML += (lines + '<br>');
        });
    }
    function copy() {
        var copyText = document.getElementById("ConsoleText");
        copyText.select();
        copyText.setSelectionRange(0, copyText.value.length);
        document.execCommand("copy");
        alert("Thanks for the support! Please send this over to the Admin1!");
    }
}
catch (error) {
    console.error(error)
}
console.stdlog = console.log.bind(console);
console.logs = [];
console.log = function () {
    console.logs.push(Array.from(arguments));
    console.stdlog.apply(console, arguments);
}