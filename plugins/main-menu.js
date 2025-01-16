import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'Información',
  'search': 'Búsquedas',
  'serbot': 'Sub-Bots',
  'rpg': 'RPG',
  'rg': 'Registro',
  'img': 'Imágenes',
  'group': 'Grupos',
  'nable': 'Activar/Desactivar',
  'downloader': 'Descargas',
  'tools': 'Herramientas',
  'cmd': 'Base de datos',
  'owner': 'Propietario',
}

const defaultMenu = {
  before: `
╭───〔 *💖 Hola, %name 💖* 〕───╮
🌟 *Soy Hades* (versión femenina) y estoy aquí para ayudarte, %greeting.
╰────────────────────╯

*🔮 Estado del sistema:*
  ✨ Público: Habilitado
  🕒 Tiempo activo: %muptime
  📌 Usuarios registrados: %totalreg

💡 *Datos de usuario:*
  👤 Nombre: %name
  🌟 Nivel: %level
  🎯 XP Total: %totalexp

╰────────────────────╯
%readmore
*📋 Menú principal:*
`.trimStart(),
  header: '╭─〔 %category 〕───\n│',
  body: '🎀 %cmd %islimit %isPremium\n',
  footer: '╰─────────────\n',
  after: `¡Espero que encuentres todo lo que buscas! 🌸`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let greeting = obtenerSaludo(d.getHours())
    let totalreg = Object.keys(global.db.data.users).length

    // Generar menú
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
      }
    })
    
    let text = generarMenu(defaultMenu, tags, help, {
      _p, name, greeting, totalreg, level, limit, exp, min, xp, max
    })
    
    // Enviar respuesta
    let img = 'https://telegra.ph/file/d535430793cd5cb177c58.jpg' // Cambiar a imagen femenina
    await conn.sendFile(m.chat, img, 'menu.jpg', text, m)
  } catch (e) {
    conn.reply(m.chat, '❎ Lo siento, ocurrió un error al generar el menú.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']
handler.register = true
export default handler

// Funciones auxiliares
function generarMenu(defaultMenu, tags, help, replace) {
  return [
    defaultMenu.before,
    ...Object.keys(tags).map(tag => {
      return defaultMenu.header.replace(/%category/g, tags[tag]) + '\n' + help.filter(menu => menu.tags.includes(tag)).map(menu => {
        return menu.help.map(cmd => {
          return defaultMenu.body
            .replace(/%cmd/g, menu.prefix ? cmd : `${replace._p}${cmd}`)
            .replace(/%islimit/g, menu.limit ? '🔒' : '')
            .replace(/%isPremium/g, menu.premium ? '💎' : '')
        }).join('\n')
      }).join('\n') + defaultMenu.footer
    }),
    defaultMenu.after
  ].join('\n').replace(/%(\w+)/g, (_, key) => replace[key] || '')
}

function obtenerSaludo(hora) {
  if (hora >= 6 && hora < 12) return 'buenos días 🌞'
  if (hora >= 12 && hora < 18) return 'buenas tardes 🌅'
  return 'buenas noches 🌙'
}
