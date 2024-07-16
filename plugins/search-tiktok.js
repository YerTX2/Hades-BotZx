import axios from 'axios';
import { proto, generateWAMessageFromContent, generateWAMessageContent } from "@whiskeysockets/baileys";

let handler = async (msg, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(msg.chat, "🍭 Ingresa el texto de lo que quieres buscar en TikTok", msg);
  }

  async function generateVideoMessage(url) {
    const { videoMessage } = await generateWAMessageContent(
      { 'video': { 'url': url } },
      { 'upload': conn.waUploadToServer }
    );
    return videoMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    let results = [];
    let { data } = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${text}`);
    let videos = data.data;
    shuffleArray(videos);
    let topVideos = videos.splice(0, 7);

    for (let video of topVideos) {
      results.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({ 'text': null }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({ 'text': author }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': video.title,
          'hasMediaAttachment': true,
          'videoMessage': await generateVideoMessage(video.nowm)
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({ 'buttons': [] })
      });
    }

    const responseMessage = generateWAMessageFromContent(msg.chat, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': { 'deviceListMetadata': {}, 'deviceListMetadataVersion': 2 },
          'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
            'body': proto.Message.InteractiveMessage.Body.create({ 'text': `🚩 Resultado de: ${text}` }),
            'footer': proto.Message.InteractiveMessage.Footer.create({ 'text': "TikTok - Search" }),
            'header': proto.Message.InteractiveMessage.Header.create({ 'hasMediaAttachment': false }),
            'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({ 'cards': results })
          })
        }
      }
    }, { 'quoted': msg });

    await conn.relayMessage(msg.chat, responseMessage.message, { 'messageId': responseMessage.key.id });
  } catch {
    await msg.react('✖️');
  }
};

handler.help = ["tiktoksearch *<txt>*"];
handler.tags = ["search"];
handler.command = ["tiktoksearch", "tts", "tiktoks"];

export default handler;