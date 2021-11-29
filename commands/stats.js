const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var os = require('os-utils');
var osu = require('node-os-utils');
var cpu = osu.cpu;

var cpuUsage, ramTotal, ramFree, ramUsage, netUsage, guildCount;

os.cpuUsage(function(v){
	console.log('CPU Usage (%): ' + v);
});

cpuUsage = -1; // idk why os-utils and node-os-utils dont work on termux
ramTotal = Math.round(os.totalmem());
ramFree = Math.round(os.freemem());
ramUsage = Math.round((ramFree / ramTotal) * 100);
netUsage = -1;
guildCount = -2137476;

const infoMsg = new MessageEmbed()
	.setColor('#abcdef')
	.setTitle('Bot Stats')
	.setDescription('The bot\'s Statistics page for things like the CPU/memory/network usage, amount of servers the bot is in, etc. (A value of -1 means not retrievable)')
	.setThumbnail('https://raw.githubusercontent.com/itsragedev/pcounter/gh-pages/pCounter.png')
	.addField('CPU usage', cpuUsage.toString() + '%', true)
	.addField('Memory usage', ramUsage.toString() + '% out of ' + ramTotal + ' MB', true)
	.addField('Network usage', netUsage.toString() + '%', true)
	.addField('Guild Count', guildCount.toString(), true)
	.setTimestamp()
	.setFooter('pCounter - maintained with \uD83C\uDF5E by itsragedev', 'https://raw.githubusercontent.com/itsragedev/pcounter/gh-pages/pCounter.png');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Displays basic statistics about the bot'),
	async execute(interaction) {
		await interaction.reply({ embeds: [infoMsg] });
	},
};
