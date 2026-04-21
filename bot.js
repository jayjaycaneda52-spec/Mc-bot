const mineflayer = require('mineflayer')
const express = require('express')
const fs = require('fs')

// Load settings.json
const settings = JSON.parse(fs.readFileSync('./settings.json', 'utf8'))

// Keep alive server para kay Render
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
bot.once('spawn', () => {
  console.log('[BotLog] Bot spawned!')
  console.log(`[BotLog] Logged in as ${bot.username}`)

  setTimeout(() => {
    // Login para sa LoginSecurity
    bot.chat('/register 123456 123456')
    bot.chat('/login 123456')
    console.log('[BotLog] Sent /login command')

    // Skin set after 5 seconds
    setTimeout(() => {
      bot.chat('/skin set mori')
      console.log('[BotLog] Sent /skin set mori')
    }, 5000)

    // Anti-AFK: Jump + Sneak + Look every 30s para di ma-kick
setInterval(() => {
  bot.setControlState('jump', true)
  bot.setControlState('sneak', true)

  setTimeout(() => {
    bot.setControlState('jump', false)
    bot.setControlState('sneak', false)
  }, 500)

  console.log('[BotLog] Anti-AFK: Jump + Sneak')
}, 30000)

// Look around every 15 seconds para mas human-like
setInterval(() => {
  const yaw = Math.random() * Math.PI * 2
  const pitch = (Math.random() - 0.5) * 0.5
  bot.look(yaw, pitch, true)
}, 15000)

  }, 3000)
})

bot.on('chat', (username, message) => {
  console.log(`${username}: ${message}`)
})

// AUTO RECONNECT PAG NA-KICK LALA - ITO YUNG FIX 2
bot.on('kicked', (reason) => {
  console.log('[BotLog] Bot kicked:', reason)
  console.log('[BotLog] Reconnecting in 5 seconds...')
  setTimeout(() => process.exit(1), 5000)
})

bot.on('error', (err) => {
  console.log('[BotLog] Bot error:', err)
  console.log('[BotLog] Reconnecting in 5 seconds...')
  setTimeout(() => process.exit(1), 5000)
})

bot.on('end', () => {
  console.log('[BotLog] Bot disconnected')
  console.log('[BotLog] Reconnecting in 5 seconds...')
  setTimeout(() => process.exit(1), 5000)
})
