const Discord = require("discord.js");
const fs = require('fs');
module.exports.run = async (bot, message, args, con) => {
    fs.readdir("./commands/", (err, files) =>{
        if(err) console.log(err);
      
        let jsfile = files.filter(f=> f.split(".").pop() === "js");
        if(jsfile.length <= 0){
          console.log("Couldn't find commands");
          return;
        }
        let profileEmbed = new Discord.RichEmbed()
        .setTitle('test help')
        .setColor("#15f153");
        jsfile.forEach((f, i) =>{
          let props = require(`./${f}`);
          
            profileEmbed.addField(props.help.name, props.help.usage);
          
        });
        message.channel.send(profileEmbed);
      });
}

module.exports.help = {
    name: "помощь",
    description: "empty",
    hide: "0",
    usage: "эш помощь"
}