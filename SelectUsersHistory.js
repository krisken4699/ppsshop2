const { json } = require('express');
const fs = require('fs');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'UsersHistory.db' });
const { Client, Pool } = require('pg');

process.env.DATABASE_URL = "postgres://bockzkwowsolli:d3ca4fdba648d92051d3428cbeb9c64c31410c4f1efec10b3096f8c17771d439@ec2-52-208-175-161.eu-west-1.compute.amazonaws.com:5432/d5e8tlt6gnpjqu";
console.log('DatabaseURL: ' + process.env.DATABASE_URL)
const client = new Client(
    {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

try {
    client.connect();
} catch (error) {
    // console.log(error);
}
client.query('SELECT "Users" FROM public."Users";')
    .then(res => {
        try {
            fs.writeFile('./Users.db', res.rows[res.rows.length - 1].Users, function (err) {
                console.log("Users File was updated!");
            });
            var temp = "";
            // console.log(res.rows);
            for (let i = 0; i < res.rows.length; i++) {
                console.log(i + ': ' + JSON.stringify(res.rows[i]));
                temp += i + ': ' +  res.rows[i].Users + '\n'
            }
            fs.writeFile('./UsersHistory.db', temp, function (err) {
                console.log('Done')
            })
        } catch (error) {
            console.log(error);
        }
    })
    .catch(e => console.error(e.stack))