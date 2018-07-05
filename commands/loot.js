const Discord = require("discord.js");
var mysql = require('mysql');
const tool = require("../tools/tools.js");



module.exports.run = async (bot, message, args, con) => {
    var r = tool.randomInteger(1,100);
    let sql = `SELECT *
              FROM users
              WHERE uid  = `+message.author.id;
    
   // first row only
   con.query(sql, (err, result) => {
    var row = result[0];
    if (err) {
        return console.error(err.message);
    }
    var drop = parseInt(row.last_drop);
    var points = parseInt(row.points);
    if(drop < Date.now()){
        let loot = tool.randomInteger(1,20);
        var sk = tool.declOfNum(loot, ['поинт', 'поинта', 'поинтов']);
        con.query('UPDATE users SET points = '+(loot+points)+', last_drop = '+(Date.now()+3600000)+' WHERE uid = '+message.author.id);
        let sql = `SELECT *
              FROM users
              WHERE uid  = `+message.author.id;
    
    con.query(sql, (err, result) => {
        var row = result[0];
        message.channel.send({embed: {
        color: 353535,
        title: ':small_orange_diamond: '+message.author.username,
        description: ':small_blue_diamond: Вы получаете '+loot+' '+sk+'.',
        thumbnail: {
            url: "https://cdn.glitch.com/780dc73b-ac71-4b90-b065-99793d92503e%2Fcoins-64.png?1525885472418"
        },
        footer: {
        text: 'Баланс: '+row.points
        }}});
    });                         
     }
     else {
       let minutes = Math.floor((drop-Date.now())/1000/60);
       let seconds = Math.floor((drop-Date.now())/1000 - minutes * 60);
       message.channel.send('Эта команда доступна один раз в час, попробуйте через '+minutes+' '+tool.declOfNum(minutes, ['минуту', 'минуты', 'минут'])+' и '+seconds+' '+tool.declOfNum(minutes, ['секунду.', 'секунд.', 'секунд.']));
     }
   });
    

}

module.exports.help = {
    name: "лут",
    description: "empty",
    hide: "0",
    usage: "эш лут"
}