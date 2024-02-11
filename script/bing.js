const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const KievRPSSecAuth = "FAByBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACPdEWecX9G/OMAQ2nuMaOCul+CDMdOHAACpuCIh5U8btXkpIavLSnFJmvhw7unH4LdSog9rOSNi3ud5GDzQzFaN/0zpUBdAaiDZ+moU8XXTncvvrXgU8Poabcue80cT6H1dW6S3OPJAPQi2+dcwdWsdwlRS/PItdgb8/qytPGyoAF+ERFSVb6iR5ocsV52kN+BqjAGfUEYHS2FR1i4cNanwgZxH+lpxqfkKY5mgHmWlPbDBGWN/4nWbcVvwRZq4YnAMHj1lup5EEKwES5bHMfYvpQ62bqA7k1t8NbmDqoEj08Ap1StgXadTDqoqoQSyNP83JXXtGlBMqrPgquyqD50SOFCYDqyv9U3X1PzTEVTdW3KAqcYAsHv6DScT//n7B2DksZYv9Bsg0BMYPsIp5DPjjTrtGCTNagaufXHkaYrOyDq40fbDIyhrh4wJQoNmTPmloNFl9OqL/5ZWuPgOafC7+yDFhmqGOWImaNpU2WejvGvD3P9IZN4Z1f36XSJJIO4pZKAhhwWFkefa3LN8fAYnsJ+WkjDSXAGTuwN6NnW9wzGWnFaD4ojKunjPazYt5qLtlk06PYoqDE6V/MSKxIU2+GVg7gMtBNDMwEKD+pMHB0jVjzx0SyeEYc8m6K/ThfrBGXdwzQWsEiMxP5cXAVLClGDPXRI2h2W6B/n9UGPi8utG7Sz/dV1QaKEtyJPohuO7Onk42jLZ0/EabwpJ7jwaiSYv2AIW+GKO8wRPRlt8nOSZxqCPDKOVgn4f9VoaudyjRPAM7KoiGJ7PhXgMYoqk6ZvmLpcPaWNoH3p7TbKgkO0fd811/3weWZ4dicF4bazE2++QD+wKhXqjiHJZrhJOEOTB1GpZ/wnXSf0pY7SG+qyJcHTr6PJ3l+yv0KKVPCzuv+kg3566u7EzAkZPy7N9bpljQ0UcjloH7FLz2MPo0ZocPvEbQohHE8PFf+0fh7GbtjzHoyfqjQBVeNfQL7s7VSEdOOoluAirLoZeBFWA+JVorvWXpRi/jpTMk45DX1TqZJAVWCWdn6d2yddmZ03CoyWR0xqfYqD69LCOxXBTdz54SsAmPZ+vjLByqlSakKFFSR5WBsJSdY7Hw0uBXunyHBJD0ERh5/igQYP5JwdbWbWvToeVFChimOSJ0iK8r3cEzk4yxiA+JD2KhbR/9TkW5yLHrn/NVvDL9nLSWUw2wWLFFU1iMAiL9E3SVjtw1odHJYhr+7JLBRqp2tBxb1DRiFftu/XyN2oXKLxpX7RzNFH6CD4ywgQ2q4aiQwKeOfvklWovQ/3LyrQn08/mVZ+cn6cMCzUAYMdzYT1OgfhLkYMy0w+zXxINAPkkNZD2ZKgWeJPMW/uBY1DHahr+DSX/vuh1WH6ABAJFl+Hn71BGI+AbjZA0uCqDOKQLfwBGBYsGDBXRfxlKMCf+QnGnPgjQgPXGA820kWxK8FACZ1lFF7mxJUEOcTFrjijsYKfwWLw==";
const _U = "1blK93hKnYixhtwAtPdb3D8pFjTaKhmfhX5Z5ZE9dk-moahnidxLq97WCyxPXOsrZRrXOkAzyFh4LLCNUHgOHZJLpfF0hM23IrCUkYktZIv7xLUTHSeMHliuqQiWoWboYEgCvR5P1EAFpsFRhEo5l3gNwsFwfSFrzcxHp7roT6rH_4UuiMhvDo3S99XpinYvIA5Dmlu-mtzTyuvRb3J3kn5ALdabtwZDLhy9mr9JMVzE";

module.exports = {
  config: {
    name: "bing",
    aliases: ["bi"],
    version: "1.0.2",
    role: 1,
    countDown: 180,
    shortDescription: {
      en: "dalle 3 > TsantaBot > Bing"
    },
    longDescription: {
      en: "bing dispo chaque 3min"
    },
    category: "dalle3 pro",
    guide: {
      en: "{prefix}bing <search query> -<number of images>"
    }
  },

  run: async function ({ api, event, args }) {
    const uid = event.senderID;
    const permission = [`${uid}`];
    if (!permission.includes(event.senderID)) {
      api.sendMessage(
        "You don't have enough permission to use this command. Only admin and premium can do it.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const keySearch = args.join(" ");
    const indexOfHyphen = keySearch.indexOf('-');
    const keySearchs = indexOfHyphen !== -1 ? keySearch.substr(0, indexOfHyphen).trim() : keySearch.trim();
    const numberSearch = parseInt(keySearch.split("-").pop().trim()) || 4;

    try {
      api.sendMessage("⏳ | TsantaBot et Bing sont en train d'imaginer votre textes...\n\n 🆓️ Gratuit: 1 par 3 minutes\n 🌐 : bit.ly/tsantabot", event.threadID, event.messageID); // Added message here

      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3?auth_cookie_U=${_U}&auth_cookie_KievRPSSecAuth=${KievRPSSecAuth}&prompt=${encodeURIComponent(keySearchs)}`);
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("On ne sait pas d'imaginer votre textes. Essayez un autre. ", event.threadID, event.messageID);
        return;
      }

      const imgData = [];
      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
        body: `✅ | TsantaBot: Voici votre images :`
      }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage("🤯 Oh non, Je suis malade ! ", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};
