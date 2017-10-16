const Sequelize = require('sequelize')
const config = require('./config.js')
let sequelize = new Sequelize('picture', config.username, config.password, {
  host: config.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
