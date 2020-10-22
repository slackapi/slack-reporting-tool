
# Installing the app

1. In your Slack workspace, create a private channel for receiving reported messages.
2. Duplicate `.env.sample` to `.env`
3. Add the ID of the private channel you created above to your .env file, after `SLACK_TRIAGE_CHANNEL` (hint, you can get the id by opening that channel in a browser, it's the part of the URL that begins with `G`, eg `GABC123DE`)
4. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
5. Go to OAuth and permissions and add the following Bot Token scopes: `chat:write`, `im:history` and `commands`.
7. Install the app on your workspace, accept the OAuth
8. Add the application to the triage channel (in the channel click "Add an app" and find the app you created in step 4.)
9. Copy the Bot User OAuth Access Token that begins with `xoxb` and paste it into the .env file after `SLACK_BOT_TOKEN`
10. Go to Basic Information and click the **Show** button in the Signing Secret field, then copy that string. In the .env file, paste after `SLACK_SIGNING_SECRET`
11. Back in the app configuration, go to **Interactivity & Shortcuts**, turn Interactivity to `On` and set the Request URL to `https://YOUR-DOMAIN.TLD/slack/events`
12. On the same Interactive Components page, click the **Create New Shortcut** button and choose "On messages"
13. Set the fields to:
	* Name: `Report message...`
	* Short Description: `Report this message as inappropriate`
	* Callback ID: `report_message`
14. Deploy your code
15. Once your server is live, go back to the app configuration, choose **Event Subscriptions**, turn Enable Events to `On` and set the Request URL to `https://YOUR-DOMAIN.TLD/slack/events`
16. On the same Event Subscriptions page, click the **Subscribe to bot events** header and choose "Add Bot User Event"
17. Choose the `app_home_opened` and `message.im` events, then click the green "Save Changes" button

## Database

If the `SLACK_BOT_TOKEN` variable is not set, the App expects a MySQL table in the configured database. This table can be created with the following query -

```mysql
create table installations
(
    team_id      varchar(255) null,
    installation text         null
);
```