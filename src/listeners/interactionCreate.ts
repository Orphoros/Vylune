import {
  Client, GuildMemberRoleManager, Interaction,
} from 'discord.js';
import returnMessage from '../util/responseGiver';

export default (client: Client): void => {
  client.on('interactionCreate', async (interaction:Interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    const roles = interaction.member?.roles as GuildMemberRoleManager;

    if (roles.cache.find((r) => r.name === process.env.ADMIN_ROLE_NAME)) {
      interaction.channel?.send(`${options.getMentionable('recipient') ?? ''} ${options.getString('message')}`)
        .then(() => {
          interaction.reply({
            content: returnMessage('com.orphoros.vylune.sys.command.sma'),
            ephemeral: true,
          });
        })
        .catch(() => {
          interaction.reply({
            content: returnMessage('com.orphoros.vylune.sys.command.err'),
            ephemeral: true,
          });
        });
    } else {
      interaction.reply({
        content: returnMessage('com.orphoros.vylune.sys.command.sma.reject'),
        ephemeral: true,
      });
    }
    // TODO: Implement slash command VC making
  });
};
