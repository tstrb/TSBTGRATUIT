const fs = require("fs-extra");
const axios = require("axios");
const cron = require("node-cron");

module.exports = {
  config: {
    name: "autoaccept",
    version: "1.0.0",
    role: 1,
    credits: "TsantaBot",
    description: "Automatically accept friend requests",
    commandCategory: "system",
    usages: "[on/off]",
    cooldowns: 5,
    dependencies: {
      "fs-extra": "",
      "axios": "",
      "node-cron": ""
    }
  },

  languages: {
    vi: {
      on: "Bật tự động chấp nhận lời mời kết bạn",
      off: "Tắt tự động chấp nhận lời mời kết bạn"
    },
    en: {
      on: "Enable auto accept friend request",
      off: "Disable auto accept friend request"
    }
  },

  run: async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const { writeFileSync, existsSync, readFileSync } = fs;
    const pathData = __dirname + "/cache/autoAcceptFriend.json";
    let data = {};

    if (existsSync(pathData)) {
      data = JSON.parse(readFileSync(pathData));
    }

    switch (args[0]) {
      case "on": {
        data[senderID] = true;
        writeFileSync(pathData, JSON.stringify(data, null, 4));
        cron.schedule('0 */5 * * * *', async () => {
          if (!data[senderID]) return;
          const listRequests = await api.getFriendRequests();
          for (const request of listRequests) {
            await api.addFriend(request.userID);
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds between accepting requests
          }
        });
        return api.sendMessage(this.languages.en.on, threadID, messageID);
      }
      case "off": {
        delete data[senderID];
        writeFileSync(pathData, JSON.stringify(data, null, 4));
        return api.sendMessage(this.languages.en.off, threadID, messageID);
      }
      default: {
        return utils.throwError(this.config.name, threadID, messageID);
      }
    }
  }
};
