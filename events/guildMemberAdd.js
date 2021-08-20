module.exports = async (client, message) => {

    const joinRole = memberAdd.roles.cache.find(role => role.name === 'Normies')
    memberAdd.roles.add(joinRole)

}