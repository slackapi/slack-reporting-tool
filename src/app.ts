import dotenv from 'dotenv';
dotenv.config();

const { App } = require('@slack/bolt');

const app = new App({
  authorize: () => {
    return Promise.resolve({
      botToken: process.env.SLACK_BOT_TOKEN,
      // userToken: process.env.SLACK_USER_TOKEN,
    });
  },
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: 'DEBUG'
})
