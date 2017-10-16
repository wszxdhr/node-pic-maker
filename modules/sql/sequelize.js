const Sequelize = require('sequelize')
const config = require('./config.js')
let sequelize = new Sequelize('mysql://root:Wszxdhr98090098@anymelon.com:3306/picture')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
