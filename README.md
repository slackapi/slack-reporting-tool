# Slack Reporting Tool

## About the app

A Slack app to let anyone in a workspace report a message to a private channel because the message is offensive, harassing, or violates the Code of Conduct.

## Installing the app
1. In your Slack workspace, create a private channel for receiving reported messages. 
2. Duplicate `.env.sample` to `.env`
3. Add the ID of the private channel you created above to your .env file, after `SLACK_TRIAGE_CHANNEL` (hint, you can get the id by opening that channel in a browser, it's the part of the URL that begins with `G`, eg `GABC123DE`)
4. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
5. Go to OAuth and permissions and add the following Bot Token scopes: `chat:write`, `im:history` and `commands`.
7. Install the app on your workspace, accept the OAuth
8. Copy the Bot User OAuth Access Token that begins with `xoxb` and paste it into the .env file after `SLACK_BOT_TOKEN`
9. Go to Basic Information and click the **Show** button in the Signing Secret field, then copy that string. In the .env file, paste after `SLACK_SIGNING_SECRET`
10. Back in the app configuration, go to **Interactivity & Shortcuts**, turn Interactivity to `On` and set the Request URL to `https://YOUR-DOMAIN.TLD/slack/events`
11. On the same Interactive Components page, click the **Create New Shortcut** button and choose "On messages"
12. Set the fields to:
	* Name: `Report message...`
	* Short Description: `Report this message as inappropriate`
	* Callback ID: `report_message`
13. Deploy your code
14. Once your server is live, go back to the app configuration, choose **Event Subscriptions**, turn Enable Events to `On` and set the Request URL to `https://YOUR-DOMAIN.TLD/slack/events`
15. On the same Event Subscriptions page, click the **Subscribe to bot events** header and choose "Add Bot User Event"
16. Choose the `app_home_opened` and `message.im` events, then click the green "Save Changes" button
