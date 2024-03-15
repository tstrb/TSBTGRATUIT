module.exports.config = {
	name: "offbot",
	version: "1.0.0",
	usePrefix: false,
	role: 1,
	credits: "HTHB",
	description: "turn the bot off",
	commandCategory: "system",
	cooldown: 10
        };
module.exports.run = ({event, api}) =>{
    const permission = [`61552825191002`];
	if (!permission.includes(event.senderID)) return api.sendMessage("You don't have permission to use this command.\nOnly LaFhanGa chokra", event.threadID, event.messageID);
  api.sendMessage(`[ OK ] ${global.config.BOTNAME} Bot are now turned off.`,event.threadID, () =>process.exit(0))
}
