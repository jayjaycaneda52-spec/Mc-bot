const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'your-server-ip',  // palitan mo
  port: 25565,
  username: 'KaracraftBot', // palitan mo
  version: false  // auto-detect version
})

bot.on('login', () => {
  console.log('Bot nag-login na')
  
  // Auto register/login para sa LoginSecurity
  setTimeout(() => {
    bot.chat('/register 123456 123456')
    bot.chat('/login 123456')
  }, 3000)
})

bot.on('chat', (username, message) => {
  if (username === bot.username) return
  
  // Auto reply sa /msg
  if (message.startsWith('/msg')) {
    bot.chat('Busy pa si bot boss')
  }
})

// Anti-AFK
bot.on('spawn', () => {
  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => bot.setControlState('jump', false), 500)
  }, 60000) // jump every 60 sec
})

bot.on('kicked', console.log)
bot.on('error', console.log)
