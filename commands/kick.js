const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a user')
		.addUserOption(option => option.setName('user').setDescription('The user to kick from the server').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Enter reason for kick')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');
		const guildName = interaction.guild.name;
		
		if(interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS]) || interaction.member.id === interaction.guild.ownerId){
			if(!reason){
				await interaction.guild.members.kick(user);
				//await user.send('You were kicked from ' + guildName);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Kicked ' + user);
			} else {
				await interaction.guild.members.kick(user, reason);
				//await user.send('You were kicked from ' + guildName + ' for the following reason:\n' + reason);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Kicked ' + user + ' because of ' + reason);
			}
		} else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};
