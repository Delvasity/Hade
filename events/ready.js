module.exports = (client) => {

    // Logs when Hade loads online
    const time = require('moment')
    console.log(time().format('MMM Do YYYY HH:MM') + (' | Hade is now online.'))

    // Changes Hade's status every 4 minuites
    function status() {
        status_list = ['some random anime', 'code by Delvasity']
        const status_change = Math.floor(Math.random() * status_list.length)
        client.user.setActivity(status_list[status_change], { type: 'WATCHING' })
    } setInterval(status, 240000)
}