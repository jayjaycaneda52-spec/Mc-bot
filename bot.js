const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'karacraftsmp888.mcsh.io', // palitan mo
    port: 25565, // palitan mo kung iba port
    username: 'mori', // palitan mo
    version: false
  })

  bot.on('spawn', () => {
    console.log('[BotLog] Bot connected')
  })

  bot.on('kicked', (reason) => {
    console.log('[BotLog] Kicked from server:', reason)
    console.log('[BotLog] Reconnecting in 5 sec...')
    setTimeout(() => createBot(), 5000)
  })

  bot.on('error', (err) => {
    console.log('[BotLog] Bot error:', err.message)
    console.log('[BotLog] Reconnecting in 5 sec...')
    setTimeout(() => createBot(), 5000)
  })

  bot.on('end', () => {
    console.log('[BotLog] Bot disconnected')
    console.log('[BotLog] Reconnecting in 5 sec...')
    setTimeout(() => createBot(), 5000)
  })
} // end ng createBot function

createBot() // start mo yung bot

// KEEP ALIVE PARA DI MATULOG SA RENDER LALA
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Mori is alive! Last ping: ' + new Date().toLocaleString())
})

app.listen(port, () => {
  console.log(`[KeepAlive] Web server running on ${port}`)
})
