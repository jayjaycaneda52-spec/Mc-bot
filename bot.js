const mineflayer = require('mineflayer')
const express = require('express') // KAILANGAN TO PARA KAY RENDER

// Fake web server para hindi mag exit si Render
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('MC Bot Running'))
app.listen(PORT, () => console.log(`Web server on port ${PORT}`))

// Delay bago mag connect para iwas "already online"
setTimeout(() => {
  startBot()
}, 10000) // 10 seconds delay

function startBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.aternos.me', // PALITAN MO KUNG MALI
    port: 25565,
    username: 'StarlightBot',
    version: '1.20.1',
    auth: 'offline'
  })

  bot.on('login', () => {
    console.log('Bot logged in to server')
  })

  bot.on('spawn', () => {
    console.log('Bot joined the game')
  })

  bot.on('kicked', (reason) => {
    console.log('Kicked from server:', reason)
    console.log('Restarting in 35s...')
    setTimeout(() => process.exit(1), 35000)
  })

  bot.on('error', err => {
    console.log('Bot error:', err)
  })

  bot.on('end', () => {
    console.log('Bot disconnected. Restarting in 35s...')
    setTimeout(() => process.exit(1), 35000)
  })
}
