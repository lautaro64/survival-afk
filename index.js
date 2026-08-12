const mineflayer = require('mineflayer')

const HOST = 'theo.hidencloud.com'
const PORT = 24587

const USERNAME = 'LautiMC'
const PASSWORD = 'TU_CONTRASEÑA'

function createBot() {
    console.log('[BOT] Conectando...')

    const bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: USERNAME,
        version: '1.20.1'
    })

    bot.once('spawn', () => {
        console.log('[BOT] Conectado al proxy.')

        setTimeout(() => {
            console.log('[BOT] Iniciando sesión...')
            bot.chat(`/login ${PASSWORD}`)
        }, 3000)

        setTimeout(() => {
            console.log('[BOT] Entrando a Survival...')
            bot.chat('/server survival')
        }, 6000)
    })

    bot.on('messagestr', (message) => {
        console.log('[CHAT]', message)
    })

    bot.on('kicked', (reason) => {
        console.log('[BOT] Expulsado:', reason)
    })

    bot.on('error', (err) => {
        console.log('[BOT] Error:', err.message)
    })

    bot.on('end', () => {
        console.log('[BOT] Desconectado. Reconectando en 10 segundos...')

        setTimeout(() => {
            createBot()
        }, 10000)
    })
}

createBot()
