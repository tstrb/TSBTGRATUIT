const request = require('request');
const fs = require('fs');
const path = require('path');
module.exports.config = {
  name: "id",
  version: "1.0.0",
  role: 0,
  hasPrefix: false,
  description: "Get thread ID and group image",
  usages: "id",
  credits: "TsantaBot",
  cooldown: 5
};
module.exports.run = async function({
  api,
  event
}) {
  try {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const {
      threadName,
      participantIDs,
      imageSrc
    } = threadInfo;
    const time = new Date();
    const timestamp = time.toISOString().replace(/[:.]/g, "-");
    const imagePath = __dirname + '/cache/' + `${timestamp}_tid.png`;
    if (imageSrc) {
      const callback = async function() {
        api.sendMessage({
            body: `▶️Votre ID FACEBOOK est: ${event.threadID}`,
            attachment: fs.createReadStream(imagePath)
          }, event.threadID,
          () => {
            fs.unlinkSync(imagePath);
          });
      };
      request(imageSrc).pipe(fs.createWriteStream(imagePath)).on('close', callback);
    } else {
      api.sendMessage(` ▶️ Votre ID FACEBOOK est: \n\n${event.threadID}`, event.threadID);
    }
  } catch (error) {
    api.sendMessage(error.message, event.threadID, event.messageID);
  }
};
