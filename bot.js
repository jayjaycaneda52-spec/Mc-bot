const mineflayer = require('mineflayer')
const express = require('express')

// 1. PARA KAY RENDER + UPTIMEROBOT - MAGIGISING BOT MO
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Mori bot is alive'))
app.listen(PORT, () => console.log(`HTTP server on ${PORT}`))

// 2. 15 SECONDS DELAY PARA IWAS "ALREADY ONLINE"
setTimeout(() => {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io', // ETO NA TAMANG HOST MO
    port: 25565,
    username: 'StarlightBot',
    version: '1.20.1',
    auth: 'offline'
  })

  bot.on('login', () => console.log('LOGIN OK SA MCSH.IO'))
  bot.on('spawn', () => console.log('NASA LOOB NA NG SERVER'))
  
  bot.on('kicked', (reason) => {
    console.log('KICKED:', reason)
    setTimeout(() => process.exit(1), 40000)
  })

  bot.on('end', () => {
    console.log('DISCONNECTED')
    setTimeout(() => process.exit(1), 40000)
  })

  bot.on('error', err => console.log('ERROR:', err.message))
}, 15000)
