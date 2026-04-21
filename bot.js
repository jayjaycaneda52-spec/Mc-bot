const mineflayer = require('mineflayer')
const express = require('express')
const fs = require('fs')

// Load settings.json
const settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'))

// Keep alive server para kay Render - ISA LANG TO
const app = express();
app.get('/', (req, res) => res.send('Jay_afk bot is running!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Fake web server running on ${PORT}`));

// Gawa ng bot
const bot = mineflayer.createBot({
  host: settings.host,
  port: settings.port,
  username: settings.username,
  version: settings.version
})

// Bot events
bot.on('spawn', () => {
  console.log('[BotLog] Bot spawned!')
  console.log(`[BotLog] Logged in as ${bot.username}`)
})

bot.on('login', () => {
  console.log('[BotLog] Bot logged in to server')
})

bot.on('kicked', (reason) => {
  console.log('[BotLog] Bot kicked:', reason)
})

bot.on('error', (err) => {
  console.log('[BotLog] Bot error:', err)
})

bot.on('end', () => {
  console.log('[BotLog] Bot disconnected')
  if (settings['auto-reconnect']) {
    console.log('[BotLog] Reconnecting in 5s...')
    setTimeout(() => process.exit(), 5000)
  }
})

// Auto-chat kung naka-enable sa settings.json
if (settings['chat-messages'] && settings['chat-messages'].enabled) {
  setInterval(() => {
    const msg = settings['chat-messages'].messages[Math.floor(Math.random() * settings['chat-messages'].messages.length)]
    bot.chat(msg)
    console.log(`[BotLog] Sent message: ${msg}`)
  }, settings['chat-messages']['repeat-delay'] * 1000)
}

// Chat log kung naka-enable
if (settings['chat-log']) {
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(`[ChatLog] <${username}> ${message}`)
  })
}

console.log('[BotLog] Starting bot...')
