// Initialize dotenv
require("dotenv").config();

const {
  Client,
  Events,
  GatewayIntentBits,
  ActivityType,
  GuildMember,
} = require("discord.js");
const fetch = require("node-fetch");
const keep_alive = require("./keep_alive.js");

const token = process.env.CLIENT_TOKEN;
const coinId = process.env.COIN_ID;

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

    tokenPriceUSD = parseFloat(data[coinId].usd.toFixed(5));
    usd_24h_change = parseFloat(data[coinId].usd_24h_change.toFixed(2));

    let priceChange = `TROVEUSD | ${usd_24h_change}%`;
    let currentPrice = `$${tokenPriceUSD}`;

    // Get the guild using its ID
    client.guilds.cache.forEach((guild) => {
      guild.members
        .fetch(client.user.id)
        .then((botMember) => {
          botMember
            .setNickname(currentPrice)
            .then((updated) =>
              console.log(`Updated bot nickname in guild ${guild.id} to ${updated.nickname}`)
            )
            .catch((error) => {
              console.error(`Error setting nickname in guild ${guild.id}: ${error.message}`);
            });
        })
        .catch((error) => {
          console.error(`Error fetching bot member in guild ${guild.id}: ${error.message}`);
        });
    });

    try {
      const presenceUpdate = client.user.setActivity(priceChange, {
        type: ActivityType.Watching,
      });
      console.log(`Activity set to ${presenceUpdate.activities[0].name}`);
    } catch (error) {
      console.error(`Error setting activity: ${error}`);
    }
  }, 10000); // update every 10 seconds
});

