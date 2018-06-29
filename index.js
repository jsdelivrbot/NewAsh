const Discord = require("discord.js");
bot = new Discord.Client();

bot.on("ready", async() =>{
  console.log(`${bot.user.username} готов!`);
});


bot.login(process.env.TOKEN);