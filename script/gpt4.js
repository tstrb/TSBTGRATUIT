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
      let prompt = args.join(' '), id = event.senderID;
      async function sendMessage(msg) {
        api.sendMessage(msg, event.threadID, event.messageID);
      }
      
      if (!prompt) {
        return sendMessage("Ex: gpt4 Salut mon nom est Tsanta.\n\n Usage: " + this.config.name + " Question. ou  “" + this.config.name + " clear”");
      }
      
      sendMessage("🔍…");
      const res = await get(url + "/gpt4?prompt=" + prompt + "&idd=" + id);
      return sendMessage(res.data.gpt4);
    } catch (error) {
      console.error("Error occurred during TTS:", error);
      return api.sendMessage(error.message, event.threadID, event.messageID);
    }
  }
};
