const axios = require('axios');
const url = "http://eu4.diresnode.com:3301";

module.exports.config = {
  name: 'soa',
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  aliases: [],
  description: "Talk to SOAI the blindfolded sorcerer (with continues conversation)",
  usage: "[ask]/clear to clear history",
  credits: 'Deku',
  cooldown: 10,
};

module.exports.run = async function({ api, event, args }) {
  let prompt = args.join(' '), id = event.senderID;
  function sendMessage(msg) {
    api.sendMessage(msg, event.threadID, event.messageID)
  }
  
  if (!prompt) return sendMessage("- Ex: Soa Qui est Messi ? ");
  sendMessage("✍ | TsantaBot_Soa en train de répondre à votre message...");
  try {
    const res = await axios.get(`${url}/gojo_gpt?prompt=${prompt}&idd=${id}`);
    return sendMessage(res.data.gojo);
  } catch (e) {
    return sendMessage(e.message);
  }
};
