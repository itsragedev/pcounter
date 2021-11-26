const fs = require('fs');
const { Client, Collection, Intents, Permissions } = require('discord.js');

const client = new Client({
	intents: [Intents.FLAGS.GUILDS]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const ON_DEATH = require('death');
ON_DEATH(function(signal, err) {
	console.log("[?] Shutting down...");
	try {
		client.destroy();
	} catch (err) {
		console.error("[!] Shutdown failed because of: " + err);
	}
});

client.on("ready", () => {
	console.log('[+] Bot has logged in and is online as ' + client.user.username + '#' + client.user.discriminator);
	client.user.setActivity(String('pCounter | /help'), { type: 'PLAYING' });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error('[!] Error while executing command request. Full log:\n----------------\n' + error + '\n----------------');
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.TOKEN);