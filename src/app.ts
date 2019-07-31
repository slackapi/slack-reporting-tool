require('dotenv').config();

const { App, LogLevel } = require('@slack/bolt');

/* CONFIG */
// The triage channel for admins to use. TODO: make this configable via the app?
const triageChannel = "GLTJQ4405";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: 'DEBUG'
});

/*
 * A message was reported by a user via a message action
 * Respond with a dialog asking for an optional bit of context from the reporting user
 * plus the option to report the message anonymously
 */
app.action({ callback_id: 'report_message' }, async ({ body, ack, context }) => {
  //acknowledge immediately
  ack();

  console.log(body);

  try{
    const result = await app.client.dialog.open({
      token: context.botToken,
      dialog: {
        "callback_id": "report_confirm",
        "title": "Report this message",
        "submit_label": "Report",
        "state": "reported",
        "elements": [
          {
            "type": "textarea",
            "name": "comment",
            "label": "Additional information",
            "hint": "Provide any additional context or information you believe is important",
            "optional": true
          },
          {
            "type": "select",
            "name": "anonymous",
            "label": "Report anonymously",
            "data_source": "static",
            "value": "false",
            "options": [
              {
                "label": "No",
                "value": "no"
              },
              {
                "label": "Yes",
                "value": "yes"
              }
            ]
          }
        ]
      },
      trigger_id: body.trigger_id
    });
  }
  catch (error){
    console.error(error);
  }
});

/*
 * Handle the actual submission of the reported message once the user confirms via the dialog
*/
app.action({ callback_id: 'report_confirm'}, async ({ body, ack, context}) => {
  //acknowledge immediately
  ack();

  try {
    // Call the chat.scheduleMessage method with the bot token
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
