const mineflayer = require('mineflayer')
const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Mori Bot is online!'))
app.listen(3000, () => console.log('[Server] Express running'))

function createBot() {
  const bot = mineflayer.createBot({
    host: 'starlightfam.mcsh.io',
    port: 25565,
    username: 'mori_bot',
    version: false,
    auth: 'offline'
  })

  let hasLoggedIn = false

  bot.on('messagestr', (message) => {
    console.log('', message)
    const msg = message.toLowerCase()

    if (hasLoggedIn) return

    // Pag may "login" o "registered" sa message, /login agad
    if (msg.includes('login') || msg.includes('register') || msg.includes('logged')) {
      setTimeout(() => {
        bot.chat('/login 123456') // PALITAN MO TO NG TAMANG PASSWORD
        console.log('[BOT] Sent /login 123456')
      }, 500) // 0.5 SEC LANG DELAY PARA DI MA-KICK
    }

    if (msg.includes('successfully logged') || msg.includes('you are logged in')) {
      hasLoggedIn = true
      console.log('[BOT] LOGIN SUCCESS!')
    }
  })

  // SPAM LOGIN PAGKA-CONNECT PARA SURE
  bot.on('login', () => {
    console.log('[BOT] Connected, sending /login in 1 sec')
    setTimeout(() => {
      if (!hasLoggedIn) {
        bot.chat('/login 123456') // PALITAN MO PASSWORD
        console.log('[BOT] Forced /login sent')
      }
    }, 1000)
  })

  bot.on('spawn', () => {
    console.log('[BOT] SPAWNED NA SI MORI_BOT! SUCCESS!')
    hasLoggedIn = true

    setInterval(() => {
      if (bot.entity) bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 20000)

    setInterval(() => {
      if (bot.entity) bot.look(Math.random() * Math.PI * 2, 0)
    }, 15000)

    setTimeout(() => {
      console.log('[BOT] 10min na, restart')
      bot.quit('10min restart')
    }, 10 * 60 * 1000)
  })

  bot.on('kicked', (reason) => {
    console.log('[KICKED]', reason)
    hasLoggedIn = false
    setTimeout(() => createBot(), 40000)
  })

  bot.on('error', (err) => {
    console.log('[ERROR]', err.message)
    hasLoggedIn = false
    setTimeout(() => createBot(), 40000)
  })

  bot.on('end', () => {
    console.log('[END] Disconnected')
    hasLoggedIn = false
    setTimeout(() => createBot(), 40000)
  })
}

createBot()
