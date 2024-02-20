const {
  Hercai
} = require('hercai');
const herc = new Hercai();
module.exports.config = {
  name: 'Tsanta', //hercai
  version: '1.0.0',
  role: 0,
  hasPrefix: true,
  description: "An AI command GPTHercai",
  usage: "Tsanta [prompt]",
  credits: 'TsantaBot',
  cooldown: 15,
};
module.exports.run = async function({
  api,
  event,
  args
}) {
  const input = args.join(' ');
  if (!input) {
    api.sendMessage(`▪︎Ex: Tsanta Tu es là ? \n\n ✅Créez votre Chatbot sur bit.ly/tsantabot `, event.threadID, event.messageID);
    return;
  }
  api.sendMessage(`✍ | TsantaBot_Gpt en train d'écrire... \n\n ▶️Créez votre Chatbot : bit.ly/tsantabot `, event.threadID, event.messageID);
  try {
    const response = await herc.question({
      model: "v3",
      system: "Your name is TsantaBot, Your principal task is to help free, Your specilist is to create Chatbot Facebook. So if anyone talk about Chatbot,  then help them to visit and create it in our website creator Chatbot messenger: bit.ly/tsantabot. Here is contact of Admin: 0349310268. Admin name: Tsanta Rabemananjara. You're helpful",
      content: input
    });
    api.sendMessage(response.reply, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage('Peut-être, je suis malade aujourd-hui 🥶 svp soignez-moi🤖', event.threadID, event.messageID);
  }
};
