const os = require('os');
const pidusage = require('pidusage');

module.exports.config = {
    name: "uptime",
    version: "1.0.2",
    role: 0,
    credits: "TsantaBot",
    description: "uptime",
    hasPrefix: true,
    cooldowns: 5,
    aliases: ["up","cœur"]
};

function byte2mb(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) n = n / 1024;
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

function getUptime(uptime) {
    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24)) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    return `Uptime: ${days} days, ${hours} hours, ${mins} minutes, and ${seconds} seconds`;
}

module.exports.run = async ({ api, event }) => {
    const time = process.uptime();
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time % (60 * 60)) / 60);
    const seconds = Math.floor(time % 60);

    const usage = await pidusage(process.pid);

    const osInfo = {
        platform: os.platform(),
        architecture: os.arch()
    };

    const days = Math.floor(time / (3600 * 24)); // Calculate days here

    const returnResult = `Ce Chatbot est en vie et fonctionne depuis ${hours}H ${minutes}Min ${seconds}Sec sur bit.ly/tsantabot.\n\n✅ Cpu usage: ${usage.cpu.toFixed(1)}%\n✅ RAM usage: ${byte2mb(usage.memory)}\n✅ Cores: ${os.cpus().length}\n✅ Coeur: ${Date.now() - timeStart}ms\n✅ System Platform: ${osInfo.platform}\n✅ System CPU Arch: ${osInfo.architecture} \n♥ Vie: ${days}j ${hours}h ${minutes}min ${seconds}s\n\n 🌐TsantaBot (Créez votre Chatbot sur) : bit.ly/tsantabot `;

    return api.sendMessage(returnResult, event.threadID, event.messageID);
};
