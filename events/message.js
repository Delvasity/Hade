module.exports = async (client, message) => {

    // Client's cannot execute Hade commands
    require('dotenv').config()
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return

    const queue = new Map()

    // Listens for and triggers commands
    const argument = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g)
    const command_name = argument.shift().toLowerCase()
    const command = client.commands.get(command_name) || client.commands.get(client.aliases.get(command_name))

    if (command_name) {
        command.run(client, message, argument, command_name, queue)
    }
}