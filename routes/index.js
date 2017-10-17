const router = require('koa-router')()
const translater = require('../modules/render/query2template')

router.get('/', async (ctx, next) => {
  const elements = (await translater(ctx.query)).elements
  await ctx.render('index', {elements})
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
