const axios = require('axios');

module.exports.config = {
 name: 'chat',
 credits: "TsantaBot",
  version: '1.0.0',
  role: 0,
  aliases: ['llma'],
  cooldown: 20,
  hasPrefix: true,
  usage: "chat Question",
};

module.exports.run = async function ({ api, event, args }) {
 try {
 const { messageID, messageReply } = event;
 let prompt = args.join(' ');

 if (messageReply) {
  const repliedMessage = messageReply.body;
  prompt = `${repliedMessage} ${prompt}`;
 }

 if (!prompt) {
  return api.sendMessage('- Simple Chat [Question]\n\n 🌐 bit.ly/tsantabot', event.threadID, event.messageID);
 }

 const llama_api = `https://llama.aliestercrowley.com/api?prompt=${encodeURIComponent(prompt)}`;

 const response = await axios.get(llama_api);

 if (response.data && response.data.response) {
  const generatedText = response.data.response;
  api.sendMessage({ body: generatedText, attachment: null }, event.threadID, messageID);
 } else {
  console.error('API response did not contain expected data:', response.data);
  api.sendMessage('❌ An error occurred while generating the text response. Please try again later.', event.threadID, messageID);
 }
 } catch (error) {
 console.error('Error:', error);
 api.sendMessage('❌ An error occurred while generating the text response. Please try again later.', event.threadID, messageID);
 }
};
