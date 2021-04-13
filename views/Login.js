window.addEventListener('DOMContentLoaded', (event) => {
    Loading = false;
    console.log('Loaded')
    $('#loading').hide();
})
    try {
        var passwordAvailable = false;
        var UsernameAvailable = false;
        var token = 0;


        function SendHashed() {
            UsernameAvailable = ValidateUsername();
            passwordAvailable = ValidatePassword();
            if (UsernameAvailable && passwordAvailable) {
                var userData = {
                    "username": document.getElementById('Username').value.toString(),
                    "password": encrypted(document.getElementById('Password').value.toString()),
                    "token": token,
                    // "Keep" : document.getElementById('Keep').checked
                };
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                };
                // console.log(encrypted(document.getElementById('password').value));
                // console.log(encrypted(document.getElementById('password').value))
                // console.log(document.getElementById('password').value)
                try {
                    fetch('/login', options).then((response) => { return response.json() }).then((responseJson) => {
                        console.log(responseJson)
                        if (responseJson.Success == 'Success') {
                            token = responseJson.token;
                            userData = {
                                "username": document.getElementById('Username').value.toString(),
                                "password": encrypted(document.getElementById('Password').value.toString()),
                                "token": token
                            };

                            console.log(token);
                            var urlVar = String2Hex(encodeURI(JSON.stringify(userData)));
                            console.log('UrlEncoded: ' + urlVar);
                            console.log('Host Server: ' + window.location.hostname);
                            // if (document.getElementById('Username').value.toString() == 'Admin1')
                            // this.window.location.href = '/login' + urlVar; //this is the old one na jaaaaaaaaaaaaaaaaaaaaaaaaaa
                            // else
                            this.window.location.href = "/home"
                        }
                        if (responseJson.Success == 'admin') {
                            window.location.href = '/' + document.getElementById('Username').value + encrypted(document.getElementById('Password').value);
                        }
                        if (responseJson == "User doesn't Exist!") {
                            document.getElementById('UserErr').innerHTML = "User doesn't exist!<br>";
                            setTimeout(() => {
                                document.getElementById('UserErr').innerHTML = "";
                            }, 3000);
                        }
                        if (responseJson == "Invalid password") {
                            document.getElementById('PassErr').innerHTML = "Invalid Password!<br>";
                            setTimeout(() => {
                                document.getElementById('PassErr').innerHTML = "";
                            }, 3000);
                        }
                    });
                } catch (error) {
                    document.getElementById('PassErr').innerHTML = "Internal server error - 500. Please refresh the page!";
                }


                /*fetch('/login', options).then((response) => {return response.json()}).then((responseJson)=> {
                    console.log(responseJson)
                    if(responseJson == "success"){
                        window.location = "/register/success";
                    }
                    // if(responseJson == "fail"){
                    //     window.location = "/register/success";
                    // }
                });
                */

            }
            else
                console.log("Failed to Send");
        }
        function ValidateUsername() {
            if (document.getElementById('Username').value.toString().includes(',') || document.getElementById('Username').value.length < 2 || document.getElementById('Username').value.length > 23) {
                // alert('The username has to be between 2 to 13 characters long.');
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

        function ValidatePassword() {
            if (document.getElementById('Password').value.length < 5 || document.getElementById('Password').value.length > 40) {
                // alert('The password has to be between 5 to 30 characters long.');
                return false;
            }
            else
                return true;
        }

        function String2Hex(tmp) {
            var hex;
            var result = "";
            for (i = 0; i < tmp.length; i++) {
                hex = tmp.charCodeAt(i).toString(16);
                result += ("000" + hex).slice(-4);
            }
            return result
        }
        setTimeout(() => {

            document.getElementById('Username')
                .addEventListener("keyup", function (event) {
                    event.preventDefault();
                    if (event.keyCode == 13) {
                        document.getElementById("submit").click();
                    }
                });

            document.getElementById('Password')
                .addEventListener("keyup", function (event) {
                    event.preventDefault();
                    if (event.keyCode == 13) {
                        document.getElementById("submit").click();
                    }
                });
            function loop() {
                UsernameAvailable = ValidateUsername();
                passwordAvailable = ValidatePassword();
                // IDAvailable = ValidateID();
                // emailAvailable = ValidateEmail(document.getElementById('email').value.toString());
                if (!(UsernameAvailable && passwordAvailable)) {
                    document.getElementById("submit").disabled = !0;
                    // console.log(UsernameAvailable + passwordAvailable + emailAvailable);
                }
                else {
                    document.getElementById("submit").disabled = !1;
                    // console.log(UsernameAvailable + passwordAvailable + emailAvailable);
                }

                setInterval(function () {
                    loop();
                }, 300);
            }
            loop();
        }, 100);
    } catch (error) {
        window.location.reload();
    }

// });