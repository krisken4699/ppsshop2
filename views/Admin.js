var Loading = true;
var FileName = "";
window.addEventListener('DOMContentLoaded', (event) => {
    Loading = false;
    console.log('Loaded')
    getStocks();
});

if (!window.location.href.includes('pangcu'))
    setTimeout(() => {
        // turnFace();
    }, 100);
function UploadFile() {
    // var input = document.getElementById('ImageUpload');

    // var options = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ Name: FileName, Data: readURL(document.getElementById('ImageUpload')) })
    // };
    // if (input.files && input.files[0]) {
    //     var reader = new FileReader();
    //     reader.onload = function (e) {
    //         $('#previewImg').attr('src', e.target.result);
    //     }
    //     reader.readAsDataURL(input.files[0]); // convert to base64 string\
    //     var back = "";
    //     reader.addEventListener("load", function (e) {
    //         console.log(e.target.result)
    //         options.Data = e.target.result;
    //         // console.log(options)
    //         console.log(options);
    //         setTimeout(() => {
    //             console.log(options);
    //             fetch('/share/upload', options).then((response) => { return response.json() }).then((responseJson) => {
    //                 console.log(responseJson);
    //             })
    //         }, 100);
    //     });
    // }
    let photo = document.getElementById("ImageUpload").files;
    let formData = new FormData();
    for (i = 0; i < photo.length; i++)
        formData.append(i, photo[i]);
    fetch('/share/upload', { method: "POST", body: formData }).then((response) => { return response.json() }).then((responseJson) => {
        console.log(responseJson);
        document.getElementById("ImageUpload").value = "";
        document.getElementById("previewImg").src = "";
    });
}

function turnFace() {
    // $(".flip-card").mouseover();
    console.log(document.getElementsByClassName('front').length);
    // document.getElementsByClassName('front').forEach(element => {
    // for (i = 0; i < document.getElementsByClassName('front').length; i++)
    // var i = 0;
    while (document.getElementsByClassName('front').length > 0) {
        document.getElementsByClassName('front')[0].remove();
        // i++
    }

    for (i = 0; i < document.getElementsByClassName('back').length; i++) {
        document.getElementsByClassName('back')[i].style = 'transform: rotateY(360deg)';
        // i++
    }
    // });
}

function changeTarget(sender) {
    checks = [];
    if (sender.value == 'Mass') {
        document.getElementById('Mass').classList.remove('disabled')
        document.getElementById('BadgeUsername').innerText = 'Mass';
    } else {
        document.getElementById('Mass').classList.add('disabled')
    }
    var tempUser = '';
    console.log('changed');
    AllUsersID.forEach(user => {
        // console.log(user)
        if ("ot" + user == sender.value) {
            tempUser = user;
        }
    });
    checks[0] = tempUser;
    console.log(tempUser);
}

function waitUntil(condition) {
    setTimeout(() => {
        if (condition) {
            waitUntil(condition);
        }
    }, 100);
}
waitUntil(Loading);

function UpdateForceModal(sender) {

    // console.log(AllProductJson);
    for (i = 0; i < AllProductJson.length; i++) {
        if (AllProductJson[i].Name == sender.value) {
            thisProductJson = AllProductJson[i];
        }
    }
    // console.log(thisProductJson);
    document.getElementById('ForceSize').innerHTML = '';
    document.getElementById('ForceGender').innerHTML = '';
    if (thisProductJson.Filter == 'None') {
        document.getElementById('ForceSize').innerHTML += '<option disabled>No Size</option>';
    }
    if (thisProductJson.Filter == 'SML') {
        if (thisProductJson.Gender == 'Male' || thisProductJson.Gender == 'Others')
            document.getElementById('ForceGender').innerHTML += '<option>Male</option>';
        if (thisProductJson.Gender == 'Female' || thisProductJson.Gender == 'Others')
            document.getElementById('ForceGender').innerHTML += '<option>Female</option>';
        document.getElementById('ForceSize').innerHTML += '<option>S</option>';
        document.getElementById('ForceSize').innerHTML += '<option>M</option>';
        document.getElementById('ForceSize').innerHTML += '<option>L</option>';
        document.getElementById('ForceSize').innerHTML += '<option>XL</option>';
        document.getElementById('ForceSize').innerHTML += '<option>XXL</option>';
        document.getElementById('ForceSize').innerHTML += '<option>XXXXL</option>';
    } else if (thisProductJson.Filter == 'Numbers') {
        if (thisProductJson.Gender == 'Male' || thisProductJson.Gender == 'Others')
            document.getElementById('ForceGender').innerHTML += '<option>Male</option>';
        if (thisProductJson.Gender == 'Female' || thisProductJson.Gender == 'Others')
            document.getElementById('ForceGender').innerHTML += '<option>Female</option>';
        thisProductJson.Male.Sizes.forEach(Size => {
            document.getElementById('ForceSize').innerHTML += '<option>' + Size + '</option>';
        });
    } else {
        document.getElementById('ForceSize').innerHTML += '<option disabled>None</option>';
        document.getElementById('ForceGender').innerHTML += '<option disabled>None</option>';
    }
}

// setTimeout(()=>{updateElements()},10);
function getStocks() {
    fetch('/fetch/stock', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then((response) => { return response.json() }).then((responseJson) => {
        console.log('stock: ' + JSON.stringify(responseJson[0]));
        AllProductJson = responseJson;
        document.getElementById('type').innerHTML = '';
        document.getElementById('DelName').innerHTML = '';
        responseJson.forEach(product => {
            var nameTemp = " Others";
            if (product.Gender == "Male")
                nameTemp = ' | <i class="fas fa-mars"></i>';
            if (product.Gender == "Female")
                nameTemp = ' | <i class="fas fa-venus"></i>';
            document.getElementById('type').innerHTML += '<option><p>' + product.Name.toString() + '</p></option>';
            document.getElementById('DelName').innerHTML += '<option><p>' + product.Name.toString() + '</p></option>';
        });
        update();
        updateElements();
    });
}
function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log(reader.result);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

var image64 = "";
var loadFile = function (event) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
        image64 = getBase64(event.target.files[0]);
        console.log(image64);
    }
    Thumb = image64;
};

var checks = [];
function OpenSelectedTransactions() {
    // console.log(AllUsersID);
    // checks = [];
    for (i = 0; i < AllUsersID.length; i++) {
        if (document.getElementById(AllUsersID[i]).checked)
            checks[checks.length] = AllUsersID[i];
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Time: checks, Price: document.getElementById('ForcePrice').value, Name: document.getElementById('ForceName').value, Quantity: document.getElementById('ForceQuantity').value, Product: document.getElementById('ForceProduct').value, Size: document.getElementById('ForceSize').value, Gender: document.getElementById('ForceGender').value })
    };
    console.log(options);
    if (checks.length > 0 && (JSON.parse(options.body).Product == 'Custom' && JSON.parse(options.body).Name.length > 3 && JSON.parse(options.body).Price > 0) || (JSON.parse(options.body).Quantity > 0 && JSON.parse(options.body).Product != 'Custom'))
        if (checks[0] != undefined)
            fetch('/admin/transaction/force', options).then((response) => { return response.json() }).then((responseJson) => {
                console.log(responseJson);
                if (responseJson == 'Complete') {
                    alert('Complete');
                }
                else {
                    alert('Failed');
                }
            })
        else {
            if (checks.length = 0)
                alert('Tick a user!');
            if (JSON.parse(options.body).Product == 'Custom') {
                if (JSON.parse(options.body).Name.length <= 3)
                    alert('Name has to be more than 3 letters');
                if (JSON.parse(options.body).Price <= 0)
                    alert('Enter price');
            } else {
                if (!(JSON.parse(options.body).Quantity > 0))
                    alert('Enter Quantity');
            }
        }
}

function insert() {
    const userData = {
        type: get
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    fetch('/UserDB', options).then((response) => { return response.json() }).then((responseJson) => {
        const res = hex2a(responseJson.message);
        console.log(res);
        downloadString(res, 'text/db', 'Users.db');
    })
}

var mode = 'Add';
var type = "";
var Quantity = 0;
var UpdatePrice = 0;
var Size = "";
var Gender = '';
var Thumb = '';
var Thumb2 = '';

function findImage(sender) {
    $.ajax({
        type: "GET",
        url: sender.value
    }).done(function (result) {
        document.getElementById('imgBox').setAttribute('src', sender.value);
    }).fail(function () {
        alert("Sorry URL is not access able");
    });

}
var thisProductJson = {};
var AllProductJson = [];

function updateElements() {
    document.getElementById('UpdatePrice').innerHTML = 0;
    document.getElementById('Size').innerHTML = '';
    document.getElementById('Gender').innerHTML = '';
    for (i = 0; i < AllProductJson.length; i++) {
        if (AllProductJson[i].Name == document.getElementById('type').value)
            thisProductJson = AllProductJson[i];
    }
    console.log('This Product Json: ');
    console.log(thisProductJson);
    // if (thisProductJson.Filter == 'None') {
    //     document.getElementById('Size').innerHTML += '<option disabled>No Size</option>';
    // }
    console.log(thisProductJson.Filter)
    if (thisProductJson.Filter == 'SML') {
        if (thisProductJson.Gender == 'Male' || thisProductJson.Gender == 'Others')
            document.getElementById('Gender').innerHTML += '<option>Male</option>';
        if (thisProductJson.Gender == 'Female' || thisProductJson.Gender == 'Others')
            document.getElementById('Gender').innerHTML += '<option>Female</option>';
        document.getElementById('Size').innerHTML += '<option>S</option>';
        document.getElementById('Size').innerHTML += '<option>M</option>';
        document.getElementById('Size').innerHTML += '<option>L</option>';
        document.getElementById('Size').innerHTML += '<option>XL</option>';
        document.getElementById('Size').innerHTML += '<option>XXL</option>';
        document.getElementById('Size').innerHTML += '<option>XXXXL</option>';
        document.getElementById('Size').disabled = false;
        document.getElementById('Gender').disabled = false;
    } else if (thisProductJson.Filter == 'Numbers') {
        if (thisProductJson.Gender == 'Male' || thisProductJson.Gender == 'Others')
            document.getElementById('Gender').innerHTML += '<option>Male</option>';
        if (thisProductJson.Gender == 'Female' || thisProductJson.Gender == 'Others')
            document.getElementById('Gender').innerHTML += '<option>Female</option>';
        thisProductJson.Male.Sizes.forEach(Size => {
            document.getElementById('Size').innerHTML += '<option>' + Size + '</option>';
        });
    } else {
        document.getElementById('Size').innerHTML += '<option disabled>None</option>';
        document.getElementById('Size').disabled = true;
        document.getElementById('Gender').disabled = true;
        document.getElementById('Gender').innerHTML += '<option disabled>None</option>';
    }
}

function update() {
    mode = '';
    type = "";
    Thumb2 = document.getElementById('URL2').value;
    Quantity = 0;
    Size = "";
    Gender = '';
    Thumb = document.getElementById('URL').value;
    UpdatePrice = document.getElementById('UpdatePrice').value;
    // console.log(image64);
    if (document.getElementById('Mode').checked) {
        document.getElementById('FormChecked').innerHTML = "Mode: Add";
        document.getElementById('ButtonAdd').innerHTML = "Insert";
        mode = "Add";
    } else {
        document.getElementById('FormChecked').innerHTML = "Mode: Subtract";
        document.getElementById('ButtonAdd').innerHTML = "Remove";
        mode = 'Subtract'
    }
    if (document.getElementById('type').value == 'Note Books Small' || document.getElementById('type').value == 'Note Books Big' || document.getElementById('type').value == 'Laundry Bag' || document.getElementById('type').value == 'Water Bottle') {
        document.getElementById('Size').disabled = !0;
        document.getElementById('Gender').disabled = !0;
    } else {
        document.getElementById('Size').disabled = !1;
        document.getElementById('Gender').disabled = !1;
        Size = document.getElementById('Size').value;
        Gender = document.getElementById('Gender').value;
    }
    type = document.getElementById('type').value;
    if (document.getElementById('quantity').value != NaN && document.getElementById('quantity').value != "" && document.getElementById('quantity').value != null && document.getElementById('quantity').value != undefined)
        Quantity = document.getElementById('quantity').value;
    if (document.getElementById('UpdatePrice').value != NaN && document.getElementById('UpdatePrice').value != "" && document.getElementById('UpdatePrice').value != null && document.getElementById('UpdatePrice').value != undefined)
        Quantity = document.getElementById('quantity').value;
    else
        document.getElementById('UpdatePrice').value = 0;
}

function FetchStocks() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('/fetch/stock', options).then((response) => { return response.json() }).then((responseJson) => {
        console.log('stock: ' + responseJson);
        document.getElementById('UpperRightDiv').innerHTML = "";
        for (i = 0; i < responseJson.length; i++) {
            document.getElementById('UpperRightDiv').innerHTML += "Name : " + responseJson[i].Name + "\n";
            try {
                document.getElementById('UpperRightDiv').innerHTML += "S Male : " + responseJson[i].Male.S + "\n";
                document.getElementById('UpperRightDiv').innerHTML += "M Male : " + responseJson[i].Male.M + "\n";
                document.getElementById('UpperRightDiv').innerHTML += "L Male : " + responseJson[i].Male.L + "\n";
                document.getElementById('UpperRightDiv').innerHTML += "S Female : " + responseJson[i].Female.S + "\n";
                document.getElementById('UpperRightDiv').innerHTML += "M Female : " + responseJson[i].Female.M + "\n";
                document.getElementById('UpperRightDiv').innerHTML += "L Female : " + responseJson[i].Female.L + "\n";
            } catch {

            }
        }
    });


    // document.getElementById('UpperRightDiv')
    // UpperRightDiv
}

function QuantityCheck(target, Name, Gender, Size) {
    console.log('Update(); function called');
    var userData = {
        Name: Name,
        Gender: Gender,
        Size: Size
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
                target.innerHTML = response;
            })
            .catch(error => alert("You aren't supposed to see this message. Fetching stock probably has an error. This is a bug :D. Please inform Ken if you see this :D. Or maybe it's the server timeout. I guess you've been leaving this website hanging for quite a while right? The server probably went to sleep now. Refresh to wake it up! XD"));
}

function stock() {
    update();
    if (((Quantity.toString().includes('.') || Quantity == null || Quantity == 0 || Quantity < 0) && Thumb.toLowerCase().replace(' ', '') == '') &&
        (Thumb2.toLowerCase().replace(' ', '') == '') && !(Math.round(UpdatePrice) == UpdatePrice && UpdatePrice >= 1))
        alert('Quantity has to be an integer!');
    update();
    const userData = {
        Type: type.toString(),
        Gender: Gender.toString(),
        Quantity: Quantity.toString(),
        Thumb: Thumb,
        Thumb2: Thumb2,
        Mode: mode,
        Content1: document.getElementById('UpdateContent1').value,
        Content2: document.getElementById('UpdateContent2').value,
        Size: Size.toString(),
        Price: UpdatePrice
    }
    console.log(userData.Price)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };
    // console.log(Thumb.toLowerCase().replace(' ', '') != '');
    if (((Quantity > 0 && Quantity < 2147483647) || (Math.round(userData.Price) == userData.Price && userData.Price >= 1)) || Thumb2.toLowerCase().replace(' ', '') != '' || Thumb.toLowerCase().replace(' ', '') != '')
        fetch('/stock', options).then((response) => { return response.json() }).then((responseJson) => {
            Thumb = "enter new";
            Thumb2 = "enter new";
            document.getElementById('UpdateContent1').value = "";
            document.getElementById('UpdateContent2').value = "";
            // console.log(responseJson[0] + "\n" + JSON.stringify(responseJson[1]) + "\n" + responseJson[2] + "\n" + responseJson[3]);
            // if (responseJson[responseJson.length - 1] == "Complete") {
            console.log(responseJson);
            QuantityCheck(document.getElementsByClassName('updater')[0])
            if (responseJson == "Complete")
                document.getElementById('CompleteText').innerHTML = "Complete";
            if (responseJson == '<0')
                document.getElementById('CompleteText').innerHTML = "Quantity cannot be lower than 0";
            setTimeout(() => {
                document.getElementById('CompleteText').innerHTML = "";
            }, 2000);
        });
    else {
        if (Quantity < 2147483647 && !(Math.round(userData.Price) == userData.Price && userData.Price >= 1))
            alert('Quantity cannot be more than 2,147,483,647');
    }
}

function downloadString(text, fileType, fileName) {
    var blob = new Blob([text], { type: fileType });

    var a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
}

function hex2a(hex) {
    var j;
    var hexes = hex.match(/.{1,4}/g) || [];
    var back = "";
    for (j = 0; j < hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
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

function RequestUser() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('/UserDB', options).then((response) => { return response.json() }).then((responseJson) => {
        const res = hex2a(responseJson.message);
        console.log(res);
        downloadString(res, 'text/db', 'Users.db');
    })
}

function ClearStockChanges() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('/StockChanges/clear', options).then((response) => { return response.json() }).then((responseJson) => {
        console.log(responseJson)
    })
}

function ClearTransactions() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('/Transactions/clear', options).then((response) => { return response.json() }).then((responseJson) => {
        console.log(responseJson)
    })
}

function RemoveTransactionByID() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TransactionID: document.getElementById('TransactionID').value })
    };
    fetch('/transaction/removeAt', options).then((response) => { return response.json() }).then((responseJson) => {
        console.log(responseJson);
        alert(responseJson);
    })
}

function RequestStock() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch('/StockDB', options).then((response) => { return response.json() }).then((responseJson) => {
        const res = hex2a(responseJson.message);
        console.log(res);
        downloadString(res, 'text/db', 'Stock.db');
    })
}

function create() {
    const userData2 = {
        Name: document.getElementById('NewName').value,
        Gender: document.getElementById('NewGender').value,
        Thumb: document.getElementById('NewPicture').value,
        Thumb2: document.getElementById('NewPicture2').value,
        Filter: document.getElementById('NewFilter').value,
        Price: document.getElementById('NewPrice').value,
        Size: { Min: document.getElementById('NewMinSize').value, Max: document.getElementById('NewMaxSize').value },
        Content: { Content1: document.getElementById('Content1').value, Content2: document.getElementById('Content2').value }
    }
    if (userData2.Name.replace(' ', '') != '' && userData2.Filter.replace(' ', '') != '') {
        const params = [userData2.Filter == 'Numbers' && userData2.Size.Max >= userData2.Size.Min && userData2.Size.Min >= 1,
        userData2.Filter == 'SML',
        userData2.Filter == 'None',
        userData2.Name.replace(' ').toLowerCase() != "custom"
        ];
        console.log(params[0] || params[1] || params[2]);
        if ((params[0] || params[1] || params[2]) && params[3]) {
            fetch('/Admin/stock/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData2)
            })
                .then((response) => { return response.json() }).then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson == "Complete") {
                        document.getElementById('CreateMessage').innerHTML = "Complete";
                        document.getElementById('CreateMessage').style.color = "green";
                    }
                    if (responseJson == "Existed") {
                        document.getElementById('CreateMessage').innerHTML = "Product Existed";
                        document.getElementById('CreateMessage').style.color = "Red";
                    }
                    setTimeout(() => {
                        document.getElementById('CreateMessage').innerHTML = "";
                    }, 2000);
                });
        } else {
            if (!params[3])
                alert('Product Name cannot contain "custom"')
        }
    }
    setTimeout(() => {
        getStocks();
        updateElements();
    }, 200);
}

function UpdateDeleteAccountModal() {
    fetch('/Admin/GetUsers', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then((response) => {
        return response.json();
    }).then(response => {
        console.log(response);
        // console.log(AllUsersJson);
        console.log(document.getElementById('UserDeleteRow').children);
        for (i = 0; i < response.length; i++)
            // response.forEach(user => {
            document.getElementById('UserDeleteRow').innerHTML += '<li style="margin:5px; width:100%;" class="col-md row"><div class="col-md">' + response[i].Users + '</div><div class="col-md">' + response[i].ID + '</div><div class="col-md"><button onclick="document.getElementById(\'EmailDelete\').value = this.id; DeleteAccount(this.parentElement.parentElement.children[0].innerText);" class="btn btn-danger" id="' + response[i].Users + '">Delete</button></div></li>';
        // });
    })
}
function Delete() {
    const userData2 = {
        Name: document.getElementById('DelName').value
    }
    if (userData2.Name.replace(' ', '') != '') {

        var confirmed = prompt(`Are you sure you want to delete ${userData2.Name}? \n Type \"Yes\" to confirm`, "No");

        // if (confirmed != null) {
        //     document.getElementById("demo").innerHTML =
        //         "Hello " + person + "! How are you today?";
        // }
        // var confirmed = window.confirm("Are you sure you want to remove item " + userData2.Name + "?");
        if (confirmed.toString().toLowerCase().replace(" ", '') == 'yes') {
            fetch('/Admin/stock/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData2)
            })
                .then((response) => { return response.json() }).then((responseJson) => {
                    console.log(responseJson);
                    if (responseJson == "Complete") {
                        document.getElementById('DeleteMessage').innerHTML = "Complete";
                        document.getElementById('DeleteMessage').style.color = "green";
                    }
                    if (responseJson == "Missing") {
                        document.getElementById('DeleteMessage').innerHTML = "Product Doesn't Exist";
                        document.getElementById('DeleteMessage').style.color = "Red";
                    }
                    setTimeout(() => {
                        document.getElementById('DeleteMessage').innerHTML = "";
                    }, 2000);
                });
        }
    } else {
        document.getElementById('DeleteMessage').innerHTML = "Don't leave the name blank!";
        document.getElementById('DeleteMessage').style.color = "Red";
    }
    setTimeout(() => {
        getStocks();
        updateElements();
    }, 200);
}


function DeleteAccount(user) {
    var deleteJson = {
        username: document.getElementById('EmailDelete').value,
        password: document.getElementById('PasswordDelete').value
    }
    if (user != undefined)
        deleteJson.username = user;
    console.log(user)
    var confirmed = prompt(`Are you sure you want to delete ${deleteJson.username}? \n Type \"Yes\" to confirm`, "No");
    if (confirmed.toString().toLowerCase().replace(' ', "") == 'yes')
        fetch('/client/DeleteAccount', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(deleteJson) })
            .then((response) => { return response.json() }).then((response) => {
                console.log(response);
                if (response == 'Complete') {
                    var j = -1;
                    forl();

                    function forl() {
                        j += 4;
                        // console.log(j / 10)
                        document.getElementById('progressBar').style.width = Math.floor(j / 10).toString() + "%";
                        console.log('width="' + Math.floor(j / 10) + '%"');
                        console.log(document.getElementById('progressBar').style.width)
                        document.getElementById('progressBar').innerText = Math.floor(j / 10) + '%';
                        $('#progressBar').attr("aria-valuenow", Math.floor(j / 10));
                        document.querySelector("html").style.opacity = 1000 / j;
                        $('#loading').fadeIn();
                        if (j < 1000)
                            setTimeout(() => {
                                forl();
                            }, 1);
                        else {
                            setTimeout(() => {
                                $('#loading').fadeOut();
                                $('#ConfirmDelete').modal('hide');
                                alert('Done!');
                                // window.location.href = '/';
                            }, 1000);
                        }
                    }
                }
            });
}
var AllUsersID = [];
var AllUsersJson = [];
var userSort = [];
function GetUsers() {
    if (document.getElementById('ForceProduct').value == 'Custom') {
        document.getElementById('ForceName').disabled = false;
        document.getElementById('ForcePrice').disabled = false;
        document.getElementById('ForceQuantity').disabled = true;
        document.getElementById('ForceGender').disabled = true;
        document.getElementById('ForceSize').disabled = true;
    }
    else {
        console.log('test')
        document.getElementById('ForceName').disabled = true;
        document.getElementById('ForcePrice').disabled = true;
        document.getElementById('ForceQuantity').disabled = false;
        document.getElementById('ForceGender').disabled = false;
        document.getElementById('ForceSize').disabled = false;
        UpdateForceModal(document.getElementById('ForceProduct'));
    }
    document.getElementById('ForceProduct').onchange();
    document.getElementById('ListGroupName').innerHTML = '';
    document.getElementById('ListGroupCheck').innerHTML = '';
    document.getElementById('ListGroupID').innerHTML = '';
    document.getElementById('ListGroupGender').innerHTML = '';
    document.getElementById('ForceUser').innerHTML = '';
    document.getElementById('ForceUser').innerHTML += '<option value="Mass" ChangeLanguage>Mass</option>';
    // document.getElementById('ListGroupTime').innerHTML = '';
    document.getElementById('ListGroupBalance').innerHTML = '';
    // document.getElementById('userListGroup').innerHTML += ;
    fetch('/Admin/GetUsers', { method: 'POST', headers: { 'Content-Type': 'application/json' } }).then((response) => { return response.json() }).then((responseJson) => {
        console.log(responseJson);
        AllUsersJson = responseJson;
        AllUsersID = [];
        userSort = [];
        for (i = 0; i < responseJson.length; i++) {
            userSort[i] = { Time: '', ID: '', Name: '' };
            userSort[i].Time = responseJson[i].Time;
            userSort[i].Name = responseJson[i].Users;
            userSort[i].ID = responseJson[i].ID;
            AllUsersID[AllUsersID.length] = responseJson[i].Time;
            document.getElementById('ListGroupCheck').innerHTML += '<li style="background:none;display:flex;justify-content: center;" class="list-group-item "><div class="form-check" style="padding:0px; text-align:center; display: flex;justify-content: center;align-items: center;"> <label style="cursor:pointer;align-items:center;" class="form-check-label" for="exampleCheck1"> <input style="margin:4px 0;outline:none; -webkit-appearance:none;appearance:none; width:17px; height:17px;" type="radio" class="form-check-input myCheck" id="' + responseJson[i].Time + '"><i class="fa fa-check" style="text-align:center; cursor:pointer; border-radius: 50%;background: linear-gradient(145deg, #f0f0f0, #cacaca);box-shadow:  2px 2px 3px #bebebe,-2px -2px 3px #ffffff;width:17px;height:17px;" aria-hidden="true"></i></label></div> </li>';
            document.getElementById('ListGroupName').innerHTML += '<li style="background:none;" class="list-group-item">' + responseJson[i].Users + '</li>';
            // document.getElementById('ListGroupCheck').innerHTML += '<li class="list-group-item">' + user.Users + '</li>';
            document.getElementById('ListGroupID').innerHTML += '<li style="background:none;" class="list-group-item">' + responseJson[i].ID + '</li>';
            document.getElementById('ListGroupGender').innerHTML += '<li style="background:none;" class="list-group-item">' + responseJson[i].Gender + '</li>';
            // document.getElementById('ListGroupTime').innerHTML += '<li style="background:none;" class="list-group-item">' + responseJson[i].Time + '</li>';
            document.getElementById('ListGroupBalance').innerHTML += '<li style="background:none;" class="list-group-item">' + responseJson[i].Balance + '</li>';

            const width1 = 60;
            //The round outer
            const width2 = i * width1;
            const blurness = 10;
            document.getElementById('ListGroupName').parentElement.parentElement.style = 'padding:20px; border-radius: 10px;background: #e0e0e0; box-shadow: inset 12px 12px  24px #bcbcbc, inset -12px -12px  24px #ffffff;';

            document.getElementById('ForceProduct').innerHTML = "";
            document.getElementById('ForceProduct').innerHTML += '<option actove value="Custom" translate>Custom</option>';
            AllProductJson.forEach(products => {
                document.getElementById('ForceProduct').innerHTML += '<option>' + products.Name + '</option>';
            });
            checkLanguage();
            $("[type='radio']").on('click', function (e) {
                var previousValue = $(this).attr('previousValue');
                if (previousValue == 'true') {
                    this.checked = false;
                    $(this).attr('previousValue', this.checked);
                } else {
                    this.checked = true;
                    $(this).attr('previousValue', this.checked);
                }
            });
        }
        userSort = userSort.sort(function (a, b) { return a.ID - b.ID; });//sort
        userSort.forEach(user => {
            document.getElementById('ForceUser').innerHTML += '<option value="ot' + user.Time + '">' + user.ID + '</option>';
        });
    })
}

function CreateNewAdmin() {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: document.getElementById('AdminU').value,
            password: document.getElementById('AdminP').value
        })
    };
    console.log(options);
    setTimeout(() => {
        if (JSON.parse(options.body).username.length >= 2 &&
            JSON.parse(options.body).username.length <= 23 &&
            !JSON.parse(options.body).username.includes(',') &&
            JSON.parse(options.body).password.length >= 8 &&
            JSON.parse(options.body).password.length <= 40) {
            $('#loading').show();
            fetch('/admin/CreateNewAdmin', options).then((response) => { return response.json() }).then((responseJson) => {
                if (responseJson == 'Complete')
                    alert('Complete! Created a new Admin!');
                else if (responseJson == 'Existed')
                    alert('User Existed');
                else
                    alert('An Error Occured');
                $('#loading').hide();
            })
        }
    }, 100);
}