const mineflayer = require('mineflayer')

function startBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'StarlightBot',
    version: '1.21.1'
  })

  bot.on('login', () => {
    console.log('SUCCESS: Nasa loob na ng server')
  })

  bot.on('spawn', () => {
    bot.chat('StarlightBot online! Type "saan rule" or "paano claim"')
  })

  // CHAT COMMANDS - GAGANA KAHIT WALANG "BOT" SA MESSAGE
  bot.on('chat', (username, message) => {
    if (username === bot.username) return // Wag sagutin sarili
    
    const msg = message.toLowerCase()

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
    else if (msg.includes('saan rule') || msg.includes('rules') || msg === 'rule') {
      bot.chat(`${username}, Rules ng StarlightFam:`)
      setTimeout(() => bot.chat(`1. Bawal grief/magnakaw`), 800)
      setTimeout(() => bot.chat(`2. Bawal xray/cheat/hack`), 1600)
      setTimeout(() => bot.chat(`3. Respeto sa lahat ng players`), 2400)
      setTimeout(() => bot.chat(`4. Bawal mag mura sa chat`), 3200)
      setTimeout(() => bot.chat(`5. Bawal mag spam/flood`), 4000)
    }
    else if (msg.includes('shop')) {
      bot.chat(`${username}, /warp shop or /spawn tapos hanap ka villager area`)
    }
    else if (msg === 'spawn' || msg.includes('punta spawn')) {
      bot.chat(`${username}, type mo lang /spawn`)
    }
    else if (msg === 'hi' || msg === 'hello' || msg === 'oy') {
      bot.chat(`Uy ${username}! Need mo help? Try mo "saan rule"`)
    }
  })

  // AUTO ACCEPT TPA
  bot.on('message', (jsonMsg) => {
    const msg = jsonMsg.toString()
    if (msg.includes('has requested to teleport')) {
      bot.chat('/tpaccept')
      console.log('Tinanggap TPA request')
    }
  })

  // AUTO RECONNECT PAG NA-DC
  bot.on('end', () => {
    console.log('Na-disconnect. Reconnect in 10s...')
    setTimeout(startBot, 10000)
  })

  bot.on('error', (err) => {
    console.log('Error:', err.message)
  })

  bot.on('kicked', (reason) => {
    console.log('KICKED:', reason)
  })
}

startBot()
