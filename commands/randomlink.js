const { SlashCommandBuilder } = require('@discordjs/builders');

const link = [
	'https://gamezebesivevrdeviantappareldevotespage.webnode.com/',
	'https://',
	'https://goos.live/',
	'https://zoomquilt.org/'
];
var rNum = Math.floor(Math.random() * (link.length));

function sleep(milliseconds) {
	return new Promise(resolve => setTimeout(resolve, milliseconds));
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomlink')
		.setDescription('Replies with a random URL from the bot\'s database.'),
	async execute(interaction) {
		await interaction.deferReply();
		rNum = Math.floor(Math.random() * (link.length));
		await sleep(Math.ceil(Math.random() * 4567) + 1000)
		await interaction.editReply(link[rNum]);
	},
};
