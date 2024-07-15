const handler = async (m, {conn}) => {
  m.reply(global.main.menu);
};
handler.command = /^(.main.menu)$/i;
export default handler;
handler.group = true

global.main.menu= `




import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

const defaultMenu = {
  before: `
*︵‿︵‿︵‿︵ ︵‿︵‿︵‿︵︵‿︵‿*

“ Hola mortal *%name* soy  *⚝Hades⚝*, %greeting ”

     ⋆[ *>INFO DE HADES<* ]
 ↡▰▱▰▱▰▱▰▱▰▱▰▱▰▱
 》* 🪐Estado* :  Hades Público 
 》*🗡️ Baileys* : Hades multi
 》*⌛ Despierto * : %muptime
 》*👥Mortales* : %totalreg
 ↟▰▱▰▱▰▱▰▱▰▱▰▱▰▱

%readmore
╭════ [ *>INFO DE USER <* ]════ 
│⬐ ▰▱▰▱▰▱▰▱▰▱▰▱▰▱
 》 *👥Mortal* : %name
 》 *🌌 Cosmos* : %limit
 》 *🌀Nivel* : %level
 》 *🌠 XP* : %totalexp
 ⬑ ▰▱▰▱▰▱▰▱▰▱▰▱▰▱
╰───────────═┅═──────────
    *★ M E N Ú-HADES ★ *

╭───═[ MENU🔞]═────⋆
│»»————--　★　————-««···
⚔️│.xnxxsearch 
⚔️│.xnxxdl (enlace) 
⚔️│ .pornhubsearch 
│╰»»————--　★　————-««···
╰───────────═┅═──────────
╭───═[🎮VS GAMES🎮]═────⋆
│»»————--　★　————-««···
⚔️│.➺ _.Vs4_ 
⚔️│.➺ _.Vs8_ 
⚔️│.➺ _.Vs6_
⚔️│.➺ _.Vs12_
│╰»»————--　★　————-««···
╰───────────═┅═──────────
%readmore
*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*
\t\t\t*★*
`.trimStart(),
  header: '╭───═[ `MENÚ %category` ]═────⋆\n│»»————--　⚔️　————-««···',
    body: '⚔️│%cmd %islimit %isPremium\n',
  footer: '│╰»»————--　⚔️　————-««···\n╰───────────═┅═──────────\n',
  

          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      version: _package.version,
      npmdesc: _package.description,
      npmmain: _package.main,
      author: _package.author.name,
      license: _package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      greeting, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let pp = 'https://telegra.ph/Bot-Hades---deus-07-04.mp4'
    let pp2 = 'https://telegra.ph/file/d8c5e18ab0cfc10511f63.mp4'
    let pp3 = 'https://telegra.ph/file/96e471a87971e2fb4955f.mp4'
    let pp4 = 'https://telegra.ph/file/09b920486c3c291f5a9e6.mp4'
    let pp5 = 'https://telegra.ph/file/4948429d0ab0212e9000f.mp4'
    let pp6 = 'https://telegra.ph/file/cab0bf344ba83d79c1a47.mp4'
    let pp7 = 'https://telegra.ph/file/6d89bd150ad55db50e332.mp4'
    let pp8 = 'https://telegra.ph/file/e2f791011e8d183bd6b50.mp4'
    let pp9 = 'https://telegra.ph/file/546a6a2101423efcce4bd.mp4'
    let pp10 = 'https://telegra.ph/file/930b9fddde1034360fd86.mp4'
    let pp11 = 'https://telegra.ph/file/81da492e08bfdb4fda695.mp4'
    let pp12 = 'https://telegra.ph/file/ec8393df422d40f923e00.mp4'
    let pp13 = 'https://telegra.ph/file/ba7c4a3eb7bf3d892b0c8.mp4'
    let pp14 = 'https://tinyurl.com/ymlqb6ml'
    let pp15 = 'https://tinyurl.com/ykv7g4zy'
    let img = await (await fetch(`https://telegra.ph/file/d535430793cd5cb177c58.mp4`)).buffer()
    await m.react('⭐')
   // await conn.sendMessage(m.chat, { video: { url: [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11, pp12, pp13, pp14, pp15].getRandom() }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: estilo })
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, rcanal)
   //await conn.sendAi(m.chat, botname, textbot, text.trim(), img, img, canal, estilo)

  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 
export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'una linda noche 🌙'; break;
  case 1: hour = 'una linda noche 💤'; break;
  case 2: hour = 'una linda noche 🦉'; break;
  case 3: hour = 'una linda mañana ✨'; break;
  case 4: hour = 'una linda mañana 💫'; break;
  case 5: hour = 'una linda mañana 🌅'; break;
  case 6: hour = 'una linda mañana 🌄'; break;
  case 7: hour = 'una linda mañana 🌅'; break;
  case 8: hour = 'una linda mañana 💫'; break;
  case 9: hour = 'una linda mañana ✨'; break;
  case 10: hour = 'un lindo dia 🌞'; break;
  case 11: hour = 'un lindo dia 🌨'; break;
  case 12: hour = 'un lindo dia ❄'; break;
  case 13: hour = 'un lindo dia 🌤'; break;
  case 14: hour = 'una linda tarde 🌇'; break;
  case 15: hour = 'una linda tarde 🥀'; break;
  case 16: hour = 'una linda tarde 🌹'; break;
  case 17: hour = 'una linda tarde 🌆'; break;
  case 18: hour = 'una linda noche 🌙'; break;
  case 19: hour = 'una linda noche 🌃'; break;
  case 20: hour = 'una linda noche 🌌'; break;
  case 21: hour = 'una linda noche 🌃'; break;
  case 22: hour = 'una linda noche 🌙'; break;
  case 23: hour = 'una linda noche 🌃'; break;
}
  var greeting = "espero que tengas " + hour;