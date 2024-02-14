const axios = require('axios');

module.exports = {
  config: {
    name: "prompt",
    version: "1.0",
    author: "TsantaBot",
    cooldown: 25,
    role: 0,
    longDescription: {
      vi: "",
      en: "Get midjourney prompts."
    },
    category: "img"
  },
  run: async function ({ api, event, args }) {
    try {
      const khankirChele = args.join(" ");
      let imageUrl;

      if (event.type === "message_reply") {
        if (["photo", "sticker"].includes(event.messageReply.attachments[0]?.type)) {
          imageUrl = event.messageReply.attachments[0].url;
        } else {
          return api.sendMessage({ body: `▪︎Obtenir  des prompts Midjourney / DALLE-3 à partir de votre image \n ▪︎Répondez  à une photo. \n\n 🌐 https://bit.ly/tsantabot` }, event.threadID);
        }
      } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
        imageUrl = args[0];
      } else if (!khankirChele) {
        return api.sendMessage({ body: `▪︎Obtenir  des prompts Midjourney a partir de votre image \n ▪︎Repondez a une photo. \n\n Visitez TsantaBot sur: https://bit.ly/tsantabot` }, event.threadID);
      }

      if (imageUrl) {
        const response = await axios.get(`https://www.api.vyturex.com/describe?url=${encodeURIComponent(imageUrl)}`);
        const description = response.data;

        await api.sendMessage(description, event.threadID);
      } else if (khankirChele) {
        const response = await axios.get(`https://www.api.vyturex.com/promptgen?content=${encodeURIComponent(khankirChele)}`);
        const prompt = response.data;

        await api.sendMessage(`PROMPT (bit.ly/tsantabot)\n\n${prompt}`, event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage(`${error}`, event.threadID);
    }
  }
};
