const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(3000, () => console.log('Port :3000 opened'));

const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const settings = require('./settings.json');

const bot = mineflayer.createBot({
  host: settings.server.ip,
  port: settings.server.port,
  username: settings.bot.username,
  version: settings.server.version,
  auth: settings.bot.auth
});

bot.loadPlugin(pathfinder);

bot.on('spawn', () => {
  console.log('[BotLog] Bot has spawned');
  if (settings.utils['auto-auth'].enabled) {
    setTimeout(() => {
      bot.chat(`/register ${settings.utils['auto-auth'].password} ${settings.utils['auto-auth'].password}`);
      bot.chat(`/login ${settings.utils['auto-auth'].password}`);
    }, 500);
  }
});

bot.on('kicked', (reason) => {
  console.log('[BotLog] Bot was kicked. Reason:', reason);
  if (settings['auto-reconnect']) {
    setTimeout(() => process.exit(), settings['auto-reconnect-delay'] * 1000);
  }
});

bot.on('error', (err) => {
  console.log('[BotLog] Bot error:', err);
});

bot.on('end', () => {
  console.log('[BotLog] Bot disconnected');
  if (settings['auto-reconnect']) {
    setTimeout(() => process.exit(), settings['auto-reconnect-delay'] * 1000);
  }
});

if (settings['chat-messages'].enabled) {
  setInterval(() => {
    const msg = settings['chat-messages'].messages[Math.floor(Math.random() * settings['chat-messages'].messages.length)];
    bot.chat(msg);
  }, settings['chat-messages']['repeat-delay'] * 1000);
}

if (settings['chat-log']) {
  bot.on('chat', (username, message) => {
    console.log(`[ChatLog] <${username}> ${message}`);
  });
}
// Keep alive para kay Render
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Jay_afk bot is running!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Fake web server running on ${PORT}`));
