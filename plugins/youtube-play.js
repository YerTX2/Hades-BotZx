import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `❗ Por favor ingresa un texto para buscar.\nEjemplo: ${usedPrefix + command} Nombre del video`;
  }


  const search = await yts(text);
  const videoInfo = search.all?.[0];

  if (!videoInfo) {
    throw '❗ No se encontraron resultados para tu búsqueda. Intenta con otro título.';
  }

  const body = `
╭━━━❰ *🎥 YouTube Play* ❱━━━╮
┣ 📌 *Título:* ${videoInfo.title}
┣ 👀 *Vistas:* ${videoInfo.views.toLocaleString()}
┣ ⏱️ *Duración:* ${videoInfo.timestamp}
┣ 📅 *Publicado:* ${videoInfo.ago}
┣ 🔗 *URL:* ${videoInfo.url}
╰━━━━━━━━━━━━━━━━━━━━━╯
  
Elige una de las opciones para descargar:
🎵 *Audio* o 📽️ *Video*
  `;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: `| Hades Bot🔥`,
      buttons: [
        { buttonId: `.ytmp6 ${videoInfo.url}`, buttonText: { displayText: '🎵 Audio' } },
        { buttonId: `.ytmp4doc ${videoInfo.url}`, buttonText: { displayText: '📼 Video Doc' } },
      ],
      viewOnce: true,
      headerType: 4,
    },
    { quoted: m }
  );
  m.react('✅'); // Reacción de éxito
};

handler.command = ['play', 'playvid', 'play2'];
handler.tags = ['downloader']
handler.group = true
export default handler; 