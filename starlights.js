import { join, dirname } from 'path'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { setupMaster, fork } from 'cluster'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createInterface } from 'readline'
import yargs from 'yargs'
import chalk from 'chalk'
import { promises as fsPromises } from 'fs'

let __dirname = dirname(fileURLToPath(import.meta.url))
let require = createRequire(__dirname)
let { say } = cfonts
let rl = createInterface(process.stdin, process.stdout)

say('|ᴋᴜʀᴜᴍɪᏴo͢Ꭲ', {
  font: 'chrome',
  align: 'center',
  gradient: ['red', 'magenta']
})

say(`YerTX2`, {
  font: 'console',
  align: 'center',
  gradient: ['red', 'magenta']
})

var isRunning = false