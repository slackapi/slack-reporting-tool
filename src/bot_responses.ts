module.exports = {
  "welcome":{
    "text": "Hello. This is a tool used for reporting messages that may violate the Code of Conduct for the Slack Community workspace.",
    "blocks":[
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Hello. This is a tool used for reporting messages that may violate the Code of Conduct for the Slack Community workspace."
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Read the Code of Conduct here"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": ":books: Code of Conduct",
            "emoji": true
          },
          "value": "coc_button_pressed",
          "action_id": "coc_button",
          "url": "https://community.slack.com/files/TG4KUE8JV/FMN6J0JKT?origin_team=TG4KUE8JV"
        }
      }
    ]
  }
}
