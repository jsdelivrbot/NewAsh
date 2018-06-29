const Discord = require("discord.js");
const config = require("./config.json")
bot = new Discord.Client();

bot.on("ready", async() =>{
  console.log(`${bot.user.username} готов!`);
});

bot.on("message", async message =>{
if(message.author.bot) return;
var msg = message.content.toLowerCase();
if(msg.indexOf(config.prefix)!== 0) return;
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(command === `ping`){
  message.reply("pong");
}
});

bot.login(config.token);
