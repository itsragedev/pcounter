const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Displays information about the server'),
	async execute(interaction) {
		var gName = interaction.guild.name; // Guild name
		var gDesc = interaction.guild.description; // Server Description
		var gMemC = interaction.guild.memberCount; // Amount of Members
		var gPart = interaction.guild.partnered; // Whether the server is partnered or not
		var gVeri = interaction.guild.verified; // Whether the server is verified or not
		var gStrP = 'Not partnered/verified'; // partnered or verified
		var gStrD = 'No description'; // description text
		
		// The below if statement could be avoided 
		// using a switch case statement
		// but i dont have the time for that now
		// so bear with it
		/*if (gPart == true) {
			gStrP = 'Partnered';
		} else if (gVeri == true) {
			gStrP = 'Verified';
		} else if (gPart && gVeri == true) {
			gStrP = 'Partnered and Verified'; // just in case
		}*/
		
		gStrP = [];
		if (gPart === true) {
			gStrP.push('Partnered');
		}
		if (gVeri === true) {
			gStrP.push('Verified');
		}
		gStrP = gStrP.join(' and ');
		if (gStrP === '') {
			gStrP = 'Not partnered/verified';
		}
		
		// description
		if (!gDesc) {
			gStrD = 'No description';
		} else {
			gStrD = gDesc;
		}
		
		const infoMsg = new MessageEmbed()
			.setColor('#abcdef')
			.setTitle('Server Info')
			.setDescription('Information about the current server')
			.setThumbnail('https://raw.githubusercontent.com/itsragedev/pcounter/gh-pages/pCounter.png')
			.addField('Server Name', gName)
			.addField('Server Description', gStrD)
			.addField('Member Count', gMemC.toString())
			.addField('Server Partner/Verification Status', gStrP)
			.setTimestamp()
			.setFooter('pCounter - maintained with \uD83C\uDF5E by itsragedev', 'https://raw.githubusercontent.com/itsragedev/pcounter/gh-pages/pCounter.png');
		
		await interaction.reply({ embeds: [infoMsg] });
	},
};
