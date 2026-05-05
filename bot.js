const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// Keep-alive para sa Render + UptimeRobot
app.get('/', (req, res) => res.send('Bot is alive!'))
app.listen(3000, () => console.log('[Server] Express running on port 3000'))

function createBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'mori_bot',
    version: false,
    auth: 'offline'
  })

  let isLoggedIn = false

  // NLOGIN DETECTION
  bot.on('messagestr', (message) => {
    console.log('[ChatLog]', message)
    const msg = message.toLowerCase()

    if (isLoggedIn) return

    // Register detect
    if (msg.includes('please register') || msg.includes('/register')) {
      setTimeout(() => {
        bot.chat('/register 123456 123456')
        console.log('[BotLog] Sent /register to NLogin')
      }, 1500)
    }

    // Login detect
    if (msg.includes('please login') || msg.includes('please log in') || msg.includes('/login')) {
      setTimeout(() => {
        bot.chat('/login 123456')
        console.log('[BotLog] Sent /login to NLogin')
      }, 1500)
    }

    // Login success detect
    if (msg.includes('successfully logged in') || msg.includes('you are now logged in')) {
      isLoggedIn = true
      console.log('[BotLog] NLogin: Login success!')
    }
  })

  // PAG NAKAPASOK NA SA WORLD
  bot.on('spawn', () => {
    console.log('[BotLog] Bot connected na sa world')

    // ANTI-AFK JUMP every 20s
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      console.log('[BotLog] Anti-AFK: jump')
    }, 20000)

    // ANTI-AFK LOOK every 15s
    setInterval(() => {
      bot.look(Math.random() * Math.PI * 2, 0)
      console.log('[BotLog] Anti-AFK: look around')
    }, 15000)

    // AUTO LEAVE EVERY 10 MINS
    setTimeout(() => {
      console.log('[BotLog] 10 mins na, mag-leave na ako')
      bot.quit('Scheduled 10min restart')
    }, 10 * 60 * 1000)
  })

  bot.on('kicked', (reason) => {
    console.log('[BotLog] Kicked:', reason)
    isLoggedIn = false
    console.log('[BotLog] Reconnecting in 40s')
    setTimeout(() => createBot(), 40000)
  })

  bot.on('error', (err) => {
    console.log('[BotLog] Error:', err.message)
    isLoggedIn = false
    console.log('[BotLog] Reconnecting in 40s')
    setTimeout(() => createBot(), 40000)
  })

  bot.on('end', () => {
    console.log('[BotLog] Disconnected')
    isLoggedIn = false
    console.log('[BotLog] Reconnecting in 40s')
    setTimeout(() => createBot(), 40000)
  })
}

createBot()
