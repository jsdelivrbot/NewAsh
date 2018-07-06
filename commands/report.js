const Discord = require("discord.js");

module.exports.run = async (bot, message, args, con) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Не могу найти такого пользователя");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Жалобы")
    .setColor("#15f153")
    .addField("Жалоба на", `${rUser} ID: ${rUser.id}`)
    .addField("От пользоателя", `${message.author} ID: ${message.author.id}`)
    .addField("Канал", message.channel)
    .addField("Время", message.createdAt)
    .addField("Причина", rreason);

    let reportschannel = message.guild.channels.find(`name`, "general");
    if(!reportschannel) return message.channel.send("Не могу найти канал текстовой канал 'general'");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);
}

module.exports.help = {
    name: "репорт",
    description: "empty",
    hide: "0",
    usage: "эш репорт <@пользователь> <причина>"
}