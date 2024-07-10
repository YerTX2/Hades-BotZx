let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;ZxYerSixZx;;\nFN:ZxYerSixZx\nORG:ZxYerSixZx\nTITLE:\nitem1.TEL;waid=51907376960:51907376 960\nitem1.X-ABLabel:ZxYerSixZx\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:ZxYerSixZx\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'ZxYerSixZx', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler