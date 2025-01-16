import { promises as fs } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';

let tags = {
  'main': 'INFO',
  'search': 'SEARCH',
  'serbot': 'SUB BOTS',
  'rpg': 'RPG',
  'rg': 'REGISTRO',
  'img': 'IMAGE',
  'group': 'GROUPS',
  'nable': 'ON / OFF',
  'downloader': 'DOWNLOAD',
  'tools': 'TOOLS',
  'cmd': 'DATABASE',
  'owner': 'OWNER',
};

const defaultMenu = {
  before: `
*︵‿︵‿︵‿︵ ︵‿︵‿︵‿︵︵‿︵‿*
“ Hola mortal *%name* soy  *⚝Hades⚝*, %greeting ”
%readmore
╭═══ INFO DE USER ═══╮
👥 *Mortal*: %name
🌌 *Cosmos*: %limit
🌀 *Nivel*: %level
🌠 *XP*: %totalexp
╰══════════════════╯
`.trimStart(),
  header: '╭── MENU %category ──╮\n',
  body: '⚔️ %cmd %islimit %isPremium\n',
  footer: '╰─────────────────────╯\n',
  after: 'Gracias por usar ⚝Hades⚝!',
};

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    // Ruta de la música en la carpeta local
    const musicPath = join(__dirname, '../media/menu-music.mp3');
    
    // Verificar si el archivo existe
    const fileExists = await fs.stat(musicPath).then(() => true).catch(() => false);
    if (!fileExists) throw new Error('Archivo de música no encontrado.');

    // Enviar música antes del menú
    await conn.sendFile(m.chat, musicPath, 'menu-music.mp3', null, m);

    // Variables del usuario
    let { exp, limit, level } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let d = new Date(new Date() + 3600000);
    let locale = 'es';
    let greeting = getGreeting(d.getHours());
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    let totalreg = Object.keys(global.db.data.users).length;

    let text = defaultMenu.before
      .replace(/%name/g, name)
      .replace(/%limit/g, limit)
      .replace(/%level/g, level)
      .replace(/%totalexp/g, exp)
      .replace(/%greeting/g, greeting);

    text += Object.keys(tags)
      .map((tag) => {
        let categoryHeader = defaultMenu.header.replace(/%category/g, tags[tag]);
        let categoryBody = Object.values(global.plugins)
          .filter((plugin) => plugin.tags && plugin.tags.includes(tag))
          .map((plugin) =>
            plugin.help
              .map((cmd) =>
                defaultMenu.body
                  .replace(/%cmd/g, cmd)
                  .replace(/%islimit/g, plugin.limit ? '⭐' : '')
                  .replace(/%isPremium/g, plugin.premium ? '👑' : '')
              )
              .join('\n')
          )
          .join('\n');
        return categoryHeader + categoryBody + defaultMenu.footer;
      })
      .join('\n');

    text += defaultMenu.after;

    // Enviar menú
    await conn.reply(m.chat, text.trim(), m);
  } catch (e) {
    conn.reply(m.chat, '❎ Error al mostrar el menú.', m);
    console.error(e);
  }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
handler.register = true;
export default handler;

// Función para el saludo según la hora
function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return 'una hermosa mañana 🌅';
  if (hour >= 12 && hour < 18) return 'una bella tarde 🌞';
  if (hour >= 18 && hour < 22) return 'una tranquila noche 🌙';
  return 'dulces sueños 🌌';
}
