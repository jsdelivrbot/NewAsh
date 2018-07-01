const Discord = require("discord.js");
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql9.freemysqlhosting.net",
  user: "sql9245488",
  password: "rnLl6FcxIE",
  database: "sql9245488"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports.run = async (bot, message, args) => {
    con.query(`SELECT * FROM users WHERE uid = ${message.author.id}`, function(error, result, fields){
        message.reply(result.about);
    });
}

module.exports.help = {
    name: "profile"
}