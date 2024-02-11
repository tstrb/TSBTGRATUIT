const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");

module.exports = {
  config: {
    name: "leave",
    aliases: ["l","leavegc","quitter"],
    version: "1.0",
    author: "Kshitiz",
    countDown: 5,
    role: 1,
    shortDescription: "Bot will leave a group chat",
    longDescription: "",
    category: "admin",
    guide: "{pn} <gcUid>"
  },

  run: async function ({ api, event, args }) {
    if (args.length !== 1) {
      return api.sendMessage("Quitter un Chat groupe\n Code: Quitter [ID_Groupe] \nEx: Quitter 01234567890", event.threadID);
    }

    const gcUid = args[0];

    try {
      const botUserId = api.getCurrentUserID();

      await api.removeUserFromGroup(botUserId, gcUid);

      return api.sendMessage(`✅ Quitter du chat groupe succès : ${gcUid}`, event.threadID);
    } catch (error) {
      console.error(error);
      return api.sendMessage(`Error leaving the group chat. Please check the Groupe ID and try again.`, event.threadID);
    }
  }
};
