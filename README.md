# Discord Price Bot

[![Code Coverage](https://img.shields.io/codecov/c/github/0xGreatApe/DiscordPriceBot.svg)](https://codecov.io/gh/0xGreatApe/DiscordPriceBot)
[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/your-username/your-project/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)

DiscordPriceBot is a Discord bot that provides real-time pricing information for Arbitrove tokens. It fetches the latest price data from the Coingecko API and displays it as the bot's nickname in each server it is a member of. Additionally, it sets a custom activity status showing the 24-hour change percentage of the token's price.

## Features

- Fetches real-time pricing data for Arbitrove tokens from the Coingecko API.
- Sets the bot's nickname in each server to display the current token price.
- Sets a custom activity status showing the 24-hour change percentage of the token's price.
- Updates the token price and activity status periodically to reflect the latest data.

## Requirements

- Node.js (v16 or higher)
- Discord.js library
- dotenv library
- node-fetch library

## Setup

1. Clone the repository and navigate to the project directory.

2. Install the dependencies by running the following command:

   > npm install

3. Create a `.env` file in the project directory and add the following environment variables:

   > CLIENT_TOKEN=YOUR_DISCORD_BOT_TOKEN
   >
   > COIN_ID=ARBITROVE_COIN_ID
   >
   > PORT=YOUR_LOCAL_PORT

   Note: `PORT` only needs to be set if the default `8080` is in use.

4. Replace `YOUR_DISCORD_BOT_TOKEN` with your Discord bot token, `COIN_ID` with the Coin ID you wish to track 4. Run the bot by executing the following command:

   > node index.js

5. Run the bot using:

   > npm start

6. Run tests using:

   > npm test

The bot will now be online and start updating the nickname and activity status in the specified guild.

## Customization

- You can modify the interval at which the bot updates the token price and activity status by changing the value of the `setInterval` function in the code.
- You can update the token by changing `COIN_ID` in your `.env` file
- You can update the % change in the tokens value by setting the query parameters in the get request from coingecko
- To customize the activity type and format, refer to the [Discord.js documentation](https://discord.js.org/#/docs/main/stable/typedef/ActivityType).

## Reference

- [Discord.js Documentation](https://discord.js.org/#/docs/main/stable/general/welcome)
- [Coingecko API](https://coingecko.com/api/documentation)
- [Deploying your bot for free](https://docs.replit.com/tutorials/nodejs/build-basic-discord-bot-nodejs)
