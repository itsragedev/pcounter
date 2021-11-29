const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Displays general bot info'),
	async execute(interaction) {
		await interaction.reply('**pCounter** - a small discord bot\nThis bot is open source. Repo link: https://github.com/itsragedev/pcounter');
	},
};
