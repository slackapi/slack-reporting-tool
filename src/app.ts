require('dotenv').config();

const { App, LogLevel } = require('@slack/bolt');

/* CONFIG */
// The triage channel for admins to use. TODO: make this configable via the app
const triageChannel = "GLTJQ4405";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: 'DEBUG'
});

app.action({ callback_id: 'report_message' }, async ({ body, ack, context }) => {
  //acknowledge immediately
  ack();
  console.log(body);
  try {
    // Call the chat.scheduleMessage method with a token
    const result = await app.client.chat.postMessage({
      // The token you used to initialize your app is stored in the `context` object
      token: context.botToken,
      channel: triageChannel,
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `<@${body.user.id}> reported a message originally posted by <@${body.message.user}>`
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `${body.message.text}`
          }
        }
      ]
    });
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt:\tApp is running!');
})();
