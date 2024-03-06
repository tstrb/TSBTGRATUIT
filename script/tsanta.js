module.exports.config = {
    name: "tsanta",
    version: "1.0.0",
    role: 0,
    credits: "KENLIEPLAYS",
    usePrefix: false,
    description: "Tsanta + CONVERSATIONS CONTINUES",
    commandCategory: "ai",
    usages: "[ask]",
    cooldown: 10,
};

module.exports.run = async function({ api, event, args }) {
    const axios = require("axios");
    const userId = event.senderID;
    let { messageID, threadID, senderID, body } = event;
    let tid = threadID,
        mid = messageID;
    const content = encodeURIComponent(args.join(" "));
    if (!args[0]) return api.sendMessage("▪︎Ex: Tsanta Tu es là?\n\n▪︎Créez  votre Chatbot sur bit.ly/tsantabot", tid, mid);
    try {
        // Set the reaction when the request is sent
        api.setMessageReaction("⌛", mid, (err) => {
            if (err) console.error("Error setting reaction:", err);
        });

        const res = await axios.get(`https://ai-tools.replit.app/gpt?prompt=${content}&uid=${encodeURIComponent(userId)}`);
        // Remove the reaction after receiving the response
        api.setMessageReaction("✅", mid, (err) => {
            if (err) console.error("Error removing reaction:", err);
        });

        const respond = res.data.gpt4;
        if (res.data.error) {
            api.sendMessage(`Error: ${res.data.error}`, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        } else {
            api.sendMessage(respond, tid, (error, info) => {
                if (error) {
                    console.error(error);
                }
            }, mid);
        }
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while fetching the data.", tid, mid);
    }
};
