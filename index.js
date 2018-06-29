const Discord = require("discord.js");
const config = require("./config.json")
bot = new Discord.Client();

bot.on("ready", async() =>{
  console.log(`${bot.user.username} готов!`);
});

bot.on("message", async message =>{
if(message.author.bot) return;

let messageArray = message.content.split(" ");
let cmd = messageArray[0];
let args = messageArray[1].slice(1);

if(cmd === `${config.prefix}ping`){
  message.reply("pong");
}
});

bot.login(config.token);
