import { Client } from 'discord.js';

export default (client: Client): void => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    const { member, guild } = oldState;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;
    const user = await client.users.fetch(newState.id);

    if (!oldChannel && newChannel!.name === process.env.VC_NAME) {
      const channel = await guild.channels.create(`🗣️ ${user.username}`, {
        type: 'GUILD_VOICE',
        parent: newChannel?.parent?.id,
      });
      member!.voice.setChannel(channel);
    } else if (!newState.channel) {
      if (oldChannel?.members.size === 0) {
          oldState!.channel!.delete();
      }
    }
  });
};
