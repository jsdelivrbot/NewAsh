const Discord = require("discord.js");
var mysql = require('mysql');



module.exports.run = async (bot, message, args, con) => {
    con.query('SELECT * FROM users WHERE uid = ?', message.author.id, function(error, result, fields){
        message.reply(result[0].about);
    });
}

module.exports.help = {
    name: "profile"
}