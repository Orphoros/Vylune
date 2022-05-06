import { Client } from 'discord.js';
import reply from '../util/ai';
import npl from '../util/dataFromatter';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async (client: Client, nlp: any): Promise<void> => {
  client.on('messageCreate', async (message) => {
    if (!message.author.bot) {
      if (!message.content.includes('@here') && !message.content.includes('@everyone') && message.type !== 'REPLY') {
        if (message.mentions.has(client.user!.id)) {
          // FIXME: If @Vylune is not at the bigging, text brakes
          const originalMessage = message.content.replace(`<@${process.env.BOT_ID}>`, '').trim();
          // TODO: Run net at the ai.ts file
          const processedText = npl(originalMessage);
          const answer = await reply(nlp, processedText);
          // message.channel.send(answer);
          message.reply(answer);
        }
      }
    }
  });
};
