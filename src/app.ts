require('dotenv').config();

const { App, LogLevel } = require('@slack/bolt');
const responses = require('./bot_responses');

/* CONFIG */
// The triage channel for admins to use. TODO: make this configable via the app?
const triage_channel = process.env.SLACK_TRIAGE_CHANNEL;

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
app.shortcut({ callback_id: 'report_message' }, async ({ body, ack, context }) => {
  // acknowledge immediately
  await ack();

  // show the confirmation dialog
  // TODO break out the actual dialog definition into a separate file
  try {
    const result = await app.client.dialog.open({
      token: context.botToken,
      dialog: {
        "callback_id": "report_confirm",
        "title": "Report this message",
        "submit_label": "Report",
        "state": `{ "message": ${JSON.stringify(body.message)} }`,
        "elements": [
          {
            "type": "textarea",
            "name": "comment",
            "label": "Why are you reporting this message?",
            "hint": "Optionally add any context or information you believe is important. This will be shared with moderators along with the original message.",
            "optional": true
          },
          {
            "type": "select",
            "name": "anonymous",
            "label": "Include your name?",
            "data_source": "static",
            "value": "false",
            "options": [
              {
                "label": "Yes, include my name with the report",
                "value": "false"
              },
              {
                "label": "No, report anonymously",
                "value": "true"
              }
            ]
          }
        ]
      },
      trigger_id: body.trigger_id
    });
  }
  catch (error) {
    console.error(error);
  }
});

/*
 * Handle the actual submission of the reported message once the user confirms via the dialog
*/
app.action({ callback_id: 'report_confirm' }, async ({ body, ack, context }) => {
  //acknowledge receipt of dialog
  // TODO: send a message back to the reporting user acknowledging receipt of their message
  await ack();

  try {
    // the form data the user submitted: optional comment and whether to report anonymously
    const reported_context = body.submission;
    let report_header = '';
    // who reported the message, handle anonymity
    const report_anonymously = (reported_context.anonymous === 'true');
    const reporter_id = body.user.id;
    const reporter = report_anonymously ? `Someone anonymously` : `<@${body.user.id}>`;
    // addtional commentary, handle none
    const report_comment = reported_context.comment;
    if (report_comment !== null) {
      report_header = `${reporter} reported the following message with the comment: ${report_comment}`
    } else {
      report_header = `${reporter} reported the following message.`
    }
    // the message being reported, stored in the state field of the dialog
    const reported_message = JSON.parse(`${body.state}`);

    const message_ts = reported_message.message.ts.replace('.', '');
    // TODO: this should use https://api.slack.com/methods/chat.getPermalink instead
    const message_link = `https://${body.team.domain}.slack.com/archives/${body.channel.id}/p${message_ts}`;

    try {
      // Call the chat.postMessage method with the bot token, post reported message to the triage channel
      const result = await app.client.chat.postMessage({
        // The token you used to initialize your app is stored in the `context` object
        token: context.botToken,
        channel: triage_channel,
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `${report_header}`
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `*<@${reported_message.message.user}> said*:\n${reported_message.message.text}`
            }
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": `Posted at <${message_link}|${message_link}>`
              }
            ]
          },
          {
            "type": "divider"
          }
        ]
      });

      try {
        console.log("DM the reporting user");
        console.log(reporter_id);
        // Post a DM to the user who reported the message confirming report
        const confirmation = await app.client.chat.postMessage({
          token: context.botToken,
          channel: reporter_id,
          as_user: true,
          text: "Thank you for reporting a message, we appreciate your help in keeping this workspace respectful and inclusive.\nThe workspace administrators will review the message and determine the appropriate response."
        });
      }
      catch (error) {
        console.error(error);
      }
    }
    catch (error) {
      // error when calling chat.postMessage reporting the message
      console.error(error);
    }
  }
  catch (error) {
    // error when parsing reported message
    console.error(error);
  }
});

app.event('app_home_opened', async ({ event, context, say }) => {
  //get the message history with the user
  let history = await app.client.conversations.history({
    token: context.botToken,
    channel: event.channel,
    count: 1
  })

  if (!history.messages.length) {
    await say(responses.welcome);
  }
});

app.message('help', async ({ message, say }) => {
  // in theory, the app should only be getting DMs,
  // but double check just in case the app is configured with extra scopes
  if (message.channel_type == "im") {
    await say(responses.help);
  }
});

app.action({ action_id: 'coc_button' }, async ({ ack }) => {
  await ack();
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt:\tApp is running!');
})();
