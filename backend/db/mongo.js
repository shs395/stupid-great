const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const { DB } = require('../constants')

mongoose.connect(DB, {useNewUrlParser: true})
mongoose.connection.on('connected', () => {
    console.info(`Running mongoose v${mongoose.version}`)
})
// Auto Increment 플러그인
autoIncrement.initialize(mongoose.connection)

module.exports = {
    mongoose,
    autoIncrement: autoIncrement.plugin
}