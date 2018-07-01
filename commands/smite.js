const Discord = require("discord.js");
const smitetrash = require("../tools/smite/smite-api");
const smite = new smitetrash("2561", "51DD07223CC04D6683A2AC6F03A56A6A");
const tool = require("../tools/tools.js");
module.exports.run = async (bot, message, args) => {
    var allq = "";
    for (var q in tool.queues()) {
        allq += q+" ";
    }
    console.log(allq);
    if(tool.queues(args[0]) === undefined){
        message.reply("Ошибка! Такой режим не найден. Доступные режимы: ```"+allq+"```");
    }
    else {
    smite.connect('PC', (err, res) =>
    {
    // Connection worked.
    if(!err)
        {
        var sessionId = res;
         smite.getQueueStats(sessionId, 'PC', encodeURIComponent(args[1]), tool.queues(args[0]), (err, res) => {

          var queue = 0;
          var wins = 0;
          var losses = 0;
          var minutes = 0;
          for (var i in res){
             queue += parseInt(res[i].Matches);
             losses += parseInt(res[i].Losses);
             wins += parseInt(res[i].Wins);
             minutes += parseInt(res[i].Minutes);
          }

          var data = res[0];
          if(data){
            let sEmbed = new Discord.RichEmbed()
            .setTitle(args.join(" "))
            .setColor("#8AFFB4")
            .setThumbnail("https://goo.gl/1yCYNT")
            .addField('Played:',queue,true)
            .addField(`Time played:`, minutes+' minutes',true)
            .addField(`W/L:`, wins+'/'+losses,true)
            .addField(`Win rate:`, ((wins/(wins+losses))*100).toFixed(1)+'%',true);
          message.channel.send(sEmbed);
        }
                        else { message.reply('Ошибка! Возможно у ``'+args[1]+'`` нет игр в режиме ``'+args[0]+'`` или его профиль скрыт.'); }
        });
          
        }
      
    });
}
}

module.exports.help = {
    name: "smite"
}