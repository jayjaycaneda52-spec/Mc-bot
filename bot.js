const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'StarlightBot',
    version: '1.21.1'
  })

  // DEBUG: Para makita natin sa Render Logs kung buhay ba talaga
  bot.on('login', () => console.log('BOT NAG-LOGIN NA SA SERVER'))
  bot.on('spawn', () => console.log('BOT NAG-SPAWN NA SA WORLD'))

  bot.once('spawn', () => {
    console.log('Simula login sequence...')
    
    // WAIT 5 SECONDS BAGO LOGIN PARA IWAS KICK
    setTimeout(() => {
      bot.chat('/login Starlight123') // PALITAN MO PASSWORD
      console.log('Sinend na /login command')
    }, 5000)
  })

  // CHAT HANDLER - PINAKA SIMPLE
  bot.on('chat', (username, message) => {
    console.log(`CHAT DETECTED: ${username}: ${message}`) // Para makita sa logs
    
    if (username === bot.username) return
    
    if (message.toLowerCase().includes('saan rule')) {
      console.log('NAGREPLY SA RULES')
      bot.chat('Rules: 1.Bawal grief 2.Bawal cheat 3.Respeto')
    }
    
    if (message.toLowerCase() === 'test') {
      bot.chat('BUHAY AKO')
    }
  })

  // I-PRINT KUNG BAKIT NA KICK
  bot.on('kicked', (reason) => {
    console.log('NA-KICK BOT. REASON:', reason)
  })

  bot.on('error', (err) => {
    console.log('BOT ERROR:', err)
  })

  // RECONNECT AFTER 60 SECONDS
  bot.on('end', () => {
    console.log('Na-disconnect bot. Reconnect after 60s')
    setTimeout(createBot, 60000)
  })
}

createBot()
