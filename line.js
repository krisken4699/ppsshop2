try {
    const lineAPI = require('@line/bot-sdk');
    const bodyParser = require('body-parser');
    const fetch = require('node-fetch');
    const request = require('request');
    const fs = require('fs');

    const client = new lineAPI.Client({
        channelAccessToken: '2NSGFeBysQVmRB1mwROzCqX+aADUk9oz6sC+gPLf/Evr9vBgxkgMUrJBWGH5JM/Uag/f/Hxp+UT6cU7RCNKwneVQU0pF3rbhbgvl6TYqs1KqjkBxTCP1eIb2O8zPWQzFSniAFRXFiw0vXZu5S/3iqgdB04t89/1O/w1cDnyilFU='
    });
    var temp = "data:image/png;base64,";

    function getImage(id) {
        client.getMessageContent(id)
            .then((stream) => {
                // console.log(stream);
                stream.on('data', (chunk) => {
                    temp += chunk.toString('base64');
                });
                stream.on('error', (err) => {
                    // error handling
                });
                stream.on('end', () => {
                    setTimeout(() => {
                        // console.log(temp);
                        temp = temp.replace(/^data:image\/\w+;base64,/, "");
                        fs.writeFile('./image.png', temp, 'base64', function() {

                        })
                        fs.writeFile('./image.jpeg', temp, 'base64', function() {

                        })
                        fs.writeFile('./image.gif', temp, 'base64', function() {

                        })
                        fs.writeFile('./image.txt', temp, 'utf8', function() {

                        })
                        fs.readFile('./Yuu Thumbnail.jpg', 'base64', function(err, data) {
                            // console.log(data);
                            fs.writeFile('./image2.txt', data, 'utf8', function() {

                            })
                        })
                    }, 100);
                })
            });
    }
    // getImage('13392662558313');

    function reply(reply_token, ReplyMessage, type) {
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {2NSGFeBysQVmRB1mwROzCqX+aADUk9oz6sC+gPLf/Evr9vBgxkgMUrJBWGH5JM/Uag/f/Hxp+UT6cU7RCNKwneVQU0pF3rbhbgvl6TYqs1KqjkBxTCP1eIb2O8zPWQzFSniAFRXFiw0vXZu5S/3iqgdB04t89/1O/w1cDnyilFU=}'
        }
        var temp = {
            replyToken: reply_token,
            messages: []
        }
        for (i = 0; i < ReplyMessage.length; i++) {
            temp.messages[i] = { type: type, text: ReplyMessage[i] };
        }
        let body = JSON.stringify(temp);
        request.post({
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headers,
            body: body
        }, (err, res, body) => {
            try {
                console.log('status = ' + res.statusCode);
            } catch (error) {}
        });
    }

    function callCommand(command, params, str2) {
        // console.log('>>>params: ' + params + '\t' + 'command: ' + command + '\t' + 'str2: ' + str2);
        var ReplyMessage = [];
        if (command == 'echo') { //command == echo
            if (enabledCommands.echo != false) { //if not disabled
                ReplyMessage[0] = str2.substring(4 + 2, str2.length);
            } else { //if disabled > do nothing
                // ReplyMessage[0] = 'Command was disabled';
            }
        } else if (command == 'SetCommand'.toLowerCase()) {
            if (params[0] == 'echo') {
                if (params[1] == '-f') {
                    enabledCommands.echo = false;
                    ReplyMessage[0] = "Set Command 'echo' to false";
                } else if (params[1] == '-t') {
                    enabledCommands.echo = true;
                    ReplyMessage[0] = "Set Command 'echo' to true";
                } else { //params[1] isn't -f or -t
                    ReplyMessage[0] = 'Wrong syntax!'
                }
            }
        } else { //No command name matched
            ReplyMessage[0] = "Command doesn't exist!";
        }
        console.log('ReplyMessage = ' + ReplyMessage);
        line.reply(reply_token, ReplyMessage, 'text');
        // main();
    }

    function GetUserProfile(id) {
        return new Promise(function(resolve) {
            var temp = {};
            client.getProfile(id)
                //   console.log(profile.displayName);
                //   console.log(profile.userId);
                //   console.log(profile.pictureUrl);
                //   console.log(profile.statusMessage);
                .then((profile) => {
                    temp = profile;
                    // console.log(profile.userId);
                    resolve(temp);
                })
                .catch((err) => {
                    if (err)
                        console.log('Line: Failed to get User Profile.')
                });
        });
    }
    async function main() {
        // const str = await readline.read()
        const str = ClientMessage;
        var str2 = str;
        while (str2.substring(0, 1) == ' ') {
            str2 = str2.substring(1, str2.length);
        } //remove first spacebars.
        if (str2.substring(0, 1).includes('!') && str2.substring(1, 2) != ' ' && str.includes(' ')) {
            const command = str2.substring(1, str2.indexOf(' '));
            var params = [];
            var temp = str2.substring(command.length + 2, str2.length); //The params string behind the command
            // console.log(temp);
            while (temp.includes(' ')) {
                // console.log('Target: ' + temp.substring(0, temp.indexOf(' ')));
                if (temp.substring(0, temp.indexOf(' ')) != '')
                    params[params.length] = temp.substring(0, temp.indexOf(' '));

                temp = temp.substring(temp.indexOf(' ') + 1, temp.length);
                // console.log('Temp After: ' + temp);
            }
            if (!params.includes(' ') && temp.substring(0, temp.length) != '')
                params[params.length] = temp.substring(0, temp.length); //extract the params string into array of params
            callCommand(command, params, str2);
        } else {
            console.log('>>>\t|\t|\t|\t|\t|\t|\t|\t|\t|\t|\t\t|\t|\t|\t|\t|\t|\t|\t|\t|');
            console.log('>>>\t> missing "!"\t> Space behind "!" and the command\t> " " seperator missing, please include params\t > Command does not exist!');
            // main();
        }
    }

    function PushMessage(type, text, target) {
        const message = {
            type: type
        };
        if (type == 'text')
            message.text = text;
        if (type == 'image') {
            getImage(text);
            message.previewImageUrl = 'https://panyaprateepshop.herokuapp.com/line/image';
            message.originalContentUrl = 'https://panyaprateepshop.herokuapp.com/line/image';
        }
        setTimeout(() => {
            client.pushMessage(target, message)
                .catch((err) => {
                    if (err)
                        console.log('Line: Push Failed');
                });

        }, 100);
    }
    module.exports.PushMessage = function(type, text, target) {
        return PushMessage(type, text, target);
    }
    module.exports.callCommand = function(command, params, str2) {
        return callCommand(command, params, str2);
    }
    module.exports.reply = function(replyToken, ReplyMessage, type) {
        return reply(replyToken, ReplyMessage, type);
    }
    module.exports.main = function() {
        return main();
    }
    module.exports.GetUserProfile = function(id) {
        return GetUserProfile(id);
    }
} catch (error) {
    console.log(error)
}