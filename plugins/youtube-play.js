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
  
👉 Usa uno de los siguientes comandos para descargar:
🎵 *Audio:* \`${usedPrefix}ytmp3 ${videoInfo.url}\`  
📽️ *Video:* \`${usedPrefix}ytmp4doc ${videoInfo.url}\`
  `;

  // Enviar mensaje con los detalles del video
  await conn.sendMessage(
    m.chat,
    {
      image: { url: videoInfo.thumbnail },
      caption: body,
    },
    { quoted: m }
  );

  // Imprimir en la consola los comandos y el enlace del video
  console.log(`Comando para audio: ${usedPrefix}ytmp3 ${videoInfo.url}`);
  console.log(`Comando para video: ${usedPrefix}ytmp4doc ${videoInfo.url}`);

  // Reacción de éxito
  m.react('✅');
};

// Definimos los comandos para este handler
handler.command = ['play', 'playvid', 'play2'];
handler.tags = ['downloader'];
handler.group = true;

export default handler;
