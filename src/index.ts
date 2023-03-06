import {
  ActivityType,
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
} from "discord.js";
import commands from "./commands";
import { token } from "./const";

const rest = new REST({ version: "10" }).setToken(token);
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(c.user);
  c.guilds.fetch().then(console.log);
  rest.put(Routes.applicationCommands(c.application.id), {
    body: commands.map((c) => c.data.toJSON()),
  });
  client.user?.setActivity("with Tanjiro niichan", { type: ActivityType.Playing });
});

client.on(Events.InteractionCreate, (i) => {
  if (!i.isCommand()) return;

  const cmd = commands.find((c) => i.commandName == c.data.name);
  if (cmd) {
    cmd.exec(i);
  }
});

client.login(token);
