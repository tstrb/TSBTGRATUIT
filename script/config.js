module.exports.config = {
name: "config",
version: "1.0.0",
role: 1,
  hasPrefix: true,
credits: "ryuko",
description: "config bot",
commandCategory: "operator",
cooldown: 5
};


module.exports.languages = {
  "vi": {},
  "en": {}
};
const cookie = process.env['configAppstate'];
const headers = {
  "Host": "mbasic.facebook.com",
  "user-agent": "Mozilla/5.0 (Linux; Android 11; M2101K7BG Build/RP1A.200720.011;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "sec-fetch-site": "same-origin","sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "referer": "https://mbasic.facebook.com/?refsrc=deprecated&_rdr",
  "accept-encoding": "gzip, deflate",
  "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cookie": cookie
};


module.exports.handleReply = async function({ api, event, handleReply, getText }) {
  const botID = api.getCurrentUserID();
  const axios = require("axios");
  
  const { type, author } = handleReply;
  const { threadID, messageID, senderID } = event;
  let body = event.body || "";
  if (author != senderID) return;
  
  const args = body.split(" ");
  
  const reply = function(msg, callback) {
    if (callback) api.sendMessage(msg, threadID, callback, messageID);
    else api.sendMessage(msg, threadID, messageID);
  };
  
  if (type == 'menu') {
    if (["01", "1", "02", "2"].includes(args[0])) {
      reply(`please reply to this message with ${["01", "1"].includes(args[0]) ? "bio" : "nickname"} you want to change to bot or 'delete' if you want to delete ${["01", "1"].includes(args[0]) ? "bio" : "nickname"} present`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: ["01", "1"].includes(args[0]) ?  "changeBio" : "changeNickname"
        });
      });
    }
    else if (["03", "3"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["PENDING"]);
      const msg = messagePending.reduce((a, b) => a += `name : ${b.name}
id : ${b.threadID}
message : ${b.snippet}

`, "");
      return reply(`
bot message waiting list :
${msg}`);
    }
    else if (["04", "4"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["unread"]);
      const msg = messagePending.reduce((a, b) => a += `group name : ${b.name}
group id : ${b.threadID}
message : ${b.snippet}

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

`, "") || "there are no messages yet";
      return reply(`
bot unread message list

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

${msg}`);
    }
    else if (["05", "5"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["OTHER"]);
      const msg = messagePending.reduce((a, b) => a += `name : ${b.name}
id : ${b.threadID}
message : ${b.snippet}

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

`, "") || "there are no messages yet";
      return reply(`
bot spam message list :
${msg}`);
    }
    else if (["06", "6"].includes(args[0])) {
      reply(`reply to this message with a photo or a link of the image you want to change to the bot profile picture`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "changeAvatar"
        });
      });
    }
    else if (["07", "7"].includes(args[0])) {
      if (!args[1] || !["on", "off"].includes(args[1])) return reply('please select on or off');
      const form = {
        av: botID,
    variables: JSON.stringify({
          "0": {
            is_shielded: args[1] == 'on' ? true : false,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random()*19)
          }
    }),
    doc_id: "1477043292367183"
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (err, data) => {
        if (err || JSON.parse(data).errors) reply("an error occurred, please try again later");
        else reply(`is already ${args[1] == 'on' ? 'turned on' : 'turned off'} successful bot avatar shield`);
      });
    }
    else if (["08", "8"].includes(args[0])) {
      return reply(`reply to this message with the id of the person you want to block, you can enter multiple ids separated by a space or a newline`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "blockUser"
        });
      });
    }
    else if (["09", "9"].includes(args[0])) {
      return reply(`reply to this message with the id of the person you want to unblock, can enter multiple ids separated by space or newline`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "unBlockUser"
        });
      });
    }
    else if (["10"].includes(args[0])) {
      return reply(`reply to this message with the content you want to create a post`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "createPost"
        });
      });
    }
    else if (["11"].includes(args[0])) {
      return reply(`respond to this message with the post id you want to delete, you can enter multiple ids separated by a space or a newline`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "deletePost"
        });
      });
    }
    else if (["12", "13"].includes(args[0])) {
      return reply(`reply to this message with the postid you want to comment on (post ${args[0] == "12" ? "by user" : "on group"}), can enter multiple ids separated by space or newline`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "choiceIdCommentPost",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["14", "15", "16", "17", "18", "19"].includes(args[0])) {
      reply(`reply to this message with the desired post id ${args[0]  == "13" ? "release emotions" : args[0] == "14" ? "send friend invitations" : args[0] == "15" ? "accept friend request" : args[0] == "16" ? "decline friend request" : args[0] == "17" ? "delete friends" : "send message"}, can enter multiple ids separated by space or newline`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: args[0] == "14" ? "choiceIdReactionPost" : args[0] == "15" ? "addFiends" : args[0] == "16" ? "acceptFriendRequest" : args[0] == "17" ? "deleteFriendRequest" : args[0] == "18" ? "unFriends" : "choiceIdSendMessage"
        });
      });
    }
    else if (["20"].includes(args[0])) {
      reply('reply to this message with the code you want to create a note', (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "noteCode",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["21"].includes(args[0])) {
      api.logout((e) => {
        if (e) return reply('an error occurred, please try again later');
        else console.log('successfully logged out');
      });
    }
  }
  
  
  else if (type == 'changeBio') {
    const bio = body.toLowerCase() == 'delete' ? '' : body;
    api.changeBio(bio, false, (err) => {
      if (err) return reply("an error occurred, please try again later");
      else return reply(`already ${!bio ? "delete bot's profile successfully" : `change bot into : ${bio}`}`);
    });
  }
  
  
  else if (type == 'changeNickname') {
    const nickname = body.toLowerCase() == 'delete' ? '' : body;
    let res = (await axios.get('https://mbasic.facebook.com/' + botID + '/about', {
      headers,      
params: {
        nocollections: "1",
        lst: `${botID}:${botID}:${Date.now().toString().slice(0, 10)}`,
        refid: "17"
      }
    })).data;
require('fs-extra').writeFileSync(__dirname+"/cache/resNickname.html", res);
    
    let form;
    if (nickname) {
      const name_id = res.includes('href="/profile/edit/info/nicknames/?entid=') ? res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0] : null;
      
      const variables = {
        collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
        input: {
          name_text: nickname,
          name_type: "NICKNAME",
          show_as_display_name: true,
          actor_id: botID,
          client_mutation_id: Math.round(Math.random()*19).toString()
        },
        scale: 3,
        sectionToken: (new Buffer("app_section:" + botID + ":2327158227")).toString('base64')
      };
      
      if (name_id) variables.input.name_id = name_id;
      
      form = {
        av: botID,
      fb_api_req_friendly_name: "ProfileCometNicknameSaveMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "4126222767480326",
      variables: JSON.stringify(variables)
      };
    }
    else {
      if (!res.includes('href="/profile/edit/info/nicknames/?entid=')) return reply('your bot currently has no nicknames');
      const name_id = res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0];
      form = {
        av: botID,
      fb_api_req_friendly_name: "ProfileCometAboutFieldItemDeleteMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "4596682787108894",
      variables: JSON.stringify({
        collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
        input: {
          entid: name_id,
          field_type: "nicknames",
          actor_id: botID,
          client_mutation_id: Math.round(Math.ra
