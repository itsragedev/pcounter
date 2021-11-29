const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a user')
		.addUserOption(option => option.setName('user').setDescription('Enter username').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Enter reason for ban')),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');
		const guild = interaction.guild.name;
		
		if(interaction.member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS]) || interaction.member.id === interaction.guild.ownerId){
			if(!reason){
				await user.send('You were banned from ' + guild);
				interaction.guild.members.ban(user);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Banned ' + user);
			} else {
				await user.send('You were banned from ' + guild + ' for the following reason:\n' + reason);
				await interaction.guild.members.ban(user, [0, reason ]);
				await interaction.reply({ content: ':thumbsup:', ephemeral: true });
				await interaction.channel.send('Banned ' + user + ' because of ' + reason);
				
			}
		} else {
			await interaction.reply({ content: 'You don\'t have the permissions to use this command!', ephemeral: true });
		}
	},
};
