const axios = require('axios');

module.exports.config = {
  name: "appstate",
  version: "1.0.0",
  aliases: ['cookie','token','cookies'],
  role: 0,
  usePrefix: false, 
  credits: "Eugene Aguilar",
  description: "Get token from Facebook API",
  commandCategory: "tools",
  usages: "/token username: <username> password: <password>",
  cooldown: 16,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const [username, password] = args; 
    if (!username || !password) { 
      return api.sendMessage("Info: Get Token/Cookie Facebook\n\n ▪︎ Usage: Appstate [num/mail] [mdp]\n ▪︎Ex: 0344323045 koto1234\n\n ▪︎ Utilité: On a besoin cookie pour créer un Chatbot Facebook. Copiez cookie puis collez sur bit.ly/tsantabot ", event.threadID, event.messageID);
    }
    
    api.sendMessage(`Getting token/Cookie, please wait...`, event.threadID, event.messageID);

    const response = await axios.get(`https://hiroshi-rest-api.replit.app/facebook/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
    const token = response.data.data.access_token_eaad6v7;
    const tokensecond = response.data.data.access_token;
    const cookie = response.data.data.cookies;

    api.sendMessage(`▪︎ TOKEN.01:\n ${token}\n\n ▪︎ TOKEN.02 (deuxième):\n ${tokensecond}\n\n\n ■ APPSTATE COOKIES: ${cookie}`, event.threadID, event.messageID);

  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while getting the token", event.threadID, event.messageID);
  }
};
