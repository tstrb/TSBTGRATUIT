const { get } = require("axios");
const url = "http://eu4.diresnode.com:3301";

module.exports = {
  config: {
    name: "gpt4",
    aliases: ["openai4"],
    version: "1.0.0",
    countDown: 5,
    role: 1,
    shortDescription: {
      en: "Talk to GPT 4 (continues conversation)",
    },
    longDescription: {
      en: "Talk to GPT 4 (continues conversation)",
    },
    category: "AI",
    guide: {
      en: "gpt4 <ask> or gpt4 <clear> to reset conversation."
    },
  },

  run: async function ({ api, event, args }) {
    try {
      let prompt = args.join(' ');
      const senderID = event.senderID;
      
      if (!prompt) {
        return api.sendMessage("Ex: gpt4 Salut mon nom est Tsanta.\n\n Usage: " + this.config.name + " Question. ou  “" + this.config.name + " clear”", event.threadID, event.messageID);
      }
      
      api.sendMessage("🔍…", event.threadID);
      const res = await get(`${url}/gpt4?prompt=${encodeURIComponent(prompt)}&idd=${senderID}`);
      return api.sendMessage(res.data.gpt4, event.threadID);
    } catch (error) {
      console.error("Error occurred during GPT-4 interaction:", error);
      return api.sendMessage(error.message, event.threadID);
    }
  }
};
