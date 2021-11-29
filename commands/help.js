const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const helpMsg = new MessageEmbed()
	.setColor('#abcdef')
	.setTitle('pCounter Help')
	.setURL('https://itsragedev.github.io/pcounter/')
	.setDescription('The pCounter help screen.\nArguments surrounded by <pointed> brackets are necessary, arguments surrounded by [square] brackets are optional.')
	.setThumbnail('https://raw.githubusercontent.com/itsragedev/pcounter/gh-pages/pCounter.png')
	.addFields(
		{ name: '``/help``', value: 'Shows this help screen.' },
		{ name: '``/info``', value: 'Displays info about the bot.' },
		{ name: '``/serverinfo``', value: 'Shows info about the current server.' },
		{ name: '``/stats``', value: 'Bot stats, like CPU or RAM usage, the amount of servers the bot is a member of, etc.' },
		{ name: '``/kick <user> [reason]``', value: 'Kicks a user from your server.' },
		{ name: '``/ban <user> [reason]``', value: 'Bans a user from your server.' },
		{ name: '``/say <message> [channel]``', value: 'Replies with the same message.' },
		{ name: '``/randomlink``', value: 'Fetches a random URL from the bot\'s database and posts it.' },
	)
	.setTimestamp()
	.setFooter('pCounter - maintained with \uD83C\uDF5E by itsragedev', 'https://raw.githubusercontent.com/itsragedev/pcounter/gh-pages/pCounter.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays the bot\'s help'),
	async execute(interaction) {
		await interaction.reply({ embeds: [helpMsg] });
	},
};
