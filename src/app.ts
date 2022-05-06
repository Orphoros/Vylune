import { Client, Intents } from 'discord.js';
import ready from './listeners/ready';
import interactions from './listeners/interactionCreate';
import vcController from './listeners/voiceStateUpdate';
import messageCreate from './listeners/messageCreate';
import trainnlp from './util/trainer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NlpManager } = require('node-nlp');

const nlpManager = new NlpManager({ languages: ['en'] });

const inint = async () => {
  if (process.env.TRAIN === 'true') {
    await trainnlp(nlpManager);
    return;
  }
  console.log('Bot is starting...');

  const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  });

  ready(client);
  interactions(client);
  vcController(client);
  await messageCreate(client, nlpManager);

  client.login(process.env.BOT_TOKEN);
};

inint();
