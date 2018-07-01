const Discord = require("discord.js");
const tool = require("../tools/tools.js");

module.exports.run = async (bot, message, args, con) => {
    var cArray = args.join(" ").split(" ");
    if(cArray.length === 10){
     cArray = tool.shuffle(cArray);
     message.channel.send("Команда для 5х5 #1: ```"+cArray[0]+","+cArray[1]+","+cArray[2]+","+cArray[3]+","+cArray[4]+"```Команда для 5х5 #2: ```"+cArray[5]+","+cArray[6]+","+cArray[7]+","+cArray[8]+","+cArray[9]+"```");
    }
    else if(cArray.length === 8) {
      cArray = tool.shuffle(cArray);
     message.channel.send("Команда для 4х4 #1: ```"+cArray[0]+","+cArray[1]+","+cArray[2]+","+cArray[3]+"```Команда для 4х4 #2: ```"+cArray[4]+","+cArray[5]+","+cArray[6]+","+cArray[7]+"```");
    }
    else if(cArray.length === 6) {
      cArray = tool.shuffle(cArray);
     message.channel.send("Команда для 3х3 #1: ```"+cArray[0]+","+cArray[1]+","+cArray[2]+"```Команда для 3х3 #2: ```"+cArray[3]+","+cArray[4]+","+cArray[5]+"```");
    }
    else
    {
      message.reply("неправильное число участников. Разрешенные значения: 10, 8, 6.");
    }
}

module.exports.help = {
    name: "randomteam"
}