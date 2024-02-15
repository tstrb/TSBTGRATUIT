module.exports.config = {
  name: "addcmd",
  version: "1.0.0",
  role: 1,
  hasPrefix: true,
  usage: '[demander une commande sur nos site ou nos admin]',
  description: 'Ajouter des commandes sur Chatbot ',
  credits: 'TsantaBot',
  cooldown: 5
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const axios = require('axios');
  const fs = require('fs');
  const request = require('request');
  const cheerio = require('cheerio');
  const {
    senderID,
    threadID,
    messageID,
    messageReply,
    type
  } = event;
  var name = args[0];
  if (type == "message_reply") {
    var text = messageReply.body;
  }
  if (!text && !name) return api.sendMessage('🆕️ Ajouter des commandes premium sur mon Chatbot\n\n ▪︎Tuto: \n 1- Visitez nos site https://bit.ly/tsantabot pour voir les commandes premiums et les tutoriels. \n 2- Contactez un admin pour demander des commandes et tutoriels (personnalisé) https://www.facebook.com/profile.php?id=61552825191002. Contact: 0349310268' , threadID, messageID);
  if (!text && name) {
    var data = fs.readFile(`${__dirname}/${args[0]}.js`, "utf-8", async (err, data) => {
      if (err) return api.sendMessage(` ${args[0]} erreur ou existe pas! Contactez admin si besoin d'aide ou juste tapez : addcmd`, threadID, messageID);
      const {
        PasteClient
      } = require('pastebin-api');
      const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
      async function pastepin(name) {
        const url = await client.createPaste({
          code: data,
          expireDate: 'N',
          format: "javascript",
          name: name,
          publicity: 1
        });
        var id = url.split('/')[3];
        return 'https://pastebin.com/raw/' + id;
      }
      var link = await pastepin(args[1] || 'noname');
      return api.sendMessage(link, threadID, messageID);
    });
    return;
  }
  var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  var url = text.match(urlR);
  if (url[0].indexOf('pastebin') !== -1) {
    axios.get(url[0]).then(i => {
      var data = i.data;
      fs.writeFile(`${__dirname}/${args[0]}.js`, data, "utf-8", function(err) {
        if (err) return api.sendMessage(`An error occurred while applying the code ${args[0]}.py`, threadID, messageID);
        api.sendMessage(`Applied the code to ${args[0]}.py, use command load to use!`, threadID, messageID);
      });
    });
  }
  if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
    const options = {
      method: 'GET',
      url: messageReply.body
    };
    request(options, function(error, response, body) {
      if (error) return api.sendMessage('Addcmd + codeCommande by TsantaBot', threadID, messageID);
      const load = cheerio.load(body);
      load('.language-js').each((index, el) => {
        if (index !== 0) return;
        var code = el.children[0].data;
        fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8", function(err) {
          if (err) return api.sendMessage(`An error occurred while applying the new code to "${args[0]}.py".`, threadID, messageID);
          return api.sendMessage(`Added new commande "${args[0]}.py", use command load to use!`, threadID, messageID);
        });
      });
    });
    return;
  }
}
