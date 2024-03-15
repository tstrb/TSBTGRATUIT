module.exports.config = {
	name: "rappel", //remind
	version: "0.0.1-beta",
	role: 0,
	credits: "Zia_Rein",
	description: "notification",
	commandCategory: "Countdown",
	usages: "[Time] [Text] ",
	cooldown: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  
	const time = args[0];
	const text = args.join(" ").replace(time, "");
	if (!(text)) return api.sendMessage(`Comment utiliser ?\n${global.config.PREFIX}rappel <time> <texte>\n\nExemple:\n${global.config.PREFIX}rappel 60 Rappel moi de faire un Chatbot \n\n*Note:\n60 = 1min`, event.threadID, event.messageID);
	const display = time > 59 ? `${time / 60} minute` : `${time} second`;
	api.sendMessage(`Je vais vous rappeler plus tard :\n ${display}`, event.threadID, event.messageID);
	await new Promise(resolve => setTimeout(resolve, time * 1000));
	var value = await api.getThreadInfo(event.threadID);
	if (!(value.nicknames)[event.userID]) value = (await Users.getInfo(event.senderID)).name;
	else value = (value.nicknames)[event.senderID];
	return api.sendMessage({
	body: `${(text) ? value + ", \n\n ✅ Je vous rappelle :\n" + text : value + ", à plus !"}`,
		mentions: [{
			tag: value,
			id: event.senderID
		}]
	}, event.threadID, event.messageID);
}
