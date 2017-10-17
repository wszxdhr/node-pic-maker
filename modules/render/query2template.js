let jiade = require('../../test/data/templateJSON.json').elements
const sequelize = require('../sql/models/template')

module.exports = async function (query) {
  return JSON.parse(await sequelize
    // 根据模板名称找到模板
    .findOne({name: query.template})
    .then(res => {
      let template = res.template
      let args = JSON.parse(res.arguments)
      // 循环查找模板字符串${xxx}
      for (let arg of args) {
        // fixme: 如果template本身 或 参数中含有${img1}类似字样会出错 或 query参数中出现 '{', '}', '['等特殊字符时，未处理
        // 将字符串拆分为
        let splitedArg = template.split('${' + arg + '}')
        let insertStr = query[arg]
        template = splitedArg.join(insertStr)
      }
      return template
    }))
}
