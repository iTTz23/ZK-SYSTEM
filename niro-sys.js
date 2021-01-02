/* 
All Copyright ©️ Go's To @ニロ#3892 
Our Youtube Channel : https://youtube.com/channel/UC7QtAaqlUhBmMojJISSLJkg
*/
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://zk-system.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
const dateFormat = require("dateformat");
const client = new Discord.Client();
const ms = require("ms");
const pretty = require("pretty-ms");
const { prefix, token, devs, youtubekey, PREFIX } = require("./configuration");
client.login(token);
///////
//---------[configuration]-----------

const devs3 = [`${devs}`];
client.on("message", async message => {
  if (message.author.bot) return undefined;
  let user = message.mentions.users.first();
  let reason = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  let args = message.content.split(" ");
  if (args[0].toLowerCase() == prefix + "blacklist") {
    if (!devs3.includes(message.author.id))
      return message.channel.send("** ❌ | __ليس لديك صلاحيات مطور البوت__ **");
    message.channel.bulkDelete(1);
    let embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("** __NEW Blacklist__ **")
      .setColor("BLACK")
      .addField("**- User :**", `[${user.tag}]`)
      .addField("**- Blacklisted By :**", `[${message.author.tag}]`)
      .addField("**- Reason :**", `[${reason}]`)
      .addField("**- Blacklisted In :**", `[${message.guild.name}]`)
      .addField("**- Time & Date :**", `[${message.createdAt}]`)
      .setFooter(`${client.user.username}`)
      .setFooter(message.guild.name, message.guild.iconURL);
    let channel = message.guild.channels;
    client.channels
      .get(`log`)
      .sendEmbed(embed)
      .find("name", "blacklist-users");
    channel.send(embed);
  }
});

const db = require("quick.db");
const devs2 = [`${devs}`];
client.on("message", async message => {
  if (message.author.bot) return undefined;
  let user = message.mentions.users.first();
  let reason = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  let args = message.content.split(" ");
  if (args[0].toLowerCase() == prefix + "blacklist") {
    if (!devs2.includes(message.author.id))
      return message.channel.send("** ❌ | __ليس لديك صلاحيات مطور البوت__ **");
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    let Blacklist = await db.fetch(`Blacklist_${user.id}`);
    if (Blacklist === null) Blacklist = "off";
    message.channel.send(`**Done Blacklisted The User**`);
    db.set(`Blacklist_${user.id}`, "on");
    user.send(`⚠️${user}⚠️
**You Are Blacklisted FROM \`${client.user.username}\` 
Reason: \`${reason}\` **`);
  }
});

client.on("message", async message => {
  if (message.author.bot) return undefined;
  let user = message.mentions.users.first();
  let reason = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  let args = message.content.split(" ");
  if (args[0].toLowerCase() == prefix + "unblacklist") {
    if (!devs2.includes(message.author.id))
      return message.channel.send("** ❌ | __ليس لديك صلاحيات مطور البوت__ **");
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    let Blacklist = await db.fetch(`Blacklist_${user.id}`);
    if (Blacklist === null) Blacklist = "off";
    if (!user)
      return message.channel.send(
        `**Usage: ${prefix}unblacklist \`<Mention/ID>\`**`
      );
    message.channel.send(`**Done Unblacklisted The User**`);
    db.set(`Blacklist_${user.id}`, "off");
    user.send(`⚠️${user}⚠️
**You Are UnBlacklisted FROM \`${client.user.username}\` 
Reason: \`${reason}\` **`);
  }
});

const prefixes = {};

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };
  var prefix = prefixes[message.guild.id].prefix;
  var setp = prefixes[message.guild.id];
  if (message.content.startsWith(prefix + "set-prefix")) {
    if (!message.member.hasPermission(`MANAGE_GUILD`))
      return message.reply(
        `**:x: Error: You do not have the required permissions: Manage Server.**`
      );

    let args = message.content.split(" ").slice(1);

    if (!args.join(" "))
      return message.reply(`**:x: Error: Say The Prefix Please.**`);
    const embed = new Discord.RichEmbed()

      .setColor("BLACK")
      .setTitle("Prefix Set!")
      .setDescription(`**Set to ${args[0]}**`);
    message.channel.send(embed);
    setp.prefix = args.join();
  }

  fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
    if (err) console.error(err);
  });
});
////

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };
  var prefix = prefixes[message.guild.id].prefix;
  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
    let embedhelp = new Discord.RichEmbed().setColor("GOLD").setTitle("");
    let pages = [
      `**
**Our Youtube Channel** : »  [Join From Here](https://www.youtube.com/channel/UCSMEZx-S4HFewNCm8k4mC2Q)
**Bot Support Server** : » [From Here](https://discord.gg/gFscHXeU7t)
**Bot Developer Name** : » @『ZK』𝒵𝒦𝑒𝓎𝑒𝓇#2203
**Bot Developer Mentio,** : » <@!443147424542752768>
**You Can Invite The From [Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1916267903)**\n **
   
  **❖════[ ADMIN COMMANDS ]════❖
    |-${prefix}ban
    |-${prefix}unban 
    |-${prefix}kick 
    |-${prefix}mute 
    |-${prefix}unmute 
    |-${prefix}role 
    |-${prefix}warn 
    |-${prefix}clear
    |-${prefix}delete-all-roles 
    |-${prefix}lock 
    |-${prefix}unlock 
    |-${prefix}temp 
    |-${prefix}auto-role 
    |-${prefix}auto
    |-${prefix}createcolors
    |-${prefix}gstart
  ❖════[ PUBLIC COMMANDS ]════❖
    |-${prefix}user 
    |-${prefix}credits 
    |-${prefix}profile 
    |-${prefix}daily 
    |-${prefix}avatar 
    |-${prefix}invite
    |-${prefix}top
    |-${prefix}colors 
    |-${prefix}color
    |-${prefix}server 
    |-${prefix}new-ticket
    |-${prefix}close-ticket**`,
      `**
**Our Youtube Channel** : »  [Join From Here](https://www.youtube.com/channel/UCSMEZx-S4HFewNCm8k4mC2Q)
**Bot Support Server** : » [From Here](https://discord.gg/gFscHXeU7t)
**Bot Developer Name** : » @『ZK』𝒵𝒦𝑒𝓎𝑒𝓇#2203
**Bot Developer Mentio,** : » <@!443147424542752768>
**You Can Invite The From [Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1916267903)**\n **
  **❖════[ GAMES COMMANDS ]════❖
    |-${prefix}xo
    |-${prefix}rps
    |-${prefix}capitals
    |-${prefix}brand
    |-${prefix}emoji
    |-${prefix}flag 
    |-${prefix}cut
    |-${prefix}8ball
    |-${prefix}frots
    |-${prefix}sara7a
    |-${prefix}tanslation
  ❖════[ MUSIC COMMANDS ]════❖
    |-${prefix}play
    |-${prefix}stop
    |-${prefix}skip
    |-${prefix}repeat
    |-${prefix}pause
    |-${prefix}resume
    |-${prefix}volume
    |-${prefix}np
    |-${prefix}skipto
    |-${prefix}forceskip
   **`,
      `**
**Our Youtube Channel** : »  [Join From Here](https://www.youtube.com/channel/UCSMEZx-S4HFewNCm8k4mC2Q)
**Bot Support Server** : » [From Here](https://discord.gg/gFscHXeU7t)
**Bot Developer Name** : » @『ZK』𝒵𝒦𝑒𝓎𝑒𝓇#2203
**Bot Developer Mentio,** : » <@!443147424542752768>
**You Can Invite The From [Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=1916267903)**\n **
**  ❖════[ PROTECT COMMANDS ]════❖
   |-${prefix}limitbans
   |-${prefix}limitkicks
   |-${prefix}limitroleDelete
   |-${prefix}limitcannelDelete
   |-${prefix}antibots on/off
   |-${prefix}limit time 1000 TIP: اكتبها بعد ما تخلص تعديل على الحمايه
   |-${prefix}setlog
   |-${prefix}antispread on/off
   |-${prefix}setfack
   |-${prefix}antifake on/off
  ❖════[ CONFIG COMMANDS ]════❖
   |-${prefix}blacklist
   |-${prefix}unblacklist
   |-${prefix}set-prefix
   |-${prefix}set-language \`\`\` SOON.. \`\`\`
   **`
    ];
    let page = 1;

    let embed = new Discord.RichEmbed()
      .setColor("GOLD")
      .setFooter(`Page ${page} of ${pages.length}`)
      .setDescription(pages[page - 1])
      .setTitle(`**✷‿✷ Bot Orders ✷‿✷**`);
    message.channel.sendEmbed(embed).then(msg => {
      msg.react("◀").then(r => {
        msg.react("▶");

        const backwardsFilter = (reaction, user) =>
          reaction.emoji.name === "◀" && user.id === message.author.id;
        const forwardsFilter = (reaction, user) =>
          reaction.emoji.name === "▶" && user.id === message.author.id;

        const backwards = msg.createReactionCollector(backwardsFilter, {
          time: 2000000
        });
        const forwards = msg.createReactionCollector(forwardsFilter, {
          time: 2000000
        });

        backwards.on("collect", r => {
          if (page === 1) return;
          page--;
          embed.setDescription(pages[page - 1]);
          embed.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(embed);
        });
        forwards.on("collect", r => {
          if (page === pages.length) return;

          page++;
          embed.setDescription(pages[page - 1]);
          embed.setFooter(`Page ${page} of ${pages.length}`);
          msg.edit(embed);
        });
      });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };
  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**انت لا تملك الصلاحيات المطلوبه**"); /// you dont have permissions for this
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**"); /// mention someone
    if (!message.guild.member(user).bannable)
      return message.reply(
        "**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**" /// The bot role should be higher than the person that you want to ban
      );

    message.guild.member(user).ban(7, user);

    message.channel.send(
      `**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `
    );
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  var command = message.content.toLowerCase().split(" ")[0];
  var args = message.content.toLowerCase().split(" ");
  var userM = message.mentions.users.first();
  if (command == prefix + "unban") {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        ":no_entry: | You dont have **BAN_MEMBERS** Permission!"
      );
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        ":no_entry: | I dont have **BAN_MEMBERS** Permission!"
      );
    if (!args[1])
      return message.channel.send(
        ":information_source:  `#kick <@id>` يجب تحديد شخص" /// you have to mention someone
      );
    if (args[1].length < 16)
      return message.reply(":no_entry: | This ID is not id user!");
    message.guild.fetchBans().then(bans => {
      var Found = bans.find(m => m.id === args[1]);
      if (!Found)
        return message.channel.send(
          `:no_entry: | <@${message.author.id}> This preson not have any ban from this server! :unlock:`
        );
      message.guild.unban(args[1]);
      message.channel.send(
        `:white_check_mark: Successfully \`\`UNBANNED\`\` <@${
          args[1]
        }> From the server!`
      );
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  let banembed = new Discord.RichEmbed().setImage(
    "https://e.top4top.net/p_1029oot2o1.png"
  );
  var moment = require("moment");
  var mmss = require("ms");
  let date = moment().format("Do MMMM YYYY , hh:mm");
  let User = message.mentions.users.first();
  let Reason = message.content
    .split(" ")
    .slice(3)
    .join(" ");
  let messageArray = message.content.split(" ");
  let time = messageArray[2];
  if (message.content.startsWith(prefix + "tempban")) {
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "**You dont have ban_members permission :/ **"
      );
    if (!User) return message.channel.sendEmbed(banembed);
    if (User.id === client.user.id)
      return message.channel.send("**Why you want to ban me ? :/**");
    if (User.id === message.guild.owner.id)
      return message.channel.send(
        "**Nice try man :> you cant ban the ownership**"
      );
    if (!time) return message.channel.send("**- اكتب الوقت**"); ///type the time
    if (!time.match(/[1-60][s,m,h,d,w]/g))
      return message.channel.send("**- Error in this Duration**");
    if (!Reason) message.channel.send("**- اكتب Reason**"); ///type the reason
    message.channel
      .send(`**:white_check_mark: ${User} has been banned :airplane: **`)
      .then(() => message.guild.member(User).ban({ reason: Reason }));
    User.send(
      `**:airplane: You are has been banned in ${message.guild.name} reason: ${Reason} by: ${message.author.tag} :airplane:**`
    ).then(() => {
      setTimeout(() => {
        message.guild.unban(User);
      }, mmss(time));
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

const prerix = PREFIX;

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.kick) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (!message.channel.guild) return;

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message
        .reply("You Don't Have KICK_MEMBERS Permission")
        .then(msg => msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("I Don't Have KICK_Members Permission");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");

    if (message.mentions.users.size < 1)
      return message.reply(
        ":information_source: `#kick @OrochiX` يجب تحديد شخص " /// you have to mention someone
      );
    if (!reason) return message.reply("Type The Reason Please");
    if (!message.guild.member(user).bannable)
      return message.reply("I can not be higher than my rank");

    message.guild.member(user).kick(7, user);
    message.channel.send(`**:white_check_mark: ${user} has been kicked ! **`);
    user.send(
      `**You are has been kicked in ${message.guild.name} reason: ${reason}**`
    );
    message.delete();
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.boss) return;

  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command == "mute") {
    if (!message.channel.guild) return;
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))
      return message
        .reply("انت لا تملك صلاحيات !! ") /// you dont have permissions for this
        .then(msg => msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
      return message
        .reply("البوت لايملك صلاحيات ") /// The bot dont have persmissions for this
        .then(msg => msg.delete(5000));
    let user = message.mentions.users.first();
    let muteRole = message.guild.roles.find("name", "Muted");
    if (!muteRole)
      return message.reply("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {
        // there is not  'muted' role
        msg.delete(5000);
      });
    if (message.mentions.users.size < 1)
      return message.reply("** يجب عليك المنشن اولاً **").then(msg => {
        /// you have to mention first
        msg.delete(5000);
      });
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    message.guild.member(user).addRole(muteRole);
    const muteembed = new Discord.RichEmbed()
      .setColor(`RED`)
      .setAuthor(`Muted!`, user.displayAvatarURL)
      .setThumbnail(user.displayAvatarURL)
      .addField(
        "**:busts_in_silhouette:  المستخدم**", /// user
        "**[ " + `${user.tag}` + " ]**",
        true
      )
      .addField(
        "**:hammer:  تم بواسطة **", /// done by
        "**[ " + `${message.author.tag}` + " ]**",
        true
      )
      .addField("**:book:  السبب**", "**[ " + `${reason}` + " ]**", true) /// the reason
      .addField("User", user, true);
    message.channel.send({ embed: muteembed });
    var muteembeddm = new Discord.RichEmbed()
      .setAuthor(`Muted!`, user.displayAvatarURL)
      .setDescription(
        `      
${user} انت معاقب بميوت كتابي بسبب مخالفة القوانين      (you are muted because of breaking rules)
${message.author.tag}  تمت معاقبتك بواسطة       (you got punished by)
[ ${reason} ] : السبب                        (the reason)
اذا كانت العقوبة عن طريق الخطأ تكلم مع المسؤلين          (if the punish was by mistake try to contact moderators)
`
      )
      .setFooter(`في سيرفر : ${message.guild.name}`) /// in server
      .setColor(`RED`);
    user.send(muteembeddm);
  }
  if (command === `unmute`) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel
        .sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ") /// you dont have permissions to unmute this member
        .then(m => m.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
      return message.reply("**ما عندي برمشن**").then(msg => msg.delete(6000)); /// I dont have permissions

    let toMute =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
    if (!toMute)
      return message.channel.sendMessage("**عليك المنشن أولاّ**:x: "); /// you have to mention first

    let role = message.guild.roles.find(r => r.name === "Muted");

    if (!role || !toMute.roles.has(role.id))
      return message.channel.sendMessage(
        "**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:" /// this person didnt get muted anyways
      );

    await toMute.removeRole(role);
    message.channel.sendMessage(
      "**لقد تم فك الميوت عن شخص بنجاح**:white_check_mark:" /// unmuted successfully
    );

    return;
  }
});

fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async (ninja, message) => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (ninja.content === prefix + "lock") {
    if (!ninja.channel.guild) if (!ninja.channel.guild) return;

    if (!ninja.member.hasPermission("MANAGE_MESSAGES"))
      return ninja.reply("**ليس لديك صلاحيات**"); /// you dont have permissions
    ninja.channel
      .overwritePermissions(ninja.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        ninja.reply("**تم قفل الشات :no_entry: **"); /// The chat unlocked successfully
      });
  }
  if (ninja.content === prefix + "unlock") {
    if (!ninja.channel.guild) if (!ninja.channel.guild) return;

    if (!ninja.member.hasPermission("MANAGE_MESSAGES"))
      return ninja.reply("**ليس لديك صلاحيات**"); /// you dont have permissions
    ninja.channel
      .overwritePermissions(ninja.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        ninja.reply("**تم فتح الشات :white_check_mark:**"); /// chat unlocked successfully
      });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  let roleembed = new Discord.RichEmbed()
    .setDescription(
      `
    أمثله على الأوامر :
    -role @mention rolename : لأعطاء رتبة لعضو معين
    -role all rolename : لأعطاء رتبة للجميع
    -role humans rolename : لأعطاء رتبة للاشخاص فقط
    -role bots rolename : لأعطاء رتبة لجميع البوتات`
    )
    .setFooter(
      "Requested by " + message.author.username,
      message.author.avatarURL
    );
  var args = message.content.split(" ").slice(1);
  var msg = message.content.toLowerCase();
  if (!message.guild) return;
  if (!msg.startsWith(prefix + "role")) return;
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(" **__ليس لديك صلاحيات__**");
  if (msg.toLowerCase().startsWith(prefix + "roleembed")) {
    if (!args[0]) return message.channel.sendEmbed(roleembed);
    if (!args[1]) return message.channel.sendEmbed(roleembed);
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطاءها الى الشخص**");
    if (message.mentions.members.first()) {
      message.mentions.members.first().addRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم اعطاء الى **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      message.guild.members.forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الى الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] تم اعطاء الى البوتات رتبة**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] تم اعطاء الى البشريين رتبة**"
      );
    }
  } else {
    if (!args[0])
      return message.reply("**:x: يرجى وضع الشخص المراد اعطائها الرتبة**");
    if (!args[1])
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    if (message.mentions.members.first()) {
      message.mentions.members.first().addRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم اعطاء **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      message.guild.members.forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البوتات رتبة**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البشريين رتبة**"
      );
    }
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async (message, msg) => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

  if (command === "clear") {
    const emoji = client.emojis.find("name", "wastebasket");
    let textxt = args.slice(0).join("");
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      if (textxt == "") {
        msg.delete().then;
        msg.channel
          .send("***```ضع عدد الرسائل التي تريد مسحها 👌```***")
          .then(m => m.delete(3000));
      } else {
        msg.delete().then;
        msg.delete().then;
        msg.channel.bulkDelete(textxt);
        msg.channel
          .send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```")
          .then(m => m.delete(3000));
      }
    }
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

let warns = JSON.parse(fs.readFileSync("./data/warnings.json"));

/*const client = new Discord.Client();*/

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "warn") {
    //??? ???????

    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");

    if (message.mentions.users.size < 1) return message.reply("**???? ???**");
    if (!reason) return message.reply("**???? ??? ?????**");

    if (!warns[user.id])
      warns[user.id] = {
        warns: 0
      };

    warns[user.id].warns++;

    fs.writeFile("./data/warnings.json", JSON.stringify(warns), err => {
      if (err) console.log(err);
    });

    const banembed = new Discord.RichEmbed()
      .setAuthor(`WARNED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    client.channels.find("name", "log").send({
      embed: banembed
    });

    if (warns[user.id].warns == 2) {
      //??? ???????? ??????
      let muterole = message.guild.roles.find(`name`, "Muted");
      if (!muterole) {
        try {
          muterole = await message.guild.createRole({
            name: "Muted",
            color: "#000000",
            permissions: []
          });
          message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
            });
          });
        } catch (e) {
          console.log(e.stack);
        }
      }

      let tomute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[0])
      );
      if (!tomute)
        return message
          .reply("**??? ???? ?????? ?????**:x: ")
          .then(m => m.delete(5000));

      let mutetime = "60s";
      await tomute.addRole(muterole.id);
      message.channel.send(`<@${user.id}> has been temporarily muted`);

      setTimeout(async function() {
        await tomute.removeRole(muterole.id);
        message.reply(`<@${user.id}> has been unmuted.`);
      }, ms(mutetime));
    }
    if (warns[user.id].warns == 3) {
      //??? ???????? ??????
      message.guild.member(user).ban(reason);
      message.reply(`<@${user.id}> has been banned.`);
    }
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async (omar, message) => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (omar.content.split(" ")[0] == prefix + "delete-all-channnels") {
    if (!omar.channel.guild) return;
    if (!omar.guild.member(omar.author).hasPermission("MANAGE_CHANNELS"))
      return;
    if (!omar.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return omar.reply(`**I D'ont Have Permission For That !`);
    omar.guild.channels.forEach(m => {
      m.delete();
    });
  }
  if (omar.content.split(" ")[0] == prefix + "delete-all-roles") {
    if (!omar.channel.guild) return;
    if (
      !omar.guild
        .member(omar.author)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return;
    if (
      !omar.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return omar.reply(`**I D'ont Have Permission For That !`);
    omar.guild.roles.forEach(m => {
      m.delete();
    });
    omar.reply("`تم حذف جميع الرتب بنجاح`");
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

const temp = JSON.parse(fs.readFileSync("./data/temp.json", "utf8"));
client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!temp[message.guild.id])
    temp[message.guild.id] = {
      time: "3000",
      category: "Create Temp Channel",
      channel: "Create Temp Channel"
    };
  if (message.content.startsWith(prefix + "temp on")) {
    if (!message.member.hasPermission(`MANAGE_GUILD`)) return;
    var ggg = message.guild
      .createChannel("Create Temp Channel", "category")
      .then(cg => {
        var ccc = message.guild
          .createChannel("Create Temp Channel", "voice")
          .then(ch => {
            ch.setParent(cg);
            message.channel.send("**Done ,**");
            client.on("message", message => {
              if (message.content === prefix + "temp off") {
                if (!message.member.hasPermission(`MANAGE_GUILD`)) return;
                cg.delete();
                ch.delete();
                message.channel.send("**Done ,**");
              }
            });

            fs.writeFile(
              "./data/prefix.json",
              JSON.stringify(prefixes),
              err => {
                if (err) console.error(err);
              }
            );
            const time = temp[message.guild.id].time;
            client.on("message", async message => {
              if (!prefixes[message.guild.id])
                prefixes[message.guild.id] = {
                  prefix: `${PREFIX}`
                };

              var prefix = prefixes[message.guild.id].prefix;

              let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

              if (Blacklist === "on") return message.channel.send(``);
              if (message.content.startsWith(prefix + "temptime")) {
                if (!message.member.hasPermission(`MANAGE_GUILD`)) return;
                let newTime = message.content
                  .split(" ")
                  .slice(1)
                  .join(" ");
                if (!newTime)
                  return message.reply(
                    `**${prefix}temptime <time>  \`1000 = 1s\`**`
                  );
                if (isNaN(newTime))
                  return message.reply(`** The Time Be Nambers :face_palm: **`);
                if (newTime < 1)
                  return message.reply(`**The Time Be Up \`3000s\`**`);
                temp[message.guild.id].time = newTime;
                message.channel.send(
                  `**Temp Rooms Time Change To \`${newTime}\`**`
                );
              }
            });

            fs.writeFile(
              "./data/prefix.json",
              JSON.stringify(prefixes),
              err => {
                if (err) console.error(err);
              }
            );
            client.on("voiceStateUpdate", (old, neww) => {
              let newUserChannel = neww.voiceChannel;
              let oldUserChannel = old.voiceChannel;
              temp[message.guild.id].category = cg.id;
              temp[message.guild.id].channel = ch.id;
              let channel = temp[message.guild.id].channel;
              let category = temp[message.guild.id].category;
              if (
                oldUserChannel === undefined &&
                newUserChannel !== undefined &&
                newUserChannel.id == channel
              ) {
                neww.guild.createChannel(neww.displayName, "voice").then(c => {
                  c.setParent(category);
                  let scan = setTimeout(() => {
                    if (!neww.voiceChannel) {
                      c.delete();
                      client.channels.get(channel).overwritePermissions(neww, {
                        CONNECT: true,
                        SPEAK: true
                      });
                    }
                  }, temp[neww.guild.id].time);
                  c.overwritePermissions(neww, {
                    CONNECT: true,
                    SPEAK: true,
                    MANAGE_CHANNEL: true,
                    MUTE_MEMBERS: true,
                    DEAFEN_MEMBERS: true,
                    MOVE_MEMBERS: true,
                    VIEW_CHANNEL: true
                  });
                  neww.setVoiceChannel(c);
                });
                client.channels.get(channel).overwritePermissions(neww, {
                  CONNECT: false,
                  SPEAK: false
                });
              }
            });
          });
      });
  }
  fs.writeFile("./data/temp.json", JSON.stringify(temp), err => {
    if (err) console.error(err);
  });
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  const auto = require("./data/auto.json");
  if (!auto) return console.log(`**هناك خطأ في ملف الرد للبوت**`);
  let args = message.content.split(" ");
  if (message.content.startsWith(prefix + "auto")) {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[1])
      return message.channel.send(`**${prefix}add-response msg repl  
      Ex; ${prefix}add-response hi hello**`);
    if (!args[2])
      return message.channel.send(`**${prefix}auto msg reply
        ${prefix}auto hi hello**`);
    auto[args[1] + message.guild.id] = {
      msg: args[1],
      guild: message.guild.id,
      reply: args[2]
    };
    fs.writeFile("data/auto.json", JSON.stringify(auto, null, 5), err => {
      console.error(err);
    });
    message.channel.send(`**:white_check_mark:  تم اضافة الرد التلقائي**`);
  }
  if (message.content.startsWith(prefix + "delete-response")) {
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[1])
      return message.channel.send(`**${prefix}adelete \`Message\`**`);
    if (!auto[args[1] + message.guild.id])
      return message.channel.send(
        `**:negative_squared_cross_mark:  لا استطيع العثور على الرد**`
      );
    delete auto[args[1] + message.guild.id];
    fs.writeFile("data/auto.json", JSON.stringify(auto, null, 5), err => {
      console.error(err);
    });
    message.channel.send(`**:white_check_mark: تم حذف الرد **`);
  }
  let ncr = message.content;
  if (!auto[ncr + message.guild.id]) return;
  if (ncr == auto[ncr + message.guild.id].msg)
    return message.channel.send(auto[ncr + message.guild.id].reply);
  message.delete(5000);
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

let ar = JSON.parse(fs.readFileSync(`./data/AutoRole.json`, `utf8`));
client.on("guildMemberAdd", async (member, message) => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (!ar[member.guild.id])
    ar[member.guild.id] = {
      onoff: "Off",
      role: "Member"
    };
  if (ar[member.guild.id].onoff === "Off") return;
  member
    .addRole(member.guild.roles.find(`name`, ar[member.guild.id].role))
    .catch(console.error);
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});
client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (!message.guild) return;
  if (!ar[message.guild.id])
    ar[message.guild.id] = {
      onoff: "Off",
      role: "Member"
    };
  if (message.content.startsWith(prefix + `autorole`)) {
    let perms = message.member.hasPermission(`MANAGE_ROLES`);
    if (!perms)
      return message.reply(
        `You don't have permissions, required permission : Manage Roles.`
      );
    let args = message.content.split(" ").slice(1);
    if (!args.join(" "))
      return message.reply(`${prefix}autorle toggle/setrole [ROLE NAME]`);
    let state = args[0];
    if (
      !state.trim().toLowerCase() == "toggle" ||
      !state.trim().toLowerCase() == "setrole"
    )
      return message.reply(
        `Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`
      );
    if (state.trim().toLowerCase() == "toggle") {
      if (ar[message.guild.id].onoff === "Off")
        return [
          message.channel.send(`**The Autorole Is __𝐎𝐍__ !**`),
          (ar[message.guild.id].onoff = "On")
        ];
      if (ar[message.guild.id].onoff === "On")
        return [
          message.channel.send(`**The Autorole Is __𝐎𝐅𝐅__ !**`),
          (ar[message.guild.id].onoff = "Off")
        ];
    }
    if (state.trim().toLowerCase() == "set") {
      let newRole = message.content
        .split(" ")
        .slice(2)
        .join(" ");
      if (!newRole)
        return message.reply(`${prefix}autorole setrole [ROLE NAME]`);
      if (!message.guild.roles.find(`name`, newRole))
        return message.reply(`I Cant Find This Role.`);
      ar[message.guild.id].role = newRole;
      message.channel.send(`**The AutoRole Has Been Changed to ${newRole}.**`);
    }
  }
  if (message.content === prefix + "info") {
    let perms = message.member.hasPermission(`MANAGE_GUILD`);
    if (!perms) return message.reply(`You don't have permissions.`);
    var embed = new Discord.RichEmbed()
      .addField(
        `Autorole : :sparkles:  `,
        `
State : __${ar[message.guild.id].onoff}__
Role : __${ar[message.guild.id].role}__`
      )
      .setColor(`BLUE`);
    message.channel.send({ embed });
  }
  fs.writeFile("./data/AutoRole.json", JSON.stringify(ar), err => {
    if (err) console.error(err);
  });
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "user")) {
    var args = message.content.split(" ").slice(1);
    let user = message.mentions.users.first();
    var men = message.mentions.users.first();
    var heg;
    if (men) {
      heg = men;
    } else {
      heg = message.author;
    }
    var mentionned = message.mentions.members.first();
    var h;
    if (mentionned) {
      h = mentionned;
    } else {
      h = message.member;
    }
    moment.locale("ar-TN");
    var id = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor("#707070")
      .addField(
        ": دخولك لديسكورد قبل",
        `${moment(heg.createdTimestamp).format(
          "YYYY/M/D HH:mm:ss"
        )} **\n** \`${moment(heg.createdTimestamp).fromNow()}\``,
        true
      )
      .addField(
        ": انضمامك لسيرفر قبل",
        `${moment(h.joinedAt).format("YYYY/M/D HH:mm:ss")} \n \`${moment(
          h.joinedAt
        ).fromNow()}\``,
        true
      )
      // .setFooter('NIRO-DEVELOPMENT")
      .setThumbnail(heg.avatarURL);
    message.channel.send(id);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  let args = message.content.split(" ").slice(1);
  if (message.content.split(" ")[0] == prefix + "color") {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**There's No Color With This Number ** :x: `)
      .setColor(`ff0000`);
    if (!args[0]) return message.channel.sendEmbed(embedd);
    if (isNaN(args[0]))
      return message.channel.sendEmbed(
        embedd.setDescription("Please select a number :x:")
      );
    if (!message.guild.roles.find("name", `${args[0]}`))
      return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args[0]}`);
    if (!a) return;
    if (a.hasPermission(8))
      return message.channel.send(
        embedd.setDescription("This color has administrator!")
      );
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args[0]) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args[0]}`));
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

const credits = JSON.parse(fs.readFileSync("./data/credits.json"));
var time = require("./data/time.json");
client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./data/credits.json", JSON.stringify(credits, null, 4));
  if (args[0].toLowerCase() == `${prefix}credits`) {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      let creditsembed = new Discord.RichEmbed()
        .setColor("GRAY")
        .setDescription(
          `**${mention.username}, your :credit_card: balance is  \`$${credits[mention.id].credits}\`**`
        );
      message.channel.send({ embed: creditsembed });
    } else if (mentionn && args[2]) {
      if (isNaN(args[2]) || [",", "."].includes(args[2]))
        return message.channel.send(`**:x: | خطا **`);

      if (args[2] < 1) return message.channel.send(`**:x: | خطا**`);
      if (mention.bot) return message.channel.send(`**:x: | خطا**`);
      if (mentionn.id === message.author.id)
        return message.channel.send(`**:x: | خطا**`);
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:x: | Error ,You dont have credits in your account**`
        );
      if (args[2].includes("-")) return message.channel.send(`**:x: | خطا**`);
      let resulting =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] - args[2] * (5 / 100));
      let tax =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] * (5 / 100));
      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let fourth = Math.floor(Math.random() * 9);
      let num = `${first}${second}${third}${fourth}`;
      let Canvas = require("canvas");
      let canvas = Canvas.createCanvas(108, 40);
      let ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.font = "20px Arial Bold";
      ctx.fontSize = "20px";
      ctx.fillStyle = "#ffffff";
      message.channel
        .send(
          `**${
            message.author.username
          }, Transfer Fees: \`${tax}\`, Amount: \`$${resulting.toLocaleString()}\`**
type these numbers to confirm: `
        )
        .then(async essss => {
          message.channel.send(`\`${num}\``).then(m => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (collected.first().content === num) {
                  essss.delete();
                  message.channel.send(
                    `**:moneybag: | ${
                      message.author.username
                    }, Done Trans \`$${resulting.toLocaleString()}\` To ${mentionn}**`
                  );
                  mention.send(
                    `**:money_with_wings: | Transfer Receipt **\`\`\`You Have Received \`$${resulting.toLocaleString()}\` From User ${
                      message.author.username
                    }; (ID (${message.author.id})\`\`\``
                  );
                  m.delete();
                  credits[author].credits += Math.floor(
                    -resulting.toLocaleString()
                  );
                  credits[mentionn.id].credits += Math.floor(
                    +resulting.toLocaleString()
                  );
                  fs.writeFileSync(
                    "./data/credits.json",
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                  essss.delete();
                }
              });
          });
        });
    } else {
      message.channel.send(
        `**:x: | Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`
      );
    }
  }
  if (args[0].toLowerCase() === `${prefix}daily`) {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send(
        `**:stopwatch: |  ${
          message.author.username
        }, your daily :dollar: credits refreshes in ${pretty(times, {
          verbose: true
        })}.**`
      );
      fs.writeFile("./data/time.json", JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      let dailyem = new Discord.RichEmbed().setDescription(
        `**:atm: | ${message.author.username} you received your :yen: 250 daily credits!**`
      );
      message.channel.send({ embed: dailyem });
      fs.writeFile("./data/credits.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  let args = message.content.split(" ");
  if (message.content.startsWith(prefix + "profile")) {
    let member = message.mentions.users.first();

    if (args[0] && !args[1]) {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
      message.channel.send({
        files: [
          {
            name: "cutie=HyPeD.png",
            attachment: `https://api.probot.io/profile/${message.author.id}`
          }
        ]
      });
    }
    if (member) {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 1000);
      message.channel.send({
        files: [
          {
            name: "cutie=HyPeD.png",
            attachment: `https://api.probot.io/profile/${member.id}`
          }
        ]
      });
    } else if (args[1] && !member) {
      client.users.fetch(args[1]).then(userr => {
        message.channel.stopTyping();
        setTimeout(() => {
          message.channel.stopTyping();
        }, Math.random() * (1 - 3) + 1 * 1000);
        message.channel.send({
          files: [
            {
              name: "cutie=HyPeD.png",
              attachment: `https://api.probot.io/profile/${userr.id}`
            }
          ]
        });
      });
    }
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "avatar")) {
    if (!message.channel.guild) return;
    var mentionned = message.mentions.users.first();
    var client;
    if (mentionned) {
      var client = mentionned;
    } else {
      var client = message.author;
    }
    const embed = new Discord.RichEmbed()
      .addField("Requested by:", "<@" + message.author.id + ">")
      .setColor("000000")
      .setImage(`${client.avatarURL}`);
    message.channel.sendEmbed(embed);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (!message.guild || message.author.bot) return;
  if (message.content == prefix + "colors") {
    var fsn = require("fs-nextra");
    fs.readdir("./colors", async (err, files) => {
      var f = files[Math.floor(Math.random() * files.length)];
      var { Canvas } = require("canvas-constructor");
      var x = 0;
      var y = 0;
      if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0)
        return;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(() => {
          x += 100;
          if (x > 100 * 12) {
            x = 100;
            y += 80;
          }
        });
      var image = await fsn.readFile(`./colors/${f}`);
      var xd = new Canvas(100 * 11, y + 350)
        .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100)
        .setTextBaseline("middle")
        .setColor("white")
        .setTextSize(60)
        .addText(`قائمة الألوان`, 375, 40);
      x = 0;
      y = 150;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(role => {
          x += 75;
          if (x > 100 * 10) {
            x = 75;
            y += 80;
          }
          xd.setTextBaseline("middle")
            .setTextAlign("center")
            .setColor(role.hexColor)
            .addBeveledRect(x, y, 60, 60, 15)
            .setColor("white");
          if (`${role.name}`.length > 2) {
            xd.setTextSize(30);
          } else if (`${role.name}`.length > 1) {
            xd.setTextSize(40);
          } else {
            xd.setTextSize(50);
          }
          xd.addText(role.name, x + 30, y + 30);
        });
      message.channel.sendFile(xd.toBuffer());
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(`${prefix}invite`)) {
    var embed = new Discord.RichEmbed()
      .setTitle(">> ClickHere To Add" + `${client.user.username}` + " <<")
      .setURL(
        "https://discordapp.com/oauth2/authorize?client_id=" +
          `${client.user.id}` +
          "&scope=bot&permissions=2080374975"
      )
      .setTimestamp()
      .setFooter(`Requested By | ${message.author.username}`)
      .setColor("RANDOM");
    message.channel.send(
      ":white_check_mark: | Check Your DM! تم الأرسال بلخاص"
    );
    message.author.send({ embed });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "server")) {
    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.reply(
        `**هذه الخاصية للادارة فقط** :negative_squared_cross_mark: `
      );
    if (!message.channel.guild) return message.reply(" ");
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField("**🆔 Server ID:**", message.guild.id, true)
      .addField(
        "**📅 Created On**",
        message.guild.createdAt.toLocaleString(),
        true
      )
      .addField(
        "**👑 Owned by**",
        `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`
      )
      .addField("**👥 Members**", `[${message.guild.memberCount}]`, true)
      .addField(
        "**💬 Channels **",
        `**${message.guild.channels.filter(m => m.type === "text").size}**` +
          " text | Voice  " +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField("**🌍 Others **", message.guild.region, true)
      .addField(
        "**🔐 Roles **",
        `**[${message.guild.roles.size}]** Role `,
        true
      )
      .setColor("#000000");
    message.channel.sendEmbed(embed);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

var top = require("./data/top.json");
function save() {
  fs.writeFileSync("./data/top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function(oldMember, newMember, message) {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (newMember.user.bot) return;
  if (!top[newMember.guild.id]) top[newMember.guild.id] = {};
  if (!top[newMember.guild.id][newMember.user.id])
    top[newMember.guild.id][newMember.user.id] = {
      text: 0,
      voice: parseInt(Math.random() * 10),
      msgs: 0,
      id: newMember.user.id
    };
  save();
  if (!oldMember.voiceChannel && newMember.voiceChannel) {
    var addXP = setInterval(async function() {
      top[newMember.guild.id][newMember.user.id].voice += parseInt(
        Math.random() * 4
      );
      save();
      if (!newMember.voiceChannel) {
        clearInterval(addXP);
      }
    }, 60000);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async function(message) {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!top[message.guild.id]) top[message.guild.id] = {};
  if (!top[message.guild.id][message.author.id])
    top[message.guild.id][message.author.id] = {
      text: parseInt(Math.random() * 10),
      voice: 1,
      msgs: 0,
      id: message.author.id
    };
  if (top[message.guild.id][message.author.id].msgs > 10) {
    top[message.guild.id][message.author.id].text += parseInt(
      Math.random() * 4
    );
    top[message.guild.id][message.author.id].msgs = 0;
  }
  save();
  var args = message.content.split(" ");
  var cmd = args[0].toLowerCase();
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "top text")) {
    var topArray = Object.values(top[message.guild.id]);
    var num = 0;
    var textStr = `${topArray
      .sort((a, b) => b.text - a.text)
      .slice(0, 5)
      .filter(user => user.text > 0 && message.guild.members.get(user.id))
      .map(function(user) {
        if (user.text > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`;
        }
      })
      .join("\n")}`;
    var embed = new Discord.RichEmbed()
      .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
      .setColor("13B813")
      .addField(
        `**:speech_balloon: | TEXT LEADERBOARD**`,
        `${textStr}   \n\n\n **\`${prefix}top text\`**`,
        true
      )
      .setFooter(message.author.tag, message.author.displayAvatarURL)
      .setTimestamp();
    message.channel.send({
      embed: embed
    });
    //   if (!message.content.startsWith(prefix)) return;
  } else {
    if (message.content.startsWith(prefix + "top voice")) {
      var topArray = Object.values(top[message.guild.id]);
      var num = 0;
      var voiceStr = `${topArray
        .sort((a, b) => b.voice - a.voice)
        .slice(0, 5)
        .filter(user => user.voice > 0 && message.guild.members.get(user.id))
        .map(function(user) {
          if (user.voice > 0) {
            return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`;
          }
        })
        .join("\n")}`;
      var embed = new Discord.RichEmbed()
        .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
        .setColor("13B813")
        .addField(
          `**:microphone2: | VOICE LEADERBOARD**`,
          `${voiceStr}   \n\n\n **:sparkles:\`${prefix}top voice\``,
          true
        )

        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp();
      message.channel.send({
        embed: embed
      });

      //  break;
      // if (!message.content.startsWith(prefix)) return;
    } else {
      if (message.content.startsWith(prefix + "top")) {
        var topArray = Object.values(top[message.guild.id]);
        var num = 0;
        var textStr = `${topArray
          .sort((a, b) => b.text - a.text)
          .slice(0, 10)
          .filter(user => user.text > 0 && message.guild.members.get(user.id))
          .map(function(user) {
            if (user.text > 0) {
              return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`;
            }
          })
          .join("\n")}`;
        num = 0;
        var voiceStr = `${topArray
          .sort((a, b) => b.voice - a.voice)
          .slice(0, 10)
          .filter(user => user.voice > 0 && message.guild.members.get(user.id))
          .map(function(user) {
            if (user.voice > 0) {
              return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`;
            }
          })
          .join("\n")}`;
        var embed = new Discord.RichEmbed()
          .setAuthor("?? | Guild Score Leaderboards", message.guild.iconURL)
          .addField(
            "**TOP 5 TEXT :speech_balloon:**",
            `${textStr}  \n\n  **:sparkles: More?** \`${prefix}top text\``,
            true
          )
          .addField(
            "**TOP 5 VOICE :microphone2:**",
            `${voiceStr} \n\n **:sparkles: More?** \`${prefix}top voice\``,
            true
          )
          .setFooter(message.author.tag, message.author.displayAvatarURL)
          .setTimestamp()
          .setColor(`BLUE`);
        message.channel.send({
          embed: embed
        });
      }
    }
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "new-ticket")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists("name", "Support Team"))
      return message.channel.send(
        `This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`
      );
    if (
      message.guild.channels.exists(
        "name",
        "ticket-{message.author.id}" + message.author.id
      )
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.username}`, "text")
      .then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, #${c.name}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to .`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  }

  if (message.content.startsWith(prefix + "close-ticket")) {
    if (!message.channel.name.startsWith(`ticket-`))
      return message.channel.send(
        `You can't use the close command outside of a ticket channel.`
      );

    message.channel
      .send(
        `Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`
      )
      .then(m => {
        message.channel
          .awaitMessages(response => response.content === "${prefix}confirm", {
            max: 1,
            time: 10000,
            errors: ["time"]
          })
          .then(collected => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit("Ticket close timed out, the ticket was not closed.").then(
              m2 => {
                m2.delete();
              },
              3000
            );
          });
      });
  }
});

const Enmap = require("enmap");
const cd = require("countdown");
const totime = require("to-time");
const dbg = new Enmap({ name: "Giveaway" });

client.on("ready", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  await dbg.defer;
  await console.log(`Logged in as [ ${client.user.username} ]!`);
  client.guilds.forEach(async g => {
    g.channels
      .filter(
        c =>
          c.type == "text" &&
          c.permissionsFor(client.user.id).has("VIEW_CHANNEL")
      )
      .forEach(async c => {
        let fetched = await c.fetchMessages();
        if (fetched.size == 0) return;
        let mess = await fetched.filter(
          r =>
            r.author.id === client.user.id && r.content == `**🎉 GIVEAWAY 🎉**`
        );
        if (mess.size == 0) return;
        mess.forEach(m => {
          if (!m) return;
          if (!dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`)) return;
          let time2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtime;
          let text2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtext;
          let win2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gwin;
          if (time2 === null || time2 === undefined) return;
          let embed = new Discord.RichEmbed()
            .setColor("BLUE")
            .setAuthor(`${text2}`, g.iconURL)
            .setDescription(
              `React with 🎉 to enter!\nTime remaining: ${cd(
                new Date().getTime(),
                time2
              )}`
            )
            .setFooter(`Ends at`, client.user.avatarURL)
            .setTimestamp(time2);
          let embed2 = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(text2, g.iconURL)
            .setFooter(`Ended at`);
          let ttimer = setInterval(async () => {
            if (!m || m.content == `🎉 **GIVEAWAY ENDED** 🎉`) return;
            let ttt = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
            if (ttt.includes(moment().diff(time2, "seconds")))
              return m.edit(
                `🎉 **GIVEAWAY** 🎉`,
                embed
                  .setColor("#ffb800")
                  .setDescription(
                    `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                      new Date().getTime(),
                      time2
                    )}`
                  )
              );
            m.edit(
              `🎉 **GIVEAWAY** 🎉`,
              embed.setDescription(
                `React with 🎉 to enter!\nTime remaining: ${cd(
                  new Date().getTime(),
                  time2
                )}`
              )
            );
            if (moment().isAfter(time2)) {
              m.reactions
                .filter(a => a.emoji.name == "🎉")
                .map(r =>
                  r.fetchUsers().then(u => {
                    let rusers = u
                      .filter(user => !user.bot)
                      .random(parseInt(win2));
                    m.edit(
                      `${g} GIVEAWAY ENDED ${g}`,
                      embed2
                        .setTimestamp()
                        .setDescription(`Winners:\n${rusers || "No winners"}`)
                    );
                    if (
                      m.reactions
                        .filter(a => a.emoji.name == "🎉")
                        .map(reaction => reaction.count)[0] <= 1
                    ) {
                      return m.channel.send(`No winners :rolling_eyes:`);
                    } else {
                      m.channel.send(
                        `Congratulations ${rusers}! You won the **${text2}**`
                      );
                    }
                    dbg.delete(`giveaway.${g.id}.${c.id}.${m.id}.time`);
                    clearInterval(ttimer);
                    return;
                  })
                );
            }
          }, 5000);
        });
      });
  });
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

//client.on('error', console.error);
//client.on('warn', warn => console.warn(`[WARN] - ${warn}`));
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  //let g = client.guilds
  //  .get("606910399811420175")
  //    .emojis.find(r => r.name === "start");
  if (message.author.bot || message.channel.type == "dm") return undefined;
  let args = message.content.split(" ");
  let timer;
  if (args[0] == `${prefix}gstart`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1] || !args[2] || !args[3])
        return message.channel.send(
          `**Usage:** **\`${prefix}gstart [Time] [Winners] [Giveaway Prize]\n\`** **Example:** **\`${prefix}start 4h 1 Nitro\`**`
        );
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS"))
        return message.channel.send(`I don't have **Embed Links** permission.`);
      if (ms(args[1]) === undefined)
        return message.channel.send(`Please use a proper time format.`);
      if (isNaN(args[2]))
        return message.channel.send(`Winners must be number!`);
      if (args[2] < 1 || args[2] > 10)
        return message.channel.send(`Winners must be bettwen 1 and 10.`);
      let timega = ms(args[1]) / 1000;
      let time = Date.now() + totime.fromSeconds(timega).ms();
      if (timega < 5)
        return message.channel.send(
          `Giveaway time can't be less than 5 seconds.`
        );
      let timespan = cd(new Date().getTime(), time);
      let rusers;
      let embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setAuthor(`${args.slice(3).join(" ")}`)
        .setDescription(`React with 🎉 to enter!\nTime remaining: ${timespan}`)
        .setFooter(`Ends at`, client.user.avatarURL)
        .setTimestamp(time);
      let embed2 = new Discord.RichEmbed()
        .setColor("RED")
        .setAuthor(args.slice(3).join(" "))
        .setFooter(`Ended at`);
      let msg = await message.channel
        .send(`**🎉 GIVEAWAY 🎉**`, embed)
        .catch(err => message.channel.send(`Error: \`${err}\``));
      dbg.set(
        `giveaway.${message.guild.id}.${message.channel.id}.${msg.id}.time`,
        {
          gtime: time,
          gid: msg.id,
          gtext: args.slice(3).join(" "),
          gwin: args[2]
        }
      );
      await msg.react("🎉");
      timer = setInterval(() => {
        if (!msg || msg.content == `**🎉 GIVEAWAY ENDED 🎉**`) return;
        let ttt = [-2, -3, -4, -5, -6, -7, -8, -9, -10];
        if (ttt.includes(moment().diff(time, "seconds")))
          return msg.edit(
            `**🎉 GIVEAWAY 🎉**`,
            embed
              .setColor("#ffb800")
              .setDescription(
                `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                  new Date().getTime(),
                  time
                )}`
              )
          );
        msg.edit(
          `**🎉 GIVEAWAY 🎉**`,
          embed.setDescription(
            `React with 🎉 to enter!\nTime remaining: ${cd(
              new Date().getTime(),
              time
            )}`
          )
        );
        rusers = msg.reactions
          .filter(a => a.emoji.name == "🎉")
          .map(reaction =>
            reaction.users.filter(u => !u.bot).random(parseInt(args[2]))
          )[0];
        if (moment().isAfter(time)) {
          msg.edit(
            `** GIVEAWAY ENDED 🎉**`,
            embed2
              .setTimestamp()
              .setDescription(`Winners:\n${rusers || "No winners"}`)
          );
          if (
            msg.reactions
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          ) {
            return message.channel.send(``);
          } else {
            msg.channel.send(
              `Congratulations ${rusers}! You won the **${args
                .slice(3)
                .join(" ")}**`
            );
          }
          clearInterval(timer);
          return;
        }
      }, 5000);
    } else return undefined;
  } else if (args[0] == `${prefix}groll`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**Usage:** **\`${prefix}groll [giveaway message id]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`Thats not a message ID`);
      message.channel
        .fetchMessage(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(`This is not a giveaway message.`);
          if (!m.content.startsWith(`**🎉 GIVEAWAY**`))
            return message.channel.send(`This is not a giveaway message.`);
          if (m.content != `**🎉 GIVEAWAY ENDED 🎉**`)
            return message.channel.send(`The giveaway is not ended.`);
          if (m.reactions.size < 1)
            return message.channel.send(
              `I can't find reactions in this message.`
            );
          if (
            m.reactions
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          )
            return message.channel.send(``);
          m.reactions
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.fetchUsers().then(async u => {
                let rusers = u.filter(user => !user.bot).random();
                await message.channel.send(`The new winner is: ${rusers}`);
              })
            );
        })
        .catch(err =>
          message.channel.send(`I can't find this message in the channel.`)
        );
    } else return undefined;
  } else if (args[0] == `${prefix}gend`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**Usage:** **\`${prefix}gend [giveaway message id]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`Thats not a message ID`);
      message.channel
        .fetchMessage(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(`This is not a giveaway message.`);
          if (!m.content.startsWith(`**🎉 GIVEAWAY**`))
            return message.channel.send(`This is not a giveaway message.`);
          if (m.content == `**🎉 GIVEAWAY ENDED 🎉**`)
            return message.channel.send(`The giveaway is ended.`);
          if (m.reactions.size < 1)
            return message.channel.send(
              `I can't find reactions in this message.`
            );
          let gv = dbg.get(
            `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
          );
          let rusers = m.reactions.map(r =>
            r.users.filter(u => !u.bot).random(parseInt(gv.gwin))
          );
          let embed2 = new Discord.RichEmbed()
            .setColor("RED")
            .setAuthor(gv.gtext)
            .setFooter(`Ended at`);
          m.reactions
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.fetchUsers().then(async u => {
                let rusers = u
                  .filter(user => !user.bot)
                  .random(parseInt(gv.gwin));
                m.edit(
                  `**🎉 GIVEAWAY ENDED 🎉**`,
                  embed2
                    .setTimestamp()
                    .setDescription(`Winners:\n${rusers || "No winners"}`)
                );
                if (
                  m.reactions
                    .filter(a => a.emoji.name == "🎉")
                    .map(reaction => reaction.count)[0] <= 1
                ) {
                  return message.channel.send(`No winners :rolling_eyes:`);
                } else {
                  message.channel.send(
                    `Congratulations ${rusers}! You won the **${gv.gtext}**`
                  );
                }
                await dbg.delete(
                  `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
                );
                return;
              })
            );
        })
        .catch(err =>
          message.channel.send(`I can't find this message in the channel.`)
        );
    } else return undefined;
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

var statuss = [`${PREFIX}help`, "BEST SYSTEM BOT | ZK-system", "ZKEYER SYSTEM"];
var secound = 5;
client.on("ready", () => {
  var timeing = Math.floor(secound * 1000);
  setInterval(function() {
    var ammount = statuss.length;
    var num = Math.floor(Math.random() * ammount);
    client.user.setActivity(statuss[num], {
      type: "PLAYING",
      url: "https://www.youtube.com/channel/UCSMEZx-S4HFewNCm8k4mC2Q"
    });
  }, timeing);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "ping")) {
    if (!message.channel.guild) return;
    var msg = `${Date.now() - message.createdTimestamp}`;
    var api = `${Math.round(client.ping)}`;
    if (message.author.bot) return;
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("**Time Taken:**", msg + " ms 📶 ")
      .addField("**WebSocket:**", api + " ms 📶 ")
      .setTimestamp();
    message.channel.send({ embed: embed });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (
    message.content == prefix + "capitals" ||
    message.content == prefix + "عواصم"
  ) {
    var x = [
      "مصر",
      "ليبيا",
      "تونس",
      "المغرب",
      "لبنان",
      "السودان",
      "السعوديه",
      "اليمن"
    ];
    var x2 = [
      "القاهره",
      "طرابلس",
      "تونس",
      "الرباط",
      "بيروت",
      "الخرطوم",
      "الرياض",
      "صنعاء"
    ];
    var x3 = Math.floor(Math.random() * x.length);
    var emoji = new Discord.RichEmbed()
      .setTitle(`** لديك __10 ثواني__ لكتابة العاصمه **`)
      .addField(`${x[x3]}`);
    message.channel.sendEmbed(emoji).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark:** لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
       الصحيحة هيا __${x2[x3]}__ **`);
      });

      r.then(collected => {
        message.channel.send(
          `${
            collected.first().author
          } ** لقد قمت بكتابة العاصمه في الوقت المناسب **`
        );
      });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.channel.guild)
      return message.channel
        .send("**هذا الأمر فقط للسيرفرات**")
        .then(m => m.delete(5000));
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`");
    let args = message.content
      .split(" ")
      .join(" ")
      .slice(2 + prefix.length);
    let BcList = new Discord.RichEmbed()
      .setColor("GREEN")
      .setThumbnail(message.author.avatarURL)
      .setAuthor(`محـتوى الرسالة : ${args}`)
      .setDescription(`**أضــغط على ✅ لارسال البرودكاست**`);
    if (!args)
      return message.reply(":x: **يجب عليك كتابة رسالة لارسال البرودكاست**");
    message.channel.send(BcList).then(msg => {
      msg.react("✅").then(() => msg.react("✅"));
      let EmbedBcFilter = (reaction, user) =>
        reaction.emoji.name === "✅" && user.id === message.author.id;
      let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
      EmbedBc.on("collect", r => {
        message.channel
          .send(
            `✅ **تـم الارسـال الـى ${
              message.guild.members.filter(m => m.presence.status !== "online")
                .size
            } شخص**`
          )
          .then(m => m.delete(5000));
        message.guild.members.forEach(m => {
          var bc = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(`🔴 Server : ${message.guild.name}`)
            .setDescription(
              `✉️ **Message :** 
**${args}**
―
🔰 **By :**
**${message.author.username}**
`
            )
            .setFooter(client.user.tag, client.user.avatarURL)
            .setThumbnail(client.user.avatarURL);
          m.send({ embed: bc });
          msg.delete();
        });
      });
    });
  }
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (
    message.content == prefix + "brand" ||
    message.content == prefix + "شعار"
  ) {
    var x = [
      "https://cdn.discordapp.com/attachments/756329106953601225/776584216161812490/jW4dnFtA_400x400.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776589087997296691/InCS8dvy_400x400.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776590445622329344/ocZKRu9P_400x400.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776591027943243776/aCWlGSZF_400x400.png"
    ];
    var x2 = ["جافا", "ريزر", "يوتيوب", "جوجل كروم"];
    var x3 = Math.floor(Math.random() * x.length);
    var brand = new Discord.RichEmbed()
      .setImage(`${x[x3]}`)
      .setTitle(`**اسرع شخص يرسل الاشعار خلال __10__ ثواني**`);

    message.channel.sendEmbed(brand).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark: لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
         الصحيحةة هيا **${x2[x3]}**`);
      });

      r.then(collected => {
        message.channel.send(
          `${collected.first().author}You have solved the question🎉`
        );
      });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (
    message.content == prefix + "flag" ||
    message.content == prefix + "اعلام"
  ) {
    var x = [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/256px-Flag_of_Brazil.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Flag_of_Jordan.svg/256px-Flag_of_Jordan.svg.png",
      "https://cdn.discordapp.com/attachments/756329106953601225/776908227476062258/images_4.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Flag_of_Senegal.svg/1200px-Flag_of_Senegal.svg.png"
    ];
    var x2 = ["البرازيل", "الاردن", "مصر", "السنغال"];
    var x3 = Math.floor(Math.random() * x.length);
    var flag = new Discord.RichEmbed()
      .setImage(`${x[x3]}`)
      .setTitle(`**اسرع شخص يرسل العلم خلال __10__ ثواني**`);
    message.channel.sendEmbed(flag).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark: **لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
         الصحيحةة هيا** ***${x2[x3]}***`);
      });

      r.then(collected => {
        message.channel.send(
          `${collected.first().author}**لقد قمت بالاجابه بشكل صحيح**`
        );
      });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

const cuttweet = [
  "كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟",
  "كت تويت | أكثر شيء يُسكِت الطفل برأيك؟",
  "كت تويت | الحرية لـ ... ؟",
  "كت تويت | قناة الكرتون المفضلة في طفولتك؟",
  "كت تويت ‏| كلمة للصُداع؟",
  "كت تويت ‏| ما الشيء الذي يُفارقك؟",
  "كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟",
  "كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟",
  "كت تويت | بعد ١٠ سنين ايش بتكون ؟",
  "كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟",
  "‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟",
  "كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟",
  "‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟",
  "‏كت تويت | وش يفسد الصداقة؟",
  "‏كت تويت | شخص لاترفض له طلبا ؟",
  "‏كت تويت | كم مره خسرت شخص تحبه؟.",
  "‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟",
  "‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟",
  "‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!",
  "‏كت تويت |أقوى كذبة مشت عليك ؟",
  "‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟",
  "كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟",
  "‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟",
  "‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟",
  "‏كت تويت | وش محتاج عشان تكون مبسوط ؟",
  "‏كت تويت | مطلبك الوحيد الحين ؟",
  "‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟"
];

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (
    message.content.startsWith(prefix + "cut") ||
    message.content.startsWith(prefix + "كت")
  ) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");
    var embed = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .addField(
        "لعبه كت تويت",
        `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`
      );
    message.channel.sendEmbed(embed);

    console.log("[id] Send By: " + message.author.username);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (
    message.content == prefix + "emoji" ||
    message.content == prefix + "ايموجي"
  ) {
    var x = ["🌚", "😂", "🥶", "😷", "🌻", "🌗", "✨", "🍐", "🚗", "💽"];
    var x2 = ["🌚", "😂", "🥶", "😷", "🌻", "🌗", "✨", "🍐", "🚗", "💽"];
    var x3 = Math.floor(Math.random() * x.length);
    var emoji = new Discord.RichEmbed()
      .setTitle(`** لديك __10 ثواني__ لكتابة الايموجي **`)
      .addField(`${x[x3]}`);
    message.channel.sendEmbed(emoji).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark:** لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
       الصحيحة هيا __${x2[x3]}__ **`);
      });

      r.then(collected => {
        message.channel.send(
          `${
            collected.first().author
          } ** لقد قمت بكتابة الايموجي في الوقت المناسب `
        );
      });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "xo")) {
    let array_of_mentions = message.mentions.users.array();
    let symbols = [":o:", ":heavy_multiplication_x:"];
    var grid_message;

    if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
      let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
      let random2 = Math.abs(random1 - 1);
      if (array_of_mentions.length == 1) {
        random1 = 0;
        random2 = 0;
      }
      var player1_id = message.author.id;
      let player2_id = array_of_mentions[random2].id;
      var turn_id = player1_id;
      var symbol = symbols[0];
      let initial_message = `اللعبة بين اللاعبين التاليين <@${player1_id}> and <@${player2_id}>!`;
      if (player1_id == player2_id) {
        initial_message += "\n_(لقد خسرت, العب مع نفسك :joy:)_";
      }
      message.channel
        .send(`Xo ${initial_message}`)
        .then(console.log("Successful tictactoe introduction"))
        .catch(console.error);
      message.channel
        .send(
          ":one::two::three:" +
            "\n" +
            ":four::five::six:" +
            "\n" +
            ":seven::eight::nine:"
        )
        .then(new_message => {
          grid_message = new_message;
        })
        .then(console.log("Successful tictactoe game initialization"))
        .catch(console.error);
      message.channel
        .send("Loading... Please wait for the :ok: reaction.")
        .then(async new_message => {
          await new_message.react("1⃣");
          await new_message.react("2⃣");
          await new_message.react("3⃣");
          await new_message.react("4⃣");
          await new_message.react("5⃣");
          await new_message.react("6⃣");
          await new_message.react("7⃣");
          await new_message.react("8⃣");
          await new_message.react("9⃣");
          await new_message.react("🆗");
          await new_message
            .edit(`It\'s <@${turn_id}>\'s اشتغل! الرمز هو ${symbol}`)
            .then(new_new_message => {
              require("./xo.js")(
                client,
                message,
                new_new_message,
                player1_id,
                player2_id,
                turn_id,
                symbol,
                symbols,
                grid_message
              );
            })
            .then(
              console.log("Successful tictactoe listeprefix initialization")
            )
            .catch(console.error);
        })
        .then(console.log("Successful tictactoe react initialization"))
        .catch(console.error);
    } else {
      message.channel
        .send(`جرب *xo @uesr`)
        .then(console.log("Successful error reply"))
        .catch(console.error);
    }
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async function(message) {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "rps")) {
    let messageArgs = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
      .addField("Rock", "🇷", true)
      .addField("Paper", "🇵", true)
      .addField("Scissors", "🇸", true);
    message.channel.send(RpsEmbed).then(msg => {
      msg.react("🇸");
      msg.react("🇷");
      msg
        .react("🇵")
        .then(() => msg.react("🇸"))
        .then(() => msg.react("🇷"))
        .then(() => msg.react("🇵"));
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "🇸" && user.id === message.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "🇷" && user.id === message.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "🇵" && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 12000
      });

      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 12000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 12000
      });
      reaction1.on("collect", r => {
        message.channel.send(result);
      });
      reaction2.on("collect", r => {
        message.channel.send(result);
      });
      reaction3.on("collect", r => {
        message.channel.send(result);
      });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === prefix + `8ball`) {
    if (!args[1]) return message.reply("Please ask a full question!");
    let replies = ["Yes", "No.", "I don't know.", "Ask again later plez."];

    let result = Math.floor(Math.random() * replies.length);
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
      .setAuthor(message.author.tag)
      .addField("Question", question)
      .addField("Answer", replies[result]);

    message.channel.send(ballembed);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

var statuss = [`${PREFIX}help`, "BEST SYSTEM BOT | ZK-system", "ZKEYER SYSTEM"];
var secound = 5;
client.on("ready", () => {
  var timeing = Math.floor(secound * 1000);
  setInterval(function() {
    var ammount = statuss.length;
    var num = Math.floor(Math.random() * ammount);
    client.user.setActivity(statuss[num], {
      type: "PLAYING",
      url: "https://twitch.tv/NCR_NIRO_THE_MOON"
    });
  }, timeing);
});

client.on("message", msg => {
  if (msg.content === prefix + "uptime") {
    let days = Math.floor(client.uptime / 86400000);

    let hours = Math.floor(client.uptime / 3600000) % 24;

    let minutes = Math.floor(client.uptime / 60000) % 60;

    let seconds = Math.floor(client.uptime / 1000) % 60;

    const up = new Discord.niroEmbed()

      .setColor("#44ff00")

      .setThumbnail(client.user.avatarURL())

      .setTitle("**__Uptime :__**")

      .setAuthor(client.user.username, client.user.avatarURL())

      .addField("**-**", `**${seconds}**` + " **seconds**")

      .addField("**-**", `**${minutes}**` + " **minutes**")

      .addField("**-**", `**${hours}**` + " **hours**")

      .addField("**-**", `**${days}**` + " **days**");

    msg.channel.send(up);
  }
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (
    message.content.startsWith(prefix + "frots") ||
    message.content.startsWith(prefix + "فواكه")
  ) {
    let slot1 = ["🍏", "🍇", "🍒", "🍍", "🍅", "🍆", "🍑", "🍓"];
    let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
    let we;
    if (slots1 === slots2 && slots2 === slots3) {
      we = "Win!";
    } else {
      we = "Lose!";
    }
    message.channel.send(`${slots1} | ${slots2} | ${slots3} - ${we}`);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

const Sra7a = [
  "صراحه  |  صوتك حلوة؟",
  "صراحه  |  التقيت الناس مع وجوهين؟",
  "صراحه  |  شيء وكنت تحقق اللسان؟",
  "صراحه  |  أنا شخص ضعيف عندما؟",
  "صراحه  |  هل ترغب في إظهار حبك ومرفق لشخص أو رؤية هذا الضعف؟",
  "صراحه  |  يدل على أن الكذب مرات تكون ضرورية شي؟",
  "صراحه  |  أشعر بالوحدة على الرغم من أنني تحيط بك كثيرا؟",
  "صراحه  |  كيفية الكشف عن من يكمن عليك؟",
  "صراحه  |  إذا حاول شخص ما أن يكرهه أن يقترب منك ويهتم بك تعطيه فرصة؟",
  "صراحه  |  أشجع شيء حلو في حياتك؟",
  'صراحه  |  طريقة جيدة يقنع حتى لو كانت الفكرة خاطئة" توافق؟',
  "صراحه  |  كيف تتصرف مع من يسيئون فهمك ويأخذ على ذهنه ثم ينتظر أن يرفض؟",
  "صراحه  |  التغيير العادي عندما يكون الشخص الذي يحبه؟",
  "صراحه  |  المواقف الصعبة تضعف لك ولا ترفع؟",
  "صراحه  |  نظرة و يفسد الصداقة؟",
  "صراحه  |  ‏‏إذا أحد قالك كلام سيء بالغالب وش تكون ردة فعلك؟",
  "صراحه  |  شخص معك بالحلوه والمُره؟",
  "صراحه  |  ‏هل تحب إظهار حبك وتعلقك بالشخص أم ترى ذلك ضعف؟",
  "صراحه  |  تأخذ بكلام اللي ينصحك ولا تسوي اللي تبي؟",
  "صراحه  |  وش تتمنى الناس تعرف عليك؟",
  "صراحه  |  ابيع المجرة عشان؟",
  "صراحه  |  أحيانا احس ان الناس ، كمل؟",
  "صراحه  |  مع مين ودك تنام اليوم؟",
  "صراحه  |  صدفة العمر الحلوة هي اني؟",
  'صراحه  |  الكُره العظيم دايم يجي بعد حُب قوي " تتفق؟',
  "صراحه  |  صفة تحبها في نفسك؟",
  'صراحه  |  ‏الفقر فقر العقول ليس الجيوب " ، تتفق؟',
  "صراحه  |  تصلي صلواتك الخمس كلها؟",
  "صراحه  |  ‏تجامل أحد على راحتك؟",
  "صراحه  |  اشجع شيء سويتة بحياتك؟",
  "صراحه  |  وش ناوي تسوي اليوم؟",
  "صراحه  |  وش شعورك لما تشوف المطر؟",
  "صراحه  |  غيرتك هاديه ولا تسوي مشاكل؟",
  "صراحه  |  ما اكثر شي ندمن عليه؟",
  "صراحه  |  اي الدول تتمنى ان تزورها؟",
  "صراحه  |  متى اخر مره بكيت؟",
  "صراحه  |  تقيم حظك ؟ من عشره؟",
  "صراحه  |  هل تعتقد ان حظك سيئ؟",
  "صراحه  |  شـخــص تتمنــي الإنتقــام منـــه؟",
  "صراحه  |  كلمة تود سماعها كل يوم؟",
  "صراحه  |  **هل تُتقن عملك أم تشعر بالممل؟",
  "صراحه  |  هل قمت بانتحال أحد الشخصيات لتكذب على من حولك؟",
  "صراحه  |  متى آخر مرة قمت بعمل مُشكلة كبيرة وتسببت في خسائر؟",
  "صراحه  |  ما هو اسوأ خبر سمعته بحياتك؟",
  "‏صراحه | هل جرحت شخص تحبه من قبل ؟",
  "صراحه  |  ما هي العادة التي تُحب أن تبتعد عنها؟",
  "‏صراحه | هل تحب عائلتك ام تكرههم؟",
  "‏صراحه  |  من هو الشخص الذي يأتي في قلبك بعد الله – سبحانه وتعالى- ورسوله الكريم – صلى الله عليه وسلم؟",
  "‏صراحه  |  هل خجلت من نفسك من قبل؟",
  "‏صراحه  |  ما هو ا الحلم  الذي لم تستطيع ان تحققه؟",
  "‏صراحه  |  ما هو الشخص الذي تحلم به كل ليلة؟",
  "‏صراحه  |  هل تعرضت إلى موقف مُحرج جعلك تكره صاحبهُ؟",
  "‏صراحه  |  هل قمت بالبكاء أمام من تُحب؟",
  "‏صراحه  |  ماذا تختار حبيبك أم صديقك؟",
  "‏صراحه  | هل حياتك سعيدة أم حزينة؟",
  "صراحه  |  ما هي أجمل سنة عشتها بحياتك؟",
  "‏صراحه  |  ما هو عمرك الحقيقي؟",
  "‏صراحه  |  ما اكثر شي ندمن عليه؟",
  "صراحه  |  ما هي أمنياتك المُستقبلية؟‏",
  "صراحه | نفسك فـ ايه ؟",
  "صراحه | هل تحب فتاه او احببت من قبل ؟",
  "صراحه | هل شكلك حلو او جيد او متوسط او سئ ؟",
  "صراحه | ما هي الماده الدراسيه التي تحبها اكثر وتفضلها؟",
  "صراحه | هل تحب مدرستك ؟",
  "صراحه | ما الشئ الذي تتمني ان يحصل ؟",
  "صراحه | هل تحب عائلتك ؟"
];
client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "sara7a")) {
    if (!message.channel.guild)
      return message.reply("** This command only for servers **");
    var client = new Discord.RichEmbed()
      .setTitle("لعبة صراحة ..")
      .setDescription(`${Sra7a[Math.floor(Math.random() * Sra7a.length)]}`)
      .setImage(
        "https://cdn.discordapp.com/attachments/371269161470525444/384103927060234242/125.png"
      )
      .setTimestamp();

    message.channel.sendEmbed(client);
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (
    message.content == prefix + "translation" ||
    message.content == prefix + "ترجمه"
  ) {
    var x = [
      "Constantinople",
      "Clever",
      "apple",
      "day",
      "browser",
      "cocked",
      "Tomatoes",
      "Connect",
      "coconut"
    ];
    var x2 = [
      "القسطنطينيه",
      "ذكي",
      "تفاح",
      "يوم",
      "متصفح",
      "مطبوخ",
      "طماطم",
      "اتصال",
      "ك"
    ];
    var x3 = Math.floor(Math.random() * x.length);
    var emoji = new Discord.RichEmbed()
      .setTitle(`** لديك __10 ثواني__ لكتابة الترجمه**`)
      .addField(`${x[x3]}`);
    message.channel.sendEmbed(emoji).then(msg1 => {
      var r = message.channel.awaitMessages(msg => msg.content == x2[x3], {
        maxMatches: 1,
        time: 20000,
        errors: ["time"]
      });
      r.catch(() => {
        return message.channel
          .send(`:negative_squared_cross_mark:** لقد انتهى الوقت ولم يقم أحد بالأجابة بشكل صحيح 
       الصحيحة هيا __${x2[x3]}__ **`);
      });

      r.then(collected => {
        message.channel.send(
          `${
            collected.first().author
          } ** لقد قمت بكتابة الترجمه في الوقت المناسب **`
        );
      });
    });
  }
});

const ytdl = require("ytdl-core");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const util = require("util");
const { get } = require("snekfetch");
const guild = require("guild");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(youtubekey);
const getYoutubeID = require("get-youtube-id");
const queue = new Map();

client.on("ready", () => {
  console.log(`${client.user.tag}`);
  console.log(`${client.guilds.size} Servers`);
  console.log(`${client.users.size} Members`);
  console.log(`${client.channels.size} Channels`);
  console.log(`[ ${client.guilds.map(g => g.name).join(", \n ")} ]`);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

let cmds = {
  play: { cmd: "play", a: ["p", "شغل", "تشغيل"] },
  skip: { cmd: "skip", a: ["s", "تخطي", "next"] },
  stop: { cmd: "stop", a: ["ايقاف", "توقف"] },
  pause: { cmd: "pause", a: ["لحظة", "مؤقت"] },
  resume: { cmd: "resume", a: ["r", "اكمل", "استكمال"] },
  volume: { cmd: "volume", a: ["vol", "صوت"] },
  queue: { cmd: "queue", a: ["q", "list", "قائمة"] },
  repeat: { cmd: "repeat", a: ["re", "تكرار", "اعادة"] },
  forceskip: { cmd: "forceskip", a: ["fs", "fskip"] },
  skipto: { cmd: "skipto", a: ["st", "تخطي الي"] },
  nowplaying: { cmd: "Nowplaying", a: ["np", "الان"] }
};

Object.keys(cmds).forEach(key => {
  var value = cmds[key];
  var command = value.cmd;
  client.commands.set(command, command);

  if (value.a) {
    value.a.forEach(alias => {
      client.aliases.set(alias, command);
    });
  }
});

let active = new Map();

client.on("warn", console.warn);

client.on("error", console.error);

client.on("message", async (message, msg) => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";

  let cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));

  let s;

  if (cmd === "play") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.send(
        `:no_entry_sign: You must be listening in a voice channel to use that!`
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        `:no_entry_sign: I can't join Your voiceChannel because i don't have ` +
          "`" +
          "`CONNECT`" +
          "`" +
          ` permission!`
      );
    }

    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        `:no_entry_sign: I can't SPEAK in your voiceChannel because i don't have ` +
          "`" +
          "`SPEAK`" +
          "`" +
          ` permission!`
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();

      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(`Added to queue: ${playlist.title}`);
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(args, 1);

          // eslint-disable-next-line max-depth
          var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send("I can't find any thing");
        }
      }

      return handleVideo(video, msg, voiceChannel);
    }

    async function handleVideo(video, msg, voiceChannel, playlist = false) {
      const serverQueue = active.get(msg.guild.id);

      //	console.log('yao: ' + Util.escapeMarkdown(video.thumbnailUrl));

      let hrs =
        video.duration.hours > 0
          ? video.duration.hours > 9
            ? `${video.duration.hours}:`
            : `0${video.duration.hours}:`
          : "";
      let min =
        video.duration.minutes > 9
          ? `${video.duration.minutes}:`
          : `0${video.duration.minutes}:`;
      let sec =
        video.duration.seconds > 9
          ? `${video.duration.seconds}`
          : `0${video.duration.seconds}`;
      let dur = `${hrs}${min}${sec}`;

      let ms = video.durationSeconds * 1000;

      const song = {
        id: video.id,
        title: video.title,
        duration: dur,
        msDur: ms,
        url: `https://www.youtube.com/watch?v=${video.id}`
      };
      if (!serverQueue) {
        const queueConstruct = {
          textChannel: msg.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [], // حسن كههربا

          volume: 50,
          requester: msg.author,
          playing: true,
          repeating: false
        };
        active.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error(`I could not join the voice channel: ${error}`);
          active.delete(msg.guild.id);
          return msg.channel.send(`I cant join this voice channel`);
        } // حسن كههربا
      } else {
        serverQueue.songs.push(song);

        if (playlist) return undefined;
        if (!args) return msg.channel.send("no results.");
        else
          return msg.channel
            .send(":watch: Loading... [`" + args + "`]")
            .then(m => {
              setTimeout(() => {
                //:watch: Loading... [let]
                m.edit(
                  `:notes: Added **${song.title}**` +
                    "(` " +
                    song.duration +
                    ")`" +
                    ` to the queue at position ` +
                    `${serverQueue.songs.length}`
                );
              }, 500);
            });
      }
      return undefined;
    }

    function play(guild, song) {
      const serverQueue = active.get(guild.id);

      if (!song) {
        serverQueue.voiceChannel.leave();
        active.delete(guild.id);
        return;
      }
      //console.log(serverQueue.songs);
      if (serverQueue.repeating) {
        console.log("Repeating");
      } else {
        serverQueue.textChannel.send(
          ":notes: Added **" +
            song.title +
            "** (`" +
            song.duration +
            "`) to begin playing."
        );
      }
      const dispatcher = serverQueue.connection
        .playStream(ytdl(song.url))
        .on("end", reason => {
          //if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
          //else console.log(reason);
          if (serverQueue.repeating) return play(guild, serverQueue.songs[0]);
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(serverQueue.volume / 100);

      // حسن كههربا
    }
  } else if (cmd === "stop") {
    if (msg.guild.me.voiceChannel !== msg.member.voiceChannel)
      return msg.channel.send(
        `You must be in ${msg.guild.me.voiceChannel.name}`
      );
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.react("❌");
      return msg.channel.send("You don't have permission `ADMINSTRATOR`");
    }
    let queue = active.get(msg.guild.id);
    if (queue.repeating)
      return msg.channel.send(
        "Repeating Mode is on, you can't stop the music, run `" +
          `${prefix}repeat` +
          "` to turn off it."
      );
    queue.songs = [];
    queue.connection.dispatcher.end();
    return msg.channel.send(
      ":notes: The player has stopped and the queue has been cleared."
    );
    // 04
  } else if (cmd === "skip") {
    let vCh = msg.member.voiceChannel;

    let queue = active.get(msg.guild.id);

    if (!vCh)
      return msg.channel.send(
        "Sorry, but you can't because you are not in voice channel"
      );

    if (!queue) return msg.channel.send("No music playing to skip it");

    if (queue.repeating)
      return msg.channel.send(
        "You can't skip it, because repeating mode is on, run " +
          `\`${prefix}forceskip\``
      );
    // 14
    let req = vCh.members.size - 1;

    if (req == 1) {
      msg.channel.send("**:notes: Skipped **" + args);
      return queue.connection.dispatcher.end("Skipping ..");
    }

    if (!queue.votes) queue.votes = [];

    if (queue.votes.includes(msg.member.id))
      return msg.say(
        `You already voted for skip! ${queue.votes.length}/${req}`
      );

    queue.votes.push(msg.member.id);

    if (queue.votes.length >= req) {
      msg.channel.send("**:notes: Skipped **" + args);

      delete queue.votes;

      return queue.connection.dispatcher.end("Skipping ..");
    }

    msg.channel.send(
      `**You have successfully voted for skip! ${queue.votes.length}/${req}**`
    );
  } else if (cmd === "pause") {
    let queue = active.get(msg.guild.id);

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(`You are not in my voice channel.`);

    if (!queue) {
      return msg.channel.send("No music playing to pause.");
    }

    if (!queue.playing)
      return msg.channel.send(
        ":no_entry_sign: There must be music playing to use that!"
      );

    let disp = queue.connection.dispatcher;

    disp.pause("Pausing..");

    queue.playing = false;
    // 2002
    msg.channel.send(
      ":notes: Paused " + args + ". **Type** `" + prefix + "resume` to unpause!"
    );
  } else if (cmd === "resume") {
    let queue = active.get(msg.guild.id);

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(`You are not in my voice channel.`);

    if (!queue) return msg.channel.send(":notes: No music paused to resume.");

    if (queue.playing)
      return msg.channel.send(":notes: No music paused to resume.");

    let disp = queue.connection.dispatcher;

    disp.resume("Resuming..");

    queue.playing = true;

    msg.channel.send(":notes: Resumed.");
  } else if (cmd === "volume") {
    let queue = active.get(msg.guild.id);

    if (!queue || !queue.songs)
      return msg.channel.send(
        ":notes: There is no music playing to set volume."
      );

    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send(":notes: You are not in my voice channel");

    let disp = queue.connection.dispatcher;

    if (isNaN(args[0])) return msg.channel.send(":notes: Numbers only!");

    if (parseInt(args[0]) > 100)
      return msg.channel.send("You can't set the volume more than 100.");
    //:speaker: Volume changed from 20 to 20 ! The volume has been changed from ${queue.volume} to ${args[0]}
    msg.channel.send(
      ":speaker: Volume has been **changed** from (`" +
        queue.volume +
        "`) to (`" +
        args[0] +
        "`)"
    );

    queue.volume = args[0];
    // 14-04-2002
    disp.setVolumeLogarithmic(queue.volume / 100);
  } else if (cmd === "queue") {
    let queue = active.get(msg.guild.id);

    if (!queue)
      return msg.channel.send(
        ":no_entry_sign: There must be music playing to use that!"
      );

    let embed = new Discord.RichEmbed().setAuthor(
      `${client.user.username}`,
      client.user.displayAvatarURL
    );
    let text = "";

    for (var i = 0; i < queue.songs.length; i++) {
      let num;
      if (i > 8) {
        let st = `${i + 1}`;
        let n1 = converter.toWords(st[0]);
        let n2 = converter.toWords(st[1]);
        num = `:${n1}::${n2}:`;
      } else {
        let n = converter.toWords(i + 1);
        num = `:${n}:`;
      }
      text += `${num} ${queue.songs[i].title} [${queue.songs[i].duration}]\n`;
    }
    embed.setDescription(`Songs Queue | ${msg.guild.name}\n\n ${text}`);
    msg.channel.send(embed);
    // 14-04-2002
  } else if (cmd === "repeat") {
    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);

    if (!queue || !queue.songs)
      return msg.channel.send("There is no music playing to repeat it.");

    if (queue.repeating) {
      queue.repeating = false;
      return msg.channel.send(
        ":arrows_counterclockwise: **Repeating Mode** (`False`)"
      );
    } else {
      queue.repeating = true;
      return msg.channel.send(
        ":arrows_counterclockwise: **Repeating Mode** (`True`)"
      );
    }
  } else if (cmd === "forceskip") {
    let vCh = msg.member.voiceChannel;

    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);
    // 14-04-2002
    if (queue.repeating) {
      queue.repeating = false;

      msg.channel.send("ForceSkipped, Repeating mode is on.");

      queue.connection.dispatcher.end("ForceSkipping..");

      queue.repeating = true;
    } else {
      // 14-04-2002
      queue.connection.dispatcher.end("ForceSkipping..");

      msg.channel.send("ForceSkipped.");
    }
  } else if (cmd === "skipto") {
    let vCh = msg.member.voiceChannel;
    // 14-04-2002
    if (!vCh || vCh !== msg.guild.me.voiceChannel)
      return msg.channel.send("You are not in my voice channel");

    let queue = active.get(msg.guild.id);

    if (!queue.songs || queue.songs < 2)
      return msg.channel.send("There is no music to skip to.");

    if (queue.repeating)
      return msg.channel.send(
        "You can't skip, because repeating mode is on, run " +
          `\`${prefix}repeat\` to turn off.`
      );

    if (!args[0] || isNaN(args[0]))
      return msg.channel.send(
        "Please input song number to skip to it, run " +
          prefix +
          `queue` +
          " to see songs numbers."
      );
    // 14-04-2002
    let sN = parseInt(args[0]) - 1;

    if (!queue.songs[sN])
      return msg.channel.send("There is no song with this number.");

    let i = 1;

    msg.channel.send(
      `Skipped to: **${queue.songs[sN].title}[${queue.songs[sN].duration}]**`
    );

    while (i < sN) {
      i++;
      queue.songs.shift();
    }

    queue.connection.dispatcher.end("SkippingTo..");
    // 14-04-2002
  } else if (cmd === "Nowplaying") {
    let q = active.get(msg.guild.id);

    let now = npMsg(q);

    msg.channel.send(now.mes, now.embed).then(me => {
      setInterval(() => {
        let noww = npMsg(q);
        me.edit(noww.mes, noww.embed);
      }, 5000);
    });

    function npMsg(queue) {
      let m =
        !queue || !queue.songs[0] ? "No music playing." : "Now Playing...";

      const eb = new Discord.RichEmbed();

      eb.setColor(msg.guild.me.displayHexColor);

      if (!queue || !queue.songs[0]) {
        // 14-04-2002
        eb.setTitle("No music playing");
        eb.setDescription(
          "\u23F9 " + bar(-1) + " " + volumeIcon(!queue ? 100 : queue.volume)
        );
      } else if (queue.songs) {
        if (queue.requester) {
          let u = msg.guild.members.get(queue.requester.id);

          if (!u) eb.setAuthor("Unkown (ID:" + queue.requester.id + ")");
          else eb.setAuthor(u.user.tag, u.user.displayAvatarURL);
        }

        if (queue.songs[0]) {
          try {
            eb.setTitle(queue.songs[0].title);
            eb.setURL(queue.songs[0].url);
          } catch (e) {
            eb.setTitle(queue.songs[0].title);
          }
        }
        eb.setDescription(embedFormat(queue));
      } // 14-04-2002

      return {
        mes: m,
        embed: eb
      };
    }

    function embedFormat(queue) {
      if (!queue || !queue.songs) {
        return "No music playing\n\u23F9 " + bar(-1) + " " + volumeIcon(100);
      } else if (!queue.playing) {
        return (
          "No music playing\n\u23F9 " + bar(-1) + " " + volumeIcon(queue.volume)
        );
      } else {
        let progress = queue.connection.dispatcher.time / queue.songs[0].msDur;
        let prog = bar(progress);
        let volIcon = volumeIcon(queue.volume);
        let playIcon = queue.connection.dispatcher.paused ? "\u23F8" : "\u25B6";
        let dura = queue.songs[0].duration;

        return (
          playIcon +
          " " +
          prog +
          " `[" +
          formatTime(queue.connection.dispatcher.time) +
          "/" +
          dura +
          "]`" +
          volIcon
        );
      }
    }

    function formatTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      return (hours > 0 ? hours + ":" : "") + minutes + ":" + seconds;
    }

    function bar(precent) {
      var str = "";

      for (var i = 0; i < 12; i++) {
        let pre = precent;
        let res = pre * 12;

        res = parseInt(res);

        if (i == res) {
          str += "\uD83D\uDD18";
        } else {
          str += "▬";
        }
      }

      return str;
    }

    function volumeIcon(volume) {
      if (volume == 0) return "\uD83D\uDD07";
      if (volume < 30) return "\uD83D\uDD08";
      if (volume < 70) return "\uD83D\uDD09";
      return "\uD83D\uDD0A";
    }
  }
});

fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

let antibots = JSON.parse(fs.readFileSync("./data/antibots.json", "utf8"));
client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "antibots on")) {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    antibots[message.guild.id] = {
      onoff: "On"
    };
    message.channel.send(`**AntiBots Join Is On**`);
    fs.writeFile("./data/antibots.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "antibots off")) {
    if (!message.channel.guild) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    antibots[message.guild.id] = {
      onoff: "Off"
    };
    message.channel.send(`**AntiBots Join Is Off**`);
    fs.writeFile("./data/antibots.json", JSON.stringify(antibots), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("guildMemberAdd", member => {
  if (!antibots[member.guild.id])
    antibots[member.guild.id] = {
      onoff: "Off"
    };
  if (antibots[member.guild.id].onoff === "Off") return;
  if (member.user.bot) return member.kick();
});

fs.writeFile("./antibots.json", JSON.stringify(antibots), err => {
  if (err)
    console.error(err).catch(err => {
      console.error(err);
    });
});

let anti = JSON.parse(fs.readFileSync("./data/antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./data/config.json", "UTF8"));
client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id];
  let num = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (!anti[message.guild.id + message.author.id])
    anti[message.guild.id + message.author.id] = {
      actions: 0
    };
  if (!config[message.guild.id])
    config[message.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (message.content.startsWith(prefix + "limit")) {
    if (!message.member.hasPermission("MANAGE_GUILD")) return;
    if (message.content.startsWith(prefix + "limitbans")) {
      if (!num) return message.channel.send("**→ | Supply a number !");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `**→ | Changed bans limit to : ${config[message.guild.id].banLimit}.**`
      );
    }
    if (message.content.startsWith(prefix + "limitkicks")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `**→ | Changed kicks limit to : ${config[message.guild.id].kickLimits}.**`
      );
    }
    if (message.content.startsWith(prefix + "limitroleDelete")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `**→ | Changed Role Deleting limit to : ${config[message.guild.id].roleDelLimit}.**`
      );
    }
    if (message.content.startsWith(prefix + "limitroleCreate")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `**→ | Changed Role Creation limit to : ${config[message.guild.id].roleCrLimits}.**`
      );
    }
    if (message.content.startsWith(prefix + "limitchannelDelete")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `**→ | Changed Channel Deleting limit to : ${config[message.guild.id].chaDelLimit}.**`
      );
    }
    if (message.content.startsWith(prefix + "limittime")) {
      if (!num) return message.channel.send("**→ | Supply a number !**");
      if (isNaN(num)) return message.channel.send("**→ | Supply a number !**");
      config[message.guild.id].time = num;
      message.channel.send(
        `**→ | Changed Times limit to : ${config[message.guild.id].time}.**`
      );
    }
    fs.writeFile(
      "./data/config.json",
      JSON.stringify(config, null, 2),
      function(e) {
        if (e) throw e;
      }
    );
    fs.writeFile(
      "./data/antigreff.json",
      JSON.stringify(anti, null, 2),
      function(e) {
        if (e) throw e;
      }
    );
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor; //btrolie
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3 //btrolie
    };
  if (!anti[channel.guild.id + entry.id]) {
    //btrolie
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    ); //btrolie
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000); //btrolie
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**→ | ${entry.username} , Deleted many __Channles__.**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile(
        "./data/config.json",
        JSON.stringify(config, null, 2),
        function(e) {
          //btrolie
          if (e) throw e;
        }
      );
      fs.writeFile(
        "./data/antigreff.json",
        JSON.stringify(anti, null, 2),
        function(e) {
          if (e) throw e;
        }
      );
    }
  }

  fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function(
    e
  ) {
    if (e) throw e;
  });
  fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function(
    e
  ) {
    if (e) throw e;
  });
});

client.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3, //btrolie
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**→ | ${entry.username} , Deleted many __Roles__!**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile(
        "./data/config.json",
        JSON.stringify(config, null, 2),
        function(e) {
          if (e) throw e;
        }
      );
      fs.writeFile(
        "./data/antigreff.json",
        JSON.stringify(anti, null, 2),
        function(e) {
          if (e) throw e;
        }
      );
    }
  }

  fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function(
    e
  ) {
    if (e) throw e;
  });
  fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function(
    e
  ) {
    if (e) throw e;
  });
});

client.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleCrLimits
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**→ | ${entry.username} , is creating many __Rooms__.**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile(
        "./data/config.json",
        JSON.stringify(config, null, 2),
        function(e) {
          if (e) throw e;
        }
      );
      fs.writeFile(
        "./data/antigreff.json",
        JSON.stringify(anti, null, 2),
        function(e) {
          if (e) throw e;
        }
      );
    }
  }

  fs.writeFile("./data/config.json", JSON.stringify(config, null, 2), function(
    e
  ) {
    if (e) throw e;
  });
  fs.writeFile("./data/antigreff.json", JSON.stringify(anti, null, 2), function(
    e
  ) {
    if (e) throw e;
  });
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "antifake on")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    antijoin[message.guild.id] = {
      onoff: "On"
    };
    message.channel.send(`**✅ The AntiJoin Is __𝐎𝐍__ !**`);
    fs.writeFile("./data/antijoin.json", JSON.stringify(antijoin), err => {
      if (err)
        return console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "antifake off")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    antijoin[message.guild.id] = {
      onoff: "Off"
    };
    message.channel.send(`**⛔ The AntiJoin Is __𝐎𝐅𝐅__ !**`);
    fs.writeFile("./data/antijoin.json", JSON.stringify(antijoin), err => {
      if (err)
        return console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "setfake")) {
    let time = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!time)
      return message.channel.send(
        "Please Type The Account Created Time [Days]"
      );
    let embed = new Discord.RichEmbed()
      .setTitle("**Done The AntiJoin Code Has Been Setup**")
      .addField("Account Create Time:", `${time}.`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    antijoin[message.guild.id] = {
      created: time,
      onoff: "On"
    };
    fs.writeFile("./data/antijoin.json", JSON.stringify(antijoin), err => {
      if (err) console.error(err);
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("guildMemberAdd", async member => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (!antijoin[member.guild.id])
    antijoin[member.guild.id] = {
      onoff: "Off"
    };
  if (antijoin[member.guild.id].onoff === "Off") return;
  if (!member.user.bot) return;
  let accounttime = `${antijoin[member.guild.id].created}`;
  let moment2 = require("moment-duration-format"),
    moment = require("moment"),
    date = moment.duration(new Date() - member.user.createdAt).format("d");

  if (date < accounttime) {
    member.ban(
      `Member account age is lower than ${antijoin[member.guild.id].created} days.`
    );
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

let spread = JSON.parse(fs.readFileSync("./data/spread.json", "utf8"));

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "antispread off")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    spread[message.guild.id] = {
      onoff: "Off"
    };
    message.channel.send(`**⛔ The AntiSpread Is __𝐎𝐅𝐅__ !**`);
    fs.writeFile("./data/spread.json", JSON.stringify(spread), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});

client.on("message", async message => {
  if (!prefixes[message.guild.id])
    prefixes[message.guild.id] = {
      prefix: `${PREFIX}`
    };

  var prefix = prefixes[message.guild.id].prefix;

  let Blacklist = await db.fetch(`Blacklist_${message.author.id}`);

  if (Blacklist === "on") return message.channel.send(``);
  if (message.content.startsWith(prefix + "antispread on")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    spread[message.guild.id] = {
      onoff: "On"
    };
    message.channel.send(`**✅ The AntiSpread Is __𝐎𝐍__ !**`);
    fs.writeFile("./data/spread.json", JSON.stringify(spread), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});
fs.writeFile("./data/prefix.json", JSON.stringify(prefixes), err => {
  if (err) console.error(err);
});
client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("http://www.gmail.com/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("https://www.snapchat.com/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("https://www.instagram.com/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("https://www.twitter.com/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("http://www.facebook.com/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("https://www.youtube.com/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});

client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("https://www.discordapp.com/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});
client.on("message", message => {
  var args = message.content.split(/[ ]+/);
  if (message.content.includes("https://discord.gg/")) {
    if (!spread[message.guild.id])
      spread[message.guild.id] = {
        onoff: "Off"
      };
    if (spread[message.guild.id].onoff === "Off") return;
    message.delete();
    return message.reply(
      `**⛔ The Antispread ON ! So You Cant spread Here !**`
    );
  }
});

const log = JSON.parse(fs.readFileSync("./data/log.json", "utf8"));

client.on("message", message => {
  if (!message.channel.guild) return;

  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find("name", `${room}`);
  if (message.content.startsWith(prefix + "setlog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send("Please Type The Log Channel Name");
    let embed = new Discord.RichEmbed()
      .setTitle("**Done The Log Code Has Been Setup**")
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On"
    };
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err) console.error(err);
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleLog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!log[message.guild.id])
      log[message.guild.id] = {
        onoff: "Off"
      };
    if (log[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`**The log Is __𝐎𝐍__ !**`),
        (log[message.guild.id].onoff = "On")
      ];
    if (log[message.guild.id].onoff === "On")
      return [
        message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`),
        (log[message.guild.id].onoff = "Off")
      ];
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[message.guild.id])
    log[message.guild.id] = {
      onoff: "Off"
    };
  if (log[message.guild.id].onoff === "Off") return;
  var logChannel = message.guild.channels.find(
    c => c.name === `${log[message.guild.id].channel}`
  );
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[oldRole.guild.id])
    log[oldRole.guild.id] = {
      onoff: "Off"
    };
  if (log[oldRole.guild.id].onoff === "Off") return;
  var logChannel = oldRole.guild.channels.find(
    c => c.name === `${log[oldRole.guild.id].channel}`
  );
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldRole.name !== newRole.name) {
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateName = new Discord.RichEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateColor = new Discord.RichEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateColor);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  if (!log[oldChannel.guild.id])
    log[oldChannel.guild.id] = {
      onoff: "Off"
    };
  if (log[oldChannel.guild.id].onoff === "Off") return;
  var logChannel = oldChannel.guild.channels.find(
    c => c.name === `${log[oldChannel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      if (log[oldChannel.guild.id].onoff === "Off") return;
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[user.guild.id])
    log[guild.guild.id] = {
      onoff: "Off"
    };
  if (log[user.guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let banInfo = new Discord.RichEmbed()
      .setTitle("**[BANNED]**")
      .setThumbnail(userAvatar)
      .setColor("DARK_RED")
      .setDescription(
        `**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(banInfo);
  });
});
client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.guild.id])
    log[guild.guild.id] = {
      onoff: "Off"
    };
  if (log[guild.guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  var logChannel = oldMember.guild.channels.find(
    c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`اسمه الاصلي`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`اسمه الاصلي`";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[oldMember.guild.id].onoff === "Off") return;
      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("GREEN")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("RED")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    if (!log[oldMember.guild.id])
      log[oldMember.guild.id] = {
        onoff: "Off"
      };
    if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});

client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[voiceOld.guild.id])
    log[voiceOld.guild.id] = {
      onoff: "Off"
    };
  if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
  var logChannel = voiceOld.guild.channels.find(
    c => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
  );
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.RichEmbed()
        .setTitle("**[VOICE MUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }
    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUnmutev = new Discord.RichEmbed()
        .setTitle("**[VOICE UNMUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }
    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverDeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE DEAF]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }
    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUndeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE UNDEAF]**")
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    if (!log[voiceOld.guild.id])
      log[voiceOld.guild.id] = {
        onoff: "Off"
      };
    if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[CHANGED VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  let substringArray = get_substrings_between(message.content, ":", ":");
  let msg = message.content;
  if (!substringArray.length) return;

  substringArray.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m);
    var replace = `:${m}:`;
    var rexreplace = new RegExp(replace, "g");

    if (
      emoji &&
      !msg.split(" ").find(x => x === emoji.toString()) &&
      !msg.includes(`<a${replace}${emoji.id}>`)
    )
      msg = msg.replace(rexreplace, emoji.toString());
  });

  if (msg === message.content) return;

  let webhook = await message.channel.fetchWebhooks();
  webhook = webhook.find(x => x.name === "NQN2");

  if (!webhook) {
    webhook = await message.channel.createWebhook(`NQN2`, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname
      ? message.member.nickname
      : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  });

  message.delete().catch(m => {});

  webhook.send(msg).catch(m => {});

  await webhook.edit({
    name: `NQN2`,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  });
});

//--------------------------------------------------- F U N C T I O N S --------------------------------------

function get_substrings_between(str, startDelimiter, endDelimiter) {
  var contents = [];
  var startDelimiterLength = startDelimiter.length;
  var endDelimiterLength = endDelimiter.length;
  var startFrom = (contentStart = contentEnd = 0);

  while (false !== (contentStart = strpos(str, startDelimiter, startFrom))) {
    contentStart += startDelimiterLength;
    contentEnd = strpos(str, endDelimiter, contentStart);
    if (false === contentEnd) {
      break;
    }
    contents.push(str.substr(contentStart, contentEnd - contentStart));
    startFrom = contentEnd + endDelimiterLength;
  }

  return contents;
}

function strpos(haystack, needle, offset) {
  var i = (haystack + "").indexOf(needle, offset || 0);
  return i === -1 ? false : i;
}
