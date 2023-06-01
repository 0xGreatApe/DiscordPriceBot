// Initialize dotenv
require("dotenv").config();

const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
} = require("discord.js");
const fetch = require("node-fetch");

const token = process.env.CLIENT_TOKEN;
const coinId = process.env.COIN_ID;
const guildId = process.env.GUILD_ID;

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

try {
  client.login(token);
  console.log(client.guilds.cache.map((guild) => guild.id));
} catch {
  (error) => {
    console.error(`Error logging in: ${error.message}`);
  };
}

client.on("ready", async () => {
  let data;
  let response;
  let tokenPriceUSD;
  let usd_24h_change;

  setInterval(async () => {
    try {
      response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=nitro-cartel&vs_currencies=usd&include_24hr_change=true`
      );
      data = await response.json();
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
      return;
    }
    // get and update price
    tokenPriceUSD = parseFloat(data[coinId].usd.toFixed(5));
    usd_24h_change = parseFloat(data[coinId].usd_24h_change.toFixed(2));
    let priceChange = `TROVEUSD | ${usd_24h_change}%`;
    let currentPrice = `$${tokenPriceUSD}`;

    // Get the guild using its ID
    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      console.error(`Guild with ID ${guildId} not found`);
      return;
    }

    // Get the bot's member object in the guild
    guild.members
      .fetch(client.user.id)
      .then((botMember) => {
        botMember
          .setNickname(currentPrice)
          .then((updated) =>
            console.log(`Updated bot nickname to ${updated.nickname}`)
          )
          .catch(console.error);
      })
      .catch(console.error);

    // Update activity status
    try {
      const presenceUpdate = client.user.setActivity(priceChange, {
        type: ActivityType.Watching,
      });
      console.log(`Activity set to ${presenceUpdate.activities[0].name}`);
    } catch (error) {
      console.error(`Error setting activity: ${error}`);
    }
  }, 10000); // update every 30 mins 1800000
});
