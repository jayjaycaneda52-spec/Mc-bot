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
  // CHAT COMMANDS - SAGOT SA PLAYERS
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    const msg = message.toLowerCase()
    const tinagBa = msg.includes('starlightbot') || msg.includes('bot')
    if (!tinagBa) return

    if (msg.includes('paano') && msg.includes('claim')) {
      bot.chat(`${username}, golden shovel lang tapos right-click 2 corners ng lupa`)
    }
    else if (msg.includes('port') || msg.includes('ip')) {
      bot.chat(`${username}, 25565 port. Pero rekta starlightfam.mcsh.io na lang`)
    }
    else if (msg.includes('lag')) {
      bot.chat(`${username}, baka sa farm mo yan. /spawn ka muna para mabawasan`)
    }
    else if (msg.includes('tpa')) {
      bot.chat(`${username}, /tpa StarlightBot lang tapos auto accept ko`)
    }
    else if (msg.includes('saan rule') || msg.includes('rules') || msg.includes('rule')) {
      bot.chat(`${username}, Rules ng StarlightFam:`)
      setTimeout(() => bot.chat(`1. Bawal grief/magnakaw`), 1000)
      setTimeout(() => bot.chat(`2. Bawal xray/cheat/hack`), 2000)
      setTimeout(() => bot.chat(`3. Respeto sa lahat ng players`), 3000)
      setTimeout(() => bot.chat(`4. Bawal mag mura sa chat`), 4000)
      setTimeout(() => bot.chat(`5. Bawal mag spam/flood`), 5000)
    }
    else if (msg.includes('shop')) {
      bot.chat(`${username}, /warp shop or /spawn tapos hanap ka villager area`)
    }
    else if (msg.includes('spawn')) {
      bot.chat(`${username}, type mo lang /spawn`)
    }
    else {
      bot.chat(`${username}, ano yun? Di ko na-gets tanong mo 😅`)
    }
  })

  // AUTO ACCEPT TPA
  bot.on('messagestr', (message) => {
    if (message.includes('has requested to teleport to you')) {
      bot.chat('/tpaccept')
      setTimeout(() => bot.chat('TP mo accepted!'), 1500)
    }
    if (message.toLowerCase().includes('afk')) {
      console.log('May nag-check ng AFK sa chat')
    }
  })
