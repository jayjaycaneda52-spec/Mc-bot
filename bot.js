const mineflayer = require('mineflayer')
const express = require('express')

// 1. FAKE WEB SERVER PARA DI KA PATAYIN NI RENDER
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('MC Bot Online'))
app.listen(PORT, () => console.log(`Web server running on ${PORT}`))

// 2. 15 SECONDS DELAY BAGO MAG CONNECT SA ATERNOS
console.log('Waiting 15 seconds before connecting to MC...')
setTimeout(() => {
  startBot()
}, 15000)

function startBot() {
  console.log('Connecting to Aternos now...')
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io', // DOUBLE CHECK MO TO KUNG TAMA
    port: 25565,
    username: 'StarlightBot',
    version: '1.20.1', 
    auth: 'offline'
  })

  bot.on('login', () => {
    console.log('SUCCESS: Bot logged in to server')
  })

  bot.on('spawn', () => {
    console.log('SUCCESS: Bot joined the game')
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked:', reason)
    console.log('Restarting in 40s to clear ghost session...')
    setTimeout(() => process.exit(1), 40000)
  })

  bot.on('error', err => {
    console.log('Bot error:', err.message)
  })

  bot.on('end', () => {
    console.log('Disconnected. Restarting in 40s...')
    setTimeout(() => process.exit(1), 40000)
  })
}
