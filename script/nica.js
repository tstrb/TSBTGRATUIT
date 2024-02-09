const axios = require('axios');
module.exports.config = {
  name: 'nica',
  version: '1.0.0',
  credits: '𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅',
  description: '𝗡𝗜𝗖𝗔 𝗂𝗌 𝖺𝗇 𝖠𝗋𝗍𝗂𝖿𝗂𝖺𝗅 𝖨𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗇𝖼𝖾 ( 𝖠𝖨 ) 𝗆𝖺𝖽𝖾 𝖻𝗒 𝖥𝗋𝖺𝗇𝖼𝗂𝗌 𝖫𝗈𝗒𝖽 𝖱𝖺𝗏𝖺𝗅 𝖿𝗋𝗈𝗆 𝗍𝗁𝖾 𝖠𝖯𝖨 𝗈𝖿 𝖫𝗂𝖺𝗇𝖾 𝖢𝖺𝗀𝖺𝗋𝖺 𝖿𝗋𝗈𝗆 𝖫𝗂𝖺𝗌𝗉𝖺𝗋𝗄 𝖠𝖨 𝗍𝗁𝖺𝗍 𝖼𝖺𝗇 𝗁𝖾𝗅𝗉 𝗒𝗈𝗎 𝗂𝗇 𝗒𝗈𝗎𝗋 𝖺𝗌𝗌𝗂𝗀𝗇𝗆𝖾𝗇𝗍𝗌.',
  usage: '[ 𝖯𝗋𝗈𝗆𝗉𝗍 | 𝖰𝗎𝖾𝗋𝗒 ]',
  role: 0
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇 𝗈𝗋 𝗌𝗍𝖺𝗍𝖾𝗆𝖾𝗇𝗍 𝖺𝖿𝗍𝖾𝗋 𝗇𝗂𝖼𝖺.\n\n𝗘𝗫𝗔𝗠𝗣𝗟𝗘: 𝗇𝗂𝖼𝖺 𝗐𝗁𝖺𝗍 𝗂𝗌 𝗍𝗁𝖾 𝗏𝖺𝗅𝗎𝖾 𝗈𝖿 𝖾𝖽𝗎𝖼𝖺𝗍𝗂𝗈𝗇?`, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`🔎 | 𝗡𝗶𝗰𝗮 𝗂𝗌 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖺𝗇𝗌𝗐𝖾𝗋 𝗈𝖿 "${input}"`, event.threadID, event.messageID);
  try {
    const response = await axios.get(`https://lianeapi.onrender.com/ask/nica?key=j86bwkwo-8hako-12C&prompt=${encodeURIComponent(input)}`);
    api.sendMessage(response.data.message, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('🔴 | 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝗋𝗁𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗒𝗈𝗎𝗋 𝗋𝖾𝗊𝗎𝖾𝗌𝗍, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.', event.threadID, event.messageID);
  }
};
