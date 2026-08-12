const mineflayer = require('mineflayer')

const HOST = 'theo.hidencloud.com'
const PORT = 24587

const USERNAME = 'LautiMC'
const PASSWORD = '89z_1Cn[~j%7vxWM'

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

        // Esperar unos segundos antes de iniciar sesión
        setTimeout(() => {
            console.log('[BOT] Iniciando sesión...')
            bot.chat(`/login ${PASSWORD}`)
        }, 3000)

        // Entrar a Survival después del login
        setTimeout(() => {
            console.log('[BOT] Entrando a Survival...')
            bot.chat('/server survival')
        }, 6000)
    })

    // Mostrar mensajes del chat en la consola
    bot.on('messagestr', (message) => {
        console.log('[CHAT]', message)
    })

    // Si el servidor expulsa al bot
    bot.on('kicked', (reason) => {
        console.log('[BOT] Expulsado:', reason)
    })

    // Errores
    bot.on('error', (err) => {
        console.log('[BOT] Error:', err.message)
    })

    // Reconexión automática
    bot.on('end', () => {
        console.log('[BOT] Desconectado. Reconectando en 10 segundos...')

        setTimeout(() => {
            createBot()
        }, 10000)
    })

    // Movimiento anti-AFK cada 45 segundos
    setInterval(() => {
        if (!bot.entity) return

        const movimientos = [
            'forward',
            'back',
            'left',
            'right'
        ]

        const movimiento =
            movimientos[Math.floor(Math.random() * movimientos.length)]

        bot.setControlState(movimiento, true)

        setTimeout(() => {
            bot.setControlState(movimiento, false)
        }, 1200)

        // Saltar ocasionalmente
        if (Math.random() < 0.4) {
            bot.setControlState('jump', true)

            setTimeout(() => {
                bot.setControlState('jump', false)
            }, 500)
        }

        // Girar hacia una dirección aleatoria
        bot.look(
            Math.random() * Math.PI * 2,
            (Math.random() - 0.5) * 0.5,
            true
        )

    }, 45000)
}

createBot()
