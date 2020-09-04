import { View } from '@slack/types';

export default {
  confirm(message_ts: string, channel_id: string, message_text: string, message_author: string): View {
    return {
      type: 'modal',
      callback_id: 'report_confirm',
      title: {
        type: 'plain_text',
        text: 'Report this message',
        emoji: true,
      },
      submit: {
        type: 'plain_text',
        text: 'Report',
        emoji: true,
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true,
      },
      private_metadata: `${JSON.stringify({ message_ts, channel_id, message_text, message_author })}`,
      blocks: [
        {
          type: 'input',
          element: {
            action_id: 'report_comment',
            type: 'plain_text_input',
            multiline: true,
          },
          label: {
            type: 'plain_text',
            text: 'Why are you reporting this message?',
            emoji: true,
          },
          block_id: 'report_comment'
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: 'Optionally add any context or information you believe is important. This will be shared with moderators along with the original message.',
            },
          ],
        },
        {
          type: 'input',
          block_id: 'anonymous_report_selector',
          element: {
            action_id: 'anonymous_report_selector',
            type: 'static_select',
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Yes, include my name with the report',
                  emoji: true,
                },
                value: 'false',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'No, report anonymously',
                  emoji: true,
                },
                value: 'true',
              },
            ],
          },
          label: {
            type: 'plain_text',
            text: 'Include your name?',
            emoji: true,
          },
        },
      ],
    }
  }
}
