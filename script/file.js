const fs = require('fs');

module.exports.config = {
    name: "file",
    version: "1.1.1",
    credits: "TsantaBot",
    cooldown: 0,
    hasPrefix: true,
    usage: "",
    role: 1,
};

module.exports.run = async function ({ message, args, api, event }) {
    const fileName = args[0];
    if (!fileName) {
        return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `./${fileName}.js`;
    if (!fs.existsSync(filePath)) {
        return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
};
