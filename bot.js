const mineflayer = require('mineflayer')
const express = require('express')

// ETO IMPORTANTE PARA KAY RENDER + UPTIMEROBOT
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Bot is alive'))
app.listen(PORT, () => console.log(`HTTP running on ${PORT}`))

function createBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'StarlightBot',
    version: '1.20.1',
    auth: 'offline'
  })

  bot.on('login', () => console.log('LOGIN OK'))
  bot.on('spawn', () => console.log('NASA LOOB NA'))
  
  bot.on('end', () => {
    console.log('Na-disconnect, reconnect in 40s...')
    setTimeout(createBot, 40000) // Auto-reconnect, hindi exit
  })

  bot.on('error', err => {
    console.log('ERROR:', err.message)
    // Wag mag exit agad
  })

  bot.on('kicked', (reason) => {
    console.log('KICKED:', reason)
    setTimeout(createBot, 40000) // Auto-reconnect, hindi exit
  })
}

createBot() // Start bot
