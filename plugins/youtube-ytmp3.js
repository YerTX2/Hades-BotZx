import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `❀ Ingresa el nombre de la canción o video que deseas buscar en YouTube. Por ejemplo: Play Ozuna una flor`, m);

    try {
        // Codificar el texto de búsqueda para incluirlo en la URL de la API
        let query = encodeURIComponent(text.trim());
        
        // Hacer la solicitud a la API que soporte búsqueda y descarga de videos
        let api = await fetch(`https://api.example.com/youtube/search?q=${query}`);
        let json = await api.json();
        
        // Verificar si se encontraron resultados
        if (json.result.length === 0) {
            return conn.reply(m.chat, `❌ No se encontraron resultados para '${text}'. Intenta con otra búsqueda.`, m);
        }
        
        // Tomar el primer resultado de la búsqueda
        let firstResult = json.result[0];
        let title = firstResult.title;
        let dl_url = firstResult.download.url;
        
        // Enviar el mensaje con el archivo de audio al usuario
        await conn.sendMessage(m.chat, { audio: { url: dl_url }, fileName: `${title}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `❌ Ocurrió un error al procesar la solicitud. Por favor, intenta de nuevo más tarde.`, m);
    }
}

HS.command = /^(play)$/i;

export default HS;
