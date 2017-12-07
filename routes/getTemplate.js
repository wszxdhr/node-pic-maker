const router = require('koa-router')()
const translater = require('../modules/render/query2template')

router.get('/getTemplate', async (ctx, next) => {
  const query = ctx.query
  const template = query.template
  await ctx.send(template)
})

module.exports = router
