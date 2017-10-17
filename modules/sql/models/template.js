let Sequelize = require('sequelize')
let sequelize = require('../sequelize')

module.exports = sequelize.define('templates', {
  name: Sequelize.STRING(20),
  template: Sequelize.TEXT,
  arguments: Sequelize.STRING(100)
});
