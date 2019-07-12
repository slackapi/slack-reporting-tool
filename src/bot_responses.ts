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
          "url": `${process.env.CODE_OF_CONDUCT_URL}`
        }
      }
    ]
  },
  "help":{
    "text": "The reporting tool is meant for reporting messages that may violate the Code of Conduct for the Slack Community workspace.",
    "blocks": [
      {
        "type": "section",
        "text":{
          "type": "mrkdwn",
          "text": "The reporting tools is meant for reporting messages that may violate the Code of Conduct for the Slack Community workspace. Reported messages are sent to a private channel monitored by team administrators, who will determine the appropriate action to take."
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "section",
        "text":{
          "type": "mrkdwn",
          "text": "*Usage*\nTo report a message as inappropriate, hover over the message and click the *More shortcuts* overflow menu (with the three dots) or long press the message on mobile. If *Report Message* is not listed, select the option for *More Message shortcuts* and then search for *Report Message*.\nWhen you report a message, you will have the option to add an optional comment as well as report the message anonymously, without your name or any other identifying information.\nAfter the message has been reported to the workspace administrators, you will receive a DM from the app to let you know it has been reported. No information about reported messages will be stored by the app, including who reported it, nor will there be any public notification that a message has been reported.\nIf you choose to include your name with a reported message an administrator may contact you. If you report a message anonymously, there is no way for an administrator to identify who reported the message."
        }
      },
      {
        "type": "divider"
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
          "url": `${process.env.CODE_OF_CONDUCT_URL}`
        }
      }
    ]
  }
}
