import { Client, Constants } from 'discord.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) {
      return;
    }

    // TODO: Run only when needed
    client.application.commands.set([]);
    const devGuild = await client.guilds.fetch(process.env.GUILD_ID ?? '');
    devGuild.commands.set([]);

    const guildID = process.env.USE_GUILD === 'true' ? process.env.GUILD_ID : '';
    const guild = client.guilds.cache.get(guildID as string);

    // TODO: Move this to a separate file
    let commands;
    if (guild) commands = guild.commands;
    else commands = client.application?.commands;
    commands?.create({
      name: 'say',
      description: 'Makes Vylune say something',
      options: [
        {
          name: 'message',
          description: 'Message to say',
          required: true,
          type: Constants.ApplicationCommandOptionTypes.STRING,
        },
        {
          name: 'recipient',
          description: 'Who will be tagged',
          required: false,
          type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
        },
      ],
    });
    /*
    commands.create({
      name: 'makevc',
      description: 'Crate new voice channel',
      options: [
        {
          name: 'name',
          description: 'Name of the VC',
          required: true,
          type: Constants.ApplicationCommandOptionTypes.STRING,
        },
      ],
    });
    */

    client.user.setActivity('what people say', { type: 'LISTENING' });

    console.log(`${client.user.username} is online`);
  });
};
