const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'mori_bot',
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
bot.on('spawn', () => {
  console.log('[BotLog] Bot connected')

  // AUTO LOGIN/REGISTER
  setTimeout(() => {
    bot.chat('/register 123456 123456')
    console.log('[BotLog] Sent register command')
  }, 2000)

  setTimeout(() => {
    bot.chat('/login 123456')
    console.log('[BotLog] Sent login command')
  }, 5000)

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

  // AUTO LEAVE EVERY 10 MINS - DAGDAG MO TO
  setTimeout(() => {
    console.log('[BotLog] 10 minutes na, disconnect na ako')
    bot.quit('10 min restart')
  }, 10 * 60 * 1000) // 10 mins = 600000ms
})
createBot()

// KEEP ALIVE PARA DI MATULOG SA RENDER
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Mori is alive!'))
app.listen(port, () => console.log(`[KeepAlive] Running on ${port}`))
