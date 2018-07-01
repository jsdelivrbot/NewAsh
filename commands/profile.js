const Discord = require("discord.js");
var mysql = require('mysql');



module.exports.run = async (bot, message, args, con) => {
    con.query('SELECT * FROM users WHERE uid = ?', message.author.id, function(error, result, fields){
        var row = result[0];
        if(row.duel_win > 0 || row.duel_lose > 0){ var perc = (row.duel_win/(row.duel_win+row.duel_lose)).toFixed(1); }
        else { var perc = 0; }
        if(row.xp%100 < 10) var le = ''+row.xp%100;else var le = row.xp%100;
        let profileEmbed = new Discord.RichEmbed()
        .setDescription(row.xp+"/"+(Math.floor(row.xp/100)+1)+'00 XP')
        .setAuthor(message.author.username)
        .setTitle("LVL "+Math.floor(row.xp/100))
        .setThumbnail(message.author.avatarURL)
        .setColor("#15f153")
        .addField("Поинты", row.points)
        .addField("W/L", row.duel_win+'/'+row.duel_lose+' - '+perc*100+'%')
        .addField("Обо мне", row.about);
        
        message.channel.send(profileEmbed);
    });

}

module.exports.help = {
    name: "profile"
}