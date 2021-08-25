const { Client } = require('discord.js');
const { readdirSync, statSync, readdir } = require('fs')
const { join } = require("path")


module.exports = class extends Client {
  constructor(options) {
    super(options)

    this.commands = []
    this.loadCommands()
    this.loadEvents()
  }

  registryCommands() {
    //temporaria, vou registrar em um servidor
    this.guilds.cache.get('737819325666295879').commands.set(this.commands)
    
    //this.application.commands.set(this.commands)  descomentar para todo mundo usar o bot
  }

  loadCommands(path = 'src/commands') {
    const categories = readdirSync(path)


    for (const category of categories) {
      const commands = readdirSync(`${path}/${category}`)

      for (const command of commands) {
        const commandClass = require(join(process.cwd(), `${path}/${category}/${command}`))
        const cmd = new (commandClass)(this)

        this.commands.push(cmd)
        console.log(`comando ${cmd.name} carregado`)
      }
    }
  }
  loadEvents(path = 'src/events') {
    const categories = readdirSync(path)


    for (const category of categories) {
      const events = readdirSync(`${path}/${category}`)

      for (const event of events) {
        const eventClass = require(join(process.cwd(), `${path}/${category}/${event}`))
        const evt = new (eventClass)(this)

        this.on(evt.name, evt.run)
        console.log(`Comando ${evt.name} carregado`)

      }
    }
  }
}