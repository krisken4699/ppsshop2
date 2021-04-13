if (!window.location.href.includes('127') && !window.location.href.includes('https://') && !window.location.href.includes('localhost:3000') && !window.location.href.includes('192.168'))
    window.location.href = "https://" + window.location.href.substring(7, window.location.href.length);
console.log(window.location.href);
var emailAvailable = false;
var passwordAvailable = false;
var UsernameAvailable = false;
var IDAvailable = false;
function SendHashed() {
    UsernameAvailable = ValidateUsername();
    passwordAvailable = ValidatePassword();
    emailAvailable = ValidateEmail(document.getElementById('email').value.toString());
    if (emailAvailable && passwordAvailable && UsernameAvailable) {
        // if(document.getElementById('Username').value.substring(document.getElementById('Username').value.length - 1))
        const userData = {
            'username': document.getElementById('Username').value,
            'password': encrypted(document.getElementById('Password').value),
            "Gender": document.getElementById('Gender').value.toString(),
            'ID': document.getElementById('IDNumber').value,
            'email': document.getElementById('email').value
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };
        console.log(options.body);
        // console.log(encrypted(document.getElementById('password').value));
        // console.log(encrypted(document.getElementById('password').value))
        // console.log(document.getElementById('password').value)
        fetch('/register', options).then((response) => { return response.json() }).then((responseJson) => {
            console.log(responseJson)
            if (responseJson == "success") {
                window.location = "/register/success";
            }
            if (responseJson == "Existed") {
                document.getElementById('message').innerHTML = "User Exists!"
                setTimeout(() => {
                    document.getElementById('message').innerHTML = ""
                }, 2000);
            }
        });
    }
    else
        console.log("Failed to Send");
}

function ValidateUsername() {
    if (document.getElementById('Username').value.length < 2 || document.getElementById('Username').value.length > 80) {
        // alert('The username has to be between 2 to 80 characters long.');
        return false;
    }
    else
        return true;
}

function ValidatePassword() {
    if (document.getElementById('Password').value.length < 8 || document.getElementById('Password').value.length > 80 || (document.getElementById('ConfirmPassword').value != document.getElementById('Password').value)) {
        return false;
    }
    else
        return true;
}

function ValidateID() {
    if (document.getElementById('IDNumber').value < 92 || document.getElementById('IDNumber').value > 9999) {
        // alert('Invalid ID');
        // document.getElementById('IDError').innerHTML = 'Invalid ID!';
        // document.getElementById('IDError').style.color = 'red';
        // setTimeout(() => {
        // document.getElementById('IDError').innerHTML = '';
        // }, 1000);
        return false;
    }
    else
        return true;
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

function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    // alert("Please enter your email correctly!");
    // document.getElementById('EmailError').style.color = 'red';
    // setTimeout(() => {
    //     document.getElementById('EmailError').innerHTML = '';
    //     }, 1000);
    return (false)
}
function ValidateGender() {
    if (document.getElementById('Gender').value != '-') {
        return (true)
    }
    // alert("Please enter your email correctly!");
    return (false)
}
window.addEventListener('DOMContentLoaded', (event) => {
    Loading = false;
    console.log('Loaded')
})