const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

// Keep-alive para sa Render
app.get('/', (req, res) => res.send('Mori Bot is online!'))
app.listen(3000, () => console.log('[Server] Express running on port 3000'))

function createBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'mori_bot',
    version: '1.20.1', // PALITAN MO TO NG EXACT VERSION NG SERVER MO
    auth: 'offline',
    hideErrors: false
  })

  let hasLoggedIn = false
  let loginAttempts = 0

  // DEBUG: LOG LAHAT NG CHAT MESSAGES
  bot.on('message', (jsonMsg) => {
    console.log('', jsonMsg.toString())
  })

  bot.on('messagestr', (message) => {
    const msg = message.toLowerCase()

    // Iwas spam login
    if (hasLoggedIn) return

    // NLogin detection - mas malawak
    if (msg.includes('register') || msg.includes('/register')) {
      loginAttempts++
      if (loginAttempts > 3) return

      setTimeout(() => {
        bot.chat('/register 123456 123456')
        console.log('[BOT] Sent /register')
      }, 2000)
    }

    if (msg.includes('login') || msg.includes('log in') || msg.includes('/login')) {
      loginAttempts++
      if (loginAttempts > 3) return

      setTimeout(() => {
        bot.chat('/login 123456')
        console.log('[BOT] Sent /login')
      }, 2000)
    }

    // Success detect
    if (msg.includes('successfully logged') || msg.includes('you are logged') || msg.includes('logged in')) {
      hasLoggedIn = true
      console.log('[BOT] LOGIN SUCCESS!')
    }
  })

  // BLIND LOGIN: Pag connect, send agad after 3s
  bot.on('login', () => {
    console.log('[BOT] Connected to server')
    setTimeout(() => {
      if (!hasLoggedIn) {
        bot.chat('/login 123456')
        console.log('[BOT] Blind login attempt')
      }
    }, 3000)
  })

  // PAG NASA WORLD NA TALAGA
  bot.on('spawn', () => {
    console.log('[BOT] SPAWNED! NASA WORLD NA AKO')
    hasLoggedIn = true
    loginAttempts = 0

    // Anti-AFK Jump every 20s
    const jumpInterval = setInterval(() => {
      if (bot.entity) {
        bot.setControlState('jump', true)
        setTimeout(() => bot.setControlState('jump', false), 500)
        console.log('[BOT] Anti-AFK: Jump')
      }
    }, 20000)

    // Anti-AFK Look every 15s
    const lookInterval = setInterval(() => {
      if (bot.entity) {
        const yaw = Math.random() * Math.PI * 2
        const pitch = (Math.random() - 0.5) * 0.5
        bot.look(yaw, pitch)
        console.log('[BOT] Anti-AFK: Look')
      }
    }, 15000)

    // AUTO LEAVE EVERY 10 MINS
    setTimeout(() => {
      console.log('[BOT] 10 minutes na, mag-leave na')
      clearInterval(jumpInterval)
      clearInterval(lookInterval)
      bot.quit('10 minute scheduled restart')
    }, 10 * 60 * 1000)
  })

  bot.on('kicked', (reason) => {
    console.log('[KICKED]', reason)
    hasLoggedIn = false
    loginAttempts = 0
    console.log('[BOT] Reconnecting in 40s...')
    setTimeout(() => createBot(), 40000)
  })

  bot.on('error', (err) => {
    console.log('[ERROR]', err.message)
    hasLoggedIn = false
    loginAttempts = 0
    console.log('[BOT] Reconnecting in 40s...')
    setTimeout(() => createBot(), 40000)
  })

  bot.on('end', (reason) => {
    console.log('[END] Disconnected:', reason)
    hasLoggedIn = false
    loginAttempts = 0
    console.log('[BOT] Reconnecting in 40s...')
    setTimeout(() => createBot(), 40000)
  })
}

// Start bot
createBot()
console.log('[BOT] Starting mori_bot...')
