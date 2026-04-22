const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'karacraftsmp888.mcsh.io',
    port: 25565,
    username: 'mori',
    version: false
  })

  bot.on('spawn', () => {
    console.log('[BotLog] Bot connected')

    // ANTI-AFK: Talon every 20 seconds
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      console.log('[BotLog] Anti-AFK: jump')
    }, 20000)

    // ANTI-AFK: Palinga-linga every 15 seconds
    setInterval(() => {
      bot.look(Math.random() * Math.PI * 2, 0)
      console.log('[BotLog] Anti-AFK: look around')
    }, 15000)
  })

  bot.on('kicked', (reason) => {
    console.log('[BotLog] Kicked:', reason)
    console.log('[BotLog] Reconnecting in 40 sec...')
    setTimeout(() => createBot(), 40000)
  })

  bot.on('error', (err) => {
    console.log('[BotLog] Error:', err.message)
    console.log('[BotLog] Reconnecting in 40 sec...')
    setTimeout(() => createBot(), 40000)
  })

  bot.on('end', () => {
    console.log('[BotLog] Disconnected')
    console.log('[BotLog] Reconnecting in 40 sec...')
    setTimeout(() => createBot(), 40000)
  })
}

createBot()

// KEEP ALIVE PARA DI MATULOG SA RENDER
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Mori is alive!'))
app.listen(port, () => console.log(`[KeepAlive] Running on ${port}`))
