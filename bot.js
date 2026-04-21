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
      bot.chat('/skin set Esoni')
      console.log('[BotLog] Sent /skin set Esoni')
    }, 5000)

    // Anti-AFK jump every 1 minute para di ma-kick
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      console.log('[BotLog] Anti-AFK jump')
    }, 60000)

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
