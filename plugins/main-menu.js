import { promises as fs } from 'fs';
import { join } from 'path';
import { xpRange } from '../lib/levelling.js';

const tags = {
  main: '💖 INFO',
  search: '🔍 BÚSQUEDA',
  serbot: '🤖 SUB BOTS',
  rpg: '🎮 RPG',
  rg: '📝 REGISTRO',
  img: '🖼️ IMÁGENES',
  group: '👥 GRUPOS',
  nable: '⚙️ CONFIG',
  downloader: '⬇️ DESCARGAS',
  tools: '🔧 HERRAMIENTAS',
  cmd: '📂 BASE DE DATOS',
  owner: '👑 ADMINISTRADOR',
};

const defaultMenu = {
  before: `
*•──────────────•*
👋 Hola, *%name*!  
Soy tu asistente, *Atenea*. 💕  
%greeting  
%readmore

╭═══ *TU PERFIL* ═══╮
👤 *Usuario*: %name  
✨ *Nivel*: %level  
🎯 *XP*: %totalexp  
🎀 *Límite*: %limit  
╰══════════════════╯
`.trimStart(),
  header: '\n╭── ❀ %category ❀ ──╮\n',
  body: '  ◦ %cmd %islimit %isPremium\n',
  footer: '╰──────────────────╯\n',
  after: `\n🌸 Gracias por usar *Atenea*. 🌸\n¡Espero haberte ayudado!`,
};

const handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    // Ruta del archivo de música
    const musicPath = join(__dirname, 'musica/menu-music.mp3');
    const fileExists = await fs.stat(musicPath).then(() => true).catch(() => false);

    if (!fileExists) {
      console.error('Archivo de música no encontrado:', musicPath);
      throw new Error('Archivo de música no encontrado.');
    }

    // Enviar música antes del menú
    await conn.sendFile(m.chat, musicPath, 'menu-music.mp3', null, m);

    // Datos del usuario
    const user = global.db.data.users[m.sender] || {};
    const { exp = 0, limit = 0, level = 0 } = user;
    const { min, xp, max } = xpRange(level, global.multiplier);
    const name = await conn.getName(m.sender);

    // Variables para el saludo
    const d = new Date(new Date() + 3600000);
    const locale = 'es';
    const greeting = getGreeting(d.getHours());
    const week = d.toLocaleDateString(locale, { weekday: 'long' });
    const date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const totalreg = Object.keys(global.db.data.users).length;

    // Generar texto del menú
    let text = defaultMenu.before
      .replace(/%name/g, name)
      .replace(/%limit/g, limit)
      .replace(/%level/g, level)
      .replace(/%totalexp/g, exp)
      .replace(/%greeting/g, greeting);

    text += Object.keys(tags)
      .map((tag) => {
        const categoryHeader = defaultMenu.header.replace(/%category/g, tags[tag]);
        const categoryBody = Object.values(global.plugins)
          .filter((plugin) => plugin.tags && plugin.tags.includes(tag))
          .map((plugin) =>
            plugin.help
              .map((cmd) =>
                defaultMenu.body
                  .replace(/%cmd/g, cmd)
                  .replace(/%islimit/g, plugin.limit ? '🌟' : '')
                  .replace(/%isPremium/g, plugin.premium ? '👑' : '')
              )
              .join('\n')
          )
          .join('\n');

        return categoryHeader + categoryBody + defaultMenu.footer;
      })
      .join('\n');

    text += defaultMenu.after;

    // Enviar el menú
    await conn.reply(m.chat, text.trim(), m);
  } catch (e) {
    conn.reply(m.chat, '❎ Ups, hubo un problema al mostrar el menú.', m);
    console.error('Error al mostrar el menú:', e);
  }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
handler.register = true;
export default handler;

// Función para obtener el saludo según la hora
function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return '¡Que tengas una linda mañana! 🌅';
  if (hour >= 12 && hour < 18) return '¡Disfruta tu tarde! 🌞';
  if (hour >= 18 && hour < 22) return '¡Relájate esta noche! 🌙';
  return '¡Descansa y sueña bonito! 🌌';
}
