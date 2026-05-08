const mineflayer = require('mineflayer')
const express = require('express')

// 1. PARA GISING SI RENDER + UPTIMEROBOT
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Bot Online'))
app.listen(PORT, () => console.log(`HTTP server running on ${PORT}`))

// 2. DELAY START PARA IWAS "GHOST LOGIN"
setTimeout(startBot, 25000)

function startBot() {
  console.log('Connecting to starlightfam.mcsh.io...')
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'StarlightBot',
    version: '1.20.1',
    auth: 'offline',
    hideErrors: true
  })

  let isReconnecting = false
  let afkInterval = null

  bot.on('spawn', () => {
    console.log('SUCCESS: Nasa loob na ng server')
    isReconnecting = false
    
    // ANTI-AFK NA HINDI SPAM SA CHAT
    if (afkInterval) clearInterval(afkInterval)
    afkInterval = setInterval(() => {
      if (!bot.entity) return
      const actions = ['jump', 'sneak']
      const action = actions[Math.floor(Math.random() * actions.length)]
      bot.setControlState(action, true)
      setTimeout(() => bot.setControlState(action, false), 600)
      bot.look(Math.random() * Math.PI * 2, Math.random() * Math.PI - Math.PI/2)
      console.log('Anti-AFK: gumalaw')
    }, 180000)
  })
