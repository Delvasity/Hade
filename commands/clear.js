module.exports = {

    name: 'clear',
    aliases: ['purge'],
    run: async (client, message, argument) => {

        if (message.channel.type == 'dm' || !message.member.hasPermission('MANAGE_MESSAGES')) return
        message.delete()

        // Users must numerically specify how many messages to clear
        const clear_amount = argument[0]
        if (!clear_amount || isNaN(argument[0])) return message.reply('please numerically specify how many messages you wish to clear.').then(reply => {
            reply.delete({ timeout: 15000 })
        })

        // Users can only clear between 2 and 100 messages at one time
        if (clear_amount < 2) return message.reply('you can only clear 2 to 100 messages at one time, choose a greater number.').then(reply => {
            reply.delete({ timeout: 15000 })
        })

        if (clear_amount > 100) return message.reply('you can only clear 2 to 100 messages at one time, choose a smaller number.').then(reply => {
            reply.delete({ timeout: 15000 })
        })

        message.channel.bulkDelete(clear_amount).catch(error => {
            message.reply('Discord API disallows bots or clients to clear messages over 2 weeks old.').then(reply => {
                reply.delete({ timeout: 15000 })
            })
        })
    }
}