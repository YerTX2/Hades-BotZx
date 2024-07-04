let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;ZxYerSixZx;;\nFN:ZxYerSixZx\nORG:ZxYerSixZx\nTITLE:\nitem1.TEL;waid=5218261275256:5218261275256\nitem1.X-ABLabel:ZxYerSixZx\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:ZxYerSixZx\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'ZxYerSixZx', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler