const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('Say something through the bot')
		.addStringOption(option => option.setName('input').setDescription('Enter a string').setRequired(true))
		.addChannelOption(option => option.setName('channel').setDescription('The channel to send the message in (optional)')),
	async execute(interaction) {
		const content = interaction.options.getString('input');
		const destination = interaction.options.getChannel('channel'); // channel to send it in (if specified)
		
		if(interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.MANAGE_ROLES, Permissions.FLAGS.MANAGE_GUILD]) || interaction.member.id === interaction.guild.ownerId){
			if(!destination){
				await interaction.channel.send(content);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
			} else {
				await destination.send(content)
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
			}
		} else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};
