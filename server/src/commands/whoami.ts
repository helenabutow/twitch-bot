import { SECOND_MS } from '../constants';
import { fetchUserInformation } from '../handlers/fetchUserInformation';
import { sendChatMessage } from './helpers/sendChatMessage';
import type { BotCommand } from '../types';

export const whoami: BotCommand = {
  command: 'whoami',
  id: 'whoami',
  cooldown: 5 * SECOND_MS,
  callback: async (connection, parsedMessage) => {
    const userId = parsedMessage.tags?.['user-id'];
    if (userId) {
      const userInformation = await fetchUserInformation(userId);
      if (userInformation) {
        sendChatMessage(
          connection,
          `Here's what we know about you: You go by ${userInformation.display_name} and you've had ${userInformation.view_count} viewers so far`,
        );
      }
    }
  },
};
