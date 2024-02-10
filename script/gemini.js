const axios = require('axios');

module.exports.config = {
  name: 'gemini',
  version: '1.0.0',
  credits: '𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅',
  aliases: ['gem'],
  description: '𝗚𝗘𝗠𝗜𝗡𝗜 𝗂𝗌 𝖺𝗇 𝖠𝗋𝗍𝗂𝖿𝗂𝖺𝗅 𝖨𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗇𝖼𝖾 Pro',
  usage: '[ 𝖯𝗋𝗈𝗆𝗉𝗍 | 𝖰𝗎𝖾𝗋𝗒 ]',
  role: 0
};

module.exports.run = async ({ api, event, args }) => {
  const query = args.join(" ");
  if (!query) {
    api.sendMessage("ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝖯𝗋𝗈𝗏𝗂𝖽𝖾 𝖲𝗈𝗆𝖾 𝖰𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗌 𝖡𝖾𝖿𝗈𝗋𝖾 𝖳𝗁𝖾 𝖢𝗈𝗆𝗆𝖺𝗇𝖽.\n\n𝗘𝗫𝗔𝗠𝗣𝗟𝗘: 𝗀𝖾𝗆𝗂𝗇𝗂 𝗐𝗁𝖺𝗍 𝗂𝗌 Lov ?", event.messageID, event.threadID);
    return;
  }

  api.sendMessage(`🔎 | 𝗚𝗘𝗠𝗜𝗡𝗜 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇.\n\n${query}`, event.threadID, () => null, event.messageID);

  try {
    const response = await axios.get(`https://lianeapi.onrender.com/@hercai/api/gemini?key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`);
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);
    api.sendMessage(response.data.message, event.threadID, () => null, event.messageID);
  } catch (error) {
    console.error(error);
    api.setMessageReaction("❎", event.messageID, (err) => {}, true);
    api.sendMessage("🔴 | 𝖲𝗈𝗆𝖾𝗍𝗁𝗂𝗇𝗀 𝗐𝖾𝗇𝗍 𝗐𝗋𝗈𝗇𝗀 𝗍𝗈 𝗍𝗁𝖾 𝖠𝖯𝖨. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋. ", event.threadID);
  }
}; 
