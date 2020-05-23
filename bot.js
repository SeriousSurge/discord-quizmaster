const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//gets the commands from the commands file
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

//first time bot load
client.once('ready', () => {
	console.log('Ready!');
});

//main loop while active
client.on('message', message => {
    //exit early if the message isn't relevant
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    //split out the commands and the arguements
	const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // return an error if the command doesn't exist
    if (!client.commands.has(commandName)){
        message.reply('That is not a valid command');
        return;
    }

    //simplify the command into a single variable
    const command = client.commands.get(commandName);

    //Checks if a message can only be run in a server (And not in DM)
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    //return an error if arguements are required but not provided
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    //Cooldown handling for commands
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    // Delete irrelevant cooldown records
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        
    
    //Try to run the command, reply with an error if it fails
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
    
});


client.login(token);
