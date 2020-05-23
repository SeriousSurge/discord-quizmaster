
# Discord QuizMaster for card games


QuizMaster is an attempt to bring a homebrew gamme 'oops all trivia' into Discord. It is coded in JavaScript using the Discord.js library.

## Game configuration

This game is fully automatic and requires no commands to be input during gameplay.

To remove decks from the pool of cards used to build the deck just move then to the 'ignore' folder.

## Bot set-up
Clone or download this repository and run it remotely on your server. Please note that you require the minimum Node version **10.1.0** to run this bot.


You will also need to create a bot user on Discord and add it to your server. I suggest reading this guide: https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token

## Dependencies
**You have to install Discord.js through NPM**, NodeJS' package manager to run this bot. For help in installing Discord.js, visit: https://discord.js.org/#/.

Other packages used by this module (such as FileSystem) should already be installed by default with NodeJS.

## Bot configuration
There is only one configuration file for this bot: `config.json`. You should just need to fill in the key.

## Adding new cards

To add new cards, plop them into the cards folder, Cards are organised by categories for filetring the card pool that makes the deck. 

Each card is to be separated by a newline.


### Contact

I'm reachable through Discord

Discord: `SeriousSurge#9341`



