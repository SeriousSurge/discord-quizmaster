module.exports = {
	name: 'play',
	description: 'Starts a game of \'Opps All Trivia',
	args: true,
	usage: '<args> <args> ...n <args>',
	guildOnly: true,
	cooldown: 30,
	execute(message, args) {
		if (args[0] === 'oopsAllTrivia') {
            message.channel.send('Let\'s Play some oops all trivia! ');
			return message.channel.send('How many players do we have today?');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};