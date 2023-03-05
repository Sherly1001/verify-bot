import { Interaction, SlashCommandBuilder, TextChannel } from "discord.js";
import {
  memberRole,
  verifyChannel,
  welcomeChannel,
  welcomeMessage,
} from "../const";

export const verify = {
  data: new SlashCommandBuilder()
    .setName("agree")
    .setDescription("Please verify that you are a member and accept the rules."),

  exec: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const role = interaction.guild?.roles.cache.get(memberRole);
    if (!role) return;

    try {
      await interaction.deferReply();
      await interaction.deleteReply();

      if (interaction.channelId != verifyChannel) return;

      const res = await interaction.guild?.members.addRole({
        user: interaction.user,
        role: role,
      });

      if (res && welcomeMessage) {
        const channel = interaction.guild?.channels.cache.get(welcomeChannel);
        if (channel instanceof TextChannel) {
          channel.send(
            welcomeMessage.replace("<@user>", `<@${interaction.user.id}>`)
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
};
