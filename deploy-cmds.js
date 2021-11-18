const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('[?] Refreshing global application commands...');

		await rest.put(
			Routes.applicationCommands(process.env.CLIENT),
			{ body: commands },
		);

		console.log('[+] Successfully reloaded global application commands.');
	} catch (error) {
		console.error('[!] Error while refreshing application commands globally. Full log:\n----------------\n' + error + '\n----------------');
	}
})();
