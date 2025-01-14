import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, `❀ Ingresa un link de YouTube`, m);

  try {
    let api = await fetch(`https://restapi.apibotwa.biz.id/api/ytmp3?url=${text}`);
    let json = await api.json();
    let title = json.result.metadata.title;
    let dl_url = json.result.download.url;

    // Enviar como documento en lugar de audio
    await conn.sendMessage(
      m.chat, 
      { 
        document: { url: dl_url }, 
        fileName: `${title}.mp3`, 
        mimetype: 'audio/mpeg' 
      }, 
      { quoted: m }
    );

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `❀ Ocurrió un error al procesar el enlace.`, m);
  }
};

HS.command = /^(ytmp3)$/i;

export default HS;
