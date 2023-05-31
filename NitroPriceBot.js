// Initialize dotenv
require("dotenv").config();

const Discord = require("discord.js");

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Discord.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const token = process.env.CLIENT_TOKEN;

client.on("ready", () => {
  console.log("I'm in");
  console.log(client.user.username);
});

client.on("messageCreate", (msg) => {
  if (msg.author.id != client.user.id) {
    msg.channel.send(msg.content.split("").reverse().join(""));
  }
});

client.login(token);
