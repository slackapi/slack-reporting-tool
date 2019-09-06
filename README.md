# Slack Reporting Tool

An open source Slack app to let anyone in a workspace report a message to an administrator because the message is offensive, harassing, or violates the Code of Conduct.

## About the app

## Installing the app
1. In your Slack workspace, create a private channel for receiving reported messages. 
2. Duplicate `.env.sample` to `.env`
3. Add the ID of the private channel you created above to your .env file, after `SLACK_TRIAGE_CHANNEL` (hint, you can get the id by opening that channel in a browser, it's the part of the URL that begins with `G`, eg `GABC123DE`)
4. Go to api.slack.com/apps and create a new app
5. Go to OAuth and permissions and add the following scopes: `bot` and `commands` then click the green **Save changes** button.
6. Go to Bot Users and click the **Add a Bot** button. Set the display name and the username. Clic the green **Add Bot User** button.
7. Install the app on your workspace, accept the OAuth
8. Copy the Bot User OAuth Access Token that begins with `xoxb` and paste it into the .env file after `SLACK_BOT_TOKEN`
9. Go to Basic Information and click the **Show** button in the Signing Secret field, then copy that string. In the .env file, paste after `SLACK_SIGNING_SECRET`
10. Back in the app configuration, go to Interactive Components, turn Interactivity to `On` and set the Request URL to https://YOUR-DOMAIN.TLD/slack/events
11. On the same Interactive Components page, click the **Create New Action** button and set the fields to:
	* Action Name: `Report message...`
	* Short Description: `Report this message as inapporpriate`
	* Callback ID: `report_message`
12. Deploy your code :)


## Using the app
