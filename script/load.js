module.exports.config = {
	name: "load",
	version: "1.0.0",
	usePrefix: false,
	role: 1,
	credits: "D-Jukie",
	description: "reload config file data",
	commandCategory: "Admin",
	usages: "[]",
	cooldown: 10
};
module.exports.run = async function({ api, event, args,Threads, Users }) {
delete require.cache[require.resolve(global.client.configPath)];
global.config = require(global.client.configPath);
return api.sendMessage("[OK] Reloading config...", event.threadID, event.messageID);    
} 
