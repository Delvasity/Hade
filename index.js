const { Client, Collection } = require('discord.js')
const { readdirSync } = require('fs')

// Collections
const client = new Client()
client.commands = new Collection()
client.aliases = new Collection()

// Command handler
const command_files = readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of command_files) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)

    // Aliase handler
    if (command.aliases)
    command.aliases.forEach(alias => {
        client.aliases.set(alias, command.name)
    })
}

// Event Handler
const event_files = readdirSync('./events').filter(file => file.endsWith('.js'))
for (const file of event_files) {
    const event = require(`./events/${file}`)
    const event_name = file.split('.')[0]
    client.on(event_name, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
}

// Client login
require('dotenv').config()
client.login(process.env.TOKEN)