module.exports.config = {
name: "bio",
version: "1.0.0",
usePrefix: false,
credits: "PSTeam",
description: "Change bot's bio",
commandCategory: "admin",
usages: "bio [text]",
  cooldown: 5
  
}
  
  module.exports.run = async ({ api, event, global, args, permssion, utils, client, Users }) => {
    api.changeBio(args.join(" "), (e) => {
      if(e) api.sendMessage("an error occurred" + e, event.threadID); return api.sendMessage("Bio a été changé: 
"+args.join(" "), event.threadID, event.messgaeID)
    }
    )
  }
