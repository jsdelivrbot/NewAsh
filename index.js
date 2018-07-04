const Discord = require("discord.js");
const config = require("./config.json")
const fs = require('fs');
const tool = require("./tools/tools");
var mysql = require('mysql');
bot = new Discord.Client();
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) =>{
  if(err) console.log(err);

  let jsfile = files.filter(f=> f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded`);
    bot.commands.set(props.help.name, props);
  });
})
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
bot.on("ready", async() =>{
  console.log(`${bot.user.username} готов!`);
});

bot.on("message", async message =>{
  if(message.author.bot) return;
  let prefix = config.prefix;
  let msg = message.content.toLowerCase();
  if(msg.indexOf(prefix)!== 0) return;


  var args = msg.slice(prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  fs.readdir("./commands/", (err, files) =>{
    if(err) console.log(err);
    let jsfile = files.filter(f=> f.split(".").pop() === "js");
    var commandfile;
    jsfile.forEach((f, i) =>{
      if(tool.leven(command,f) <= 1){
      commandfile = bot.commands.get(f);}
    });
    if(commandfile) commandfile.run(bot,message,args,con);
  })
});
bot.login(config.token);
