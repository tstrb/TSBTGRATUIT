const fs = require("fs-extra");
const axios = require("axios");

module.exports = {
  config: {
    name: "postfb",
    version: "1.0",
    cooldown: 5,
    role: 1,
    shortDescription: {
      en: "Create a new post on Facebook."
    },
    longDescription: {
      en: "Create a new post on Facebook with text, images, and video."
    },
    category: "Social",
    guide: {
      en: "{pn}: post"
    }
  },

  run: async function ({ api, event, args }) {
    try {
      const { threadID, senderID } = event;
      const uuid = getGUID();
      const formData = getInitialFormData(api.getCurrentUserID(), uuid);

      const audienceResponse = await waitForResponse(api, senderID, threadID, "Choose an audience that can see this article of yours\n1. Everyone\n2. Friend\n3. Only me");
      formData.input.audience.privacy.base_state = getPrivacySetting(audienceResponse.body);

      const contentResponse = await waitForResponse(api, senderID, threadID, "Reply to this message with the content of the article. If you want to leave it blank, please reply with 0.");
      if (contentResponse.body !== "0") {
        formData.input.message.text = contentResponse.body;
      }

      const mediaResponse = await waitForResponse(api, senderID, threadID, "Reply to this message with a photo or video (you can send multiple attachments). To post without attachments, reply with 0.");
      if (mediaResponse.body !== "0") {
        // Handle attachments and update formData
        const attachments = await processAttachments(mediaResponse.attachments);
        formData.input.attachments = attachments;
      }

      // Create post using formData
      const postID = await createPost(api, formData);

      // Send success message with post ID
      api.sendMessage(`Post created successfully\nPost ID: ${postID}`, threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
  }
};

// Rest of the code remains the same...


  async function ({ api, event, args }) {
    try {
      const { threadID, senderID } = event;
      const uuid = getGUID();
      const formData = getInitialFormData(api.getCurrentUserID(), uuid);

      const audienceResponse = await waitForResponse(api, senderID, threadID, "Choose an audience that can see this article of yours\n1. Everyone\n2. Friend\n3. Only me");
      formData.input.audience.privacy.base_state = getPrivacySetting(audienceResponse.body);

      const contentResponse = await waitForResponse(api, senderID, threadID, "Reply to this message with the content of the article. If you want to leave it blank, please reply with 0.");
      if (contentResponse.body !== "0") {
        formData.input.message.text = contentResponse.body;
      }

      const mediaResponse = await waitForResponse(api, senderID, threadID, "Reply to this message with a photo or video (you can send multiple attachments). To post without attachments, reply with 0.");
      if (mediaResponse.body !== "0") {
        // Handle attachments and update formData
        const attachments = await processAttachments(mediaResponse.attachments);
        formData.input.attachments = attachments;
      }

      // Create post using formData
      const postID = await createPost(api, formData);

      // Send success message with post ID
      api.sendMessage(`Post created successfully\nPost ID: ${postID}`, threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
    }
  }
};

function getGUID() {
  var sectionLength = Date.now();
  var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.floor((sectionLength + Math.random() * 16) % 16);
    sectionLength = Math.floor(sectionLength / 16);
    var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
    return _guid;
  });
  return id;
}

function getInitialFormData(userID, uuid) {
  return {
    "input": {
      "composer_entry_point": "inline_composer",
      "composer_source_surface": "timeline",
      "idempotence_token": uuid + "_FEED",
      "source": "WWW",
      "attachments": [],
      "audience": {
        "privacy": {
          "allow": [],
          "base_state": "FRIENDS", // SELF EVERYONE
          "deny": [],
          "tag_expansion_state": "UNSPECIFIED"
        }
      },
      "message": {
        "ranges": [],
        "text": ""
      },
      "with_tags_ids": [],
      "inline_activities": [],
      "explicit_place_id": "0",
      "text_format_preset_id": "0",
      "logging": {
        "composer_session_id": uuid
      },
      "tracking": [
        null
      ],
      "actor_id": userID,
      "client_mutation_id": Math.floor(Math.random() * 17)
    },
    "displayCommentsFeedbackContext": null,
    "displayCommentsContextEnableComment": null,
    "displayCommentsContextIsAdPreview": null,
    "displayCommentsContextIsAggregatedShare": null,
    "displayCommentsContextIsStorySet": null,
    "feedLocation": "TIMELINE",
    "feedbackSource": 0,
    "focusCommentID": null,
    "gridMediaWidth": 230,
    "groupID": null,
    "scale": 3,
    "privacySelectorRenderLocation": "COMET_STREAM",
    "renderLocation": "timeline",
    "useDefaultActor": false,
    "inviteShortLinkKey": null,
    "isFeed": false,
    "isFundraiser": false,
    "isFunFactPost": false,
    "isGroup": false,
    "isTimeline": true,
    "isSocialLearning": false,
    "isPageNewsFeed": false,
    "isProfileReviews": false,
    "isWorkSharedDraft": false,
    "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
    "hashtag": null,
    "canUserManageOffers": false
  };
}

async function waitForResponse(api, senderID, threadID, message) {
  return new Promise(resolve => {
    api.sendMessage(message, threadID, async (err, info) => {
      if (err) throw err;
      const response = await getMessage(api, senderID, threadID);
      resolve(response);
    });
  });
}

async function getMessage(api, senderID, threadID) {
  return new Promise(resolve => {
    api.onMessage(message => {
      if (message.senderID === senderID && message.threadID === threadID) {
        resolve(message);
      }
    });
  });
}

function getPrivacySetting(response) {
  // Parse response to determine privacy setting
  // Return the appropriate value based on the response
  switch (response) {
    case "1":
      return "EVERYONE";
    case "2":
      return "FRIENDS";
    case "3":
      return "SELF";
    default:
      return "FRIENDS"; // Default to FRIENDS if response is invalid
  }
}


async function processAttachments(attachments) {
  const processedAttachments = [];
  for (const attachment of attachments) {
    if (attachment.type === "photo") {
      // Process photo attachment
      const photoAttachment = await processPhotoAttachment(attachment.url);
      processedAttachments.push(photoAttachment);
    } else if (attachment.type === "video") {
      // Process video attachment
      const videoAttachment = await processVideoAttachment(attachment.url);
      processedAttachments.push(videoAttachment);
    }
  }
  return processedAttachments;
}

async function processPhotoAttachment(url) {
  // Download and process photo attachment
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const photoData = Buffer.from(response.data, "binary");
  // Save photoData to file or upload directly to Facebook and return the attachment ID
  // For now, returning photoData for demonstration purposes
  return { photo: { data: photoData } };
}

async function processVideoAttachment(url) {
  // Download and process video attachment
  const response = await axios.get(url, { responseType: "stream" });
  const videoData = response.data;
  // Save videoData to file or upload directly to Facebook and return the attachment ID
  // For now, returning videoData for demonstration purposes
  return { video: { data: videoData } };
}

async function createPost(api, formData) {
  // Use formData to create the post
  const response = await axios.post("https://www.facebook.com/api/graphql/", formData);
  // Parse response and return post ID
  const postID = response.data.data.story_create.story.legacy_story_hideable_id;
  return postID;
}
