module.exports.config = {
    name: "logout",
    version: "1.0.1",
    usePrefix: false,
    role: 1,
    credits: "HĐGN",
    description: "Logout ACC Bot",
    commandCategory: "System",
    usages: "",
    cooldown: 10
};

module.exports.run = async function({ api, event })
const permission = [`61552825191002`];
	if (!permission.includes(event.senderID)) return api.sendMessage("You don't have permission to use this command.\nTsantaBo only", event.threadID, event.messageID);
{
api.sendMessage("Votre Chatbot se déconnecte avec TsantaBot...",event.threadID,event.messageID)
api.logout()
}
