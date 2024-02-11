module.exports.config = {
  name: "draw",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  credits: "TsantaBot",
  description: "generate image from emi 1/1min",
  usages: "draw [promt]",
  cooldowns: 60,
  
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  try { 
  const { threadID, messageID } = event;
  const query = args.join(" ");
  const time = new Date();
  const timestamp = time.toISOString().replace(/[:.]/g, "-");
  const path = __dirname + '/cache/' + `${timestamp}_tid.png`;
  if (!query) return api.sendMessage("bit.ly/tsantabot\n\n- Ex: draw Cat black \n☆Gratuit: 1/1min", threadID, messageID);
    api.sendMessage(`⏳ | TsantaBot_draw va dessiner "${query}"`, event.threadID, event.messageID);
  const poli = (await axios.get(`http://ger2-1.deploy.sbs:1792/emi?prompt=${query}`, {
    responseType: "arraybuffer",
  })).data;
  fs.writeFileSync(path, Buffer.from(poli, "utf-8"));
    setTimeout(function() {
  api.sendMessage({
    body: "✅ Successfully!",
    attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path));
    }, 5000);
    } catch (error) {
      api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
