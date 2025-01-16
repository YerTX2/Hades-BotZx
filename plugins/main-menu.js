import { promises as fs } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';

let tags = {
  'main': '💖 INFO',
  'search': '🔍 BÚSQUEDA',
  'serbot': '🤖 SUB BOTS',
  'rpg': '🎲 RPG',
  'rg': '📋 REGISTRO',
  'img': '📸 IMÁGENES',
  'group': '👥 GRUPOS',
  'nable': '🔄 ON / OFF',
  'downloader': '⬇️ DESCARGAS',
  'tools': '🛠 HERRAMIENTAS',
  'cmd': '📂 BASE DE DATOS',
  'owner': '👑 DUEÑO',
};

const defaultMenu = {
  before: `
*🌸✨ Bienvenida, querida *%name*! ✨🌸*
Soy *💕Hades💕*, tu fiel asistente.

🌷 Aquí tienes tu estado actual:
╭───🌟──────────────🌟───╮
💌 *Estado*: Activo y listo
🌸 *Versión*: Multi-Bot
⏳ *Tiempo activo*: %muptime
🪷 *Usuarios*: %totalreg
╰───🌟──────────────🌟───╯

Espero que disfrutes tu experiencia 🌹✨
%readmore
╭───────🌸 INFO DE USUARIO 🌸───────╮
🌷 *Nombre*: %name
💎 *Límite*: %limit
🌟 *Nivel*: %level
🎀 *XP*: %totalexp
╰──────────────────────────────╯
`.trimStart(),
  header: '╭───🌸 MENÚ DE %category 🌸───╮\n',
  body: '🌷 %cmd %islimit %isPremium\n',
  footer: '╰───────────────────────╯\n',
  after: `🌸✨ Gracias por usar *Hades*! ✨🌸`,
};

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    // Ruta del archivo de música (en la carpeta del bot)
    const musicPath = join(__dirname, '../media/menu-music.mp3'); // Cambia el nombre del archivo si es necesario

    // Verifica si el archivo existe
    const fileExists = await fs.stat(musicPath).then(() => true).catch(() => false);
    if (!fileExists) {
      throw new Error('El archivo de música no existe en la carpeta especificada.');
    }

    // Envía el archivo de música
    await conn.sendFile(m.chat, musicPath, 'menu-music.mp3', null, m);

    // Procesar y enviar el menú
    let { exp, limit, level } = global.db.data.users[m.sender];
    let { min, xp, max } = xpRange(level, global.multiplier);
    let name = await conn.getName(m.sender);
    let d = new Date(new Date() + 3600000);
    let locale = 'es';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    let totalreg = Object.keys(global.db.data.users).length;
    let help = Object.values(global.plugins)
      .filter((plugin) => !plugin.disabled)
      .map((plugin) => ({
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
      }));

    let text = [
      defaultMenu.before,
      ...Object.keys(tags).map((tag) => {
        return (
          defaultMenu.header.replace(/%category/g, tags[tag]) +
          help
            .filter((menu) => menu.tags && menu.tags.includes(tag))
            .map((menu) =>
              menu.help
                .map((cmd) =>
                  defaultMenu.body
                    .replace(/%cmd/g, menu.prefix ? cmd : '%p' + cmd)
                    .replace(/%islimit/g, menu.limit ? '💎' : '')
                    .replace(/%isPremium/g, menu.premium ? '👑' : '')
                )
                .join('\n')
            )
            .join('\n') +
          defaultMenu.footer
        );
      }),
      defaultMenu.after,
    ].join('\n');

    text = text.replace(/%(\w+)/g, (_, key) => {
      return {
        name,
        limit,
        level,
        exp,
        totalreg,
        week,
        date,
        time,
      }[key];
    });

    // Envía el menú como mensaje
    await conn.reply(m.chat, text, m);
  } catch (e) {
    conn.reply(m.chat, '❌ Ocurrió un error al mostrar el menú.', m);
    console.error(e);
  }
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú'];
export default handler;
