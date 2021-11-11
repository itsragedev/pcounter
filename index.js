const Discord = require('discord.js');
// loads up the discord.js library
const client = new Discord.Client();
const fs = require('fs')
const prefix = "!"
const cooldown = new Set();
const ON_DEATH = require('death');
/*const dotenv = require('dotenv');

dotenv.config();*/

const money = require('./money.json')

ON_DEATH(function(signal, err) {
	client.destroy();
	try {
		client.destroy();
	} catch (err) {
		console.error("There Is Eror:"+err);
	}
	console.log("Studown In BrocresS!")
})

client.on("ready", () => {
	console.log(`Bot is online!`)
	client.user.setPresence({
		game: {
			name: 'viruses to your computer',
			type: 'STREAMING' // PLAYING, WATCHING, LISTENING, STREAMING
		},
		status: 'online' // online, idle, dnd, invisible
	})
})
});
// command handler
fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
	let eFunction = require(`./commands/${file}`);
	let eName = file.split(".")[0];
	client.on(eName, (...args) => eFunction.run(client, ...args));
	});
});

client.on("message", async message => {

	if (message.author.bot) return;
	if (message.content.indexOf(prefix) !== 0) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command = "test") {
		message.reply("message")
	}

	try {
		let cmdFile = require(`./commands/${command}.js`);
		cmdFile.run(client, message, args);
	} catch (err) {
		console.error(err);
	}
});

client.login(process.env.TOKEN)