const router = require('koa-router')()
let template = require('../modules/sql/models/template')

router.post('/template/add', async (ctx, next) => {
  template
    .build({
      name: ctx.request.body.name,
      template: JSON.stringify(ctx.request.body.template),
      arguments: JSON.stringify(ctx.request.body.arguments)
    })
    .save()
    .then((another) => {
      console.log(another)
    }, (err) => {
      console.error(err)
    })
  ctx.body = ctx.request.body
})

router.put('/template/edit/:name', async (ctx, next) => {
  let body = {}
  if (ctx.request.body.template) {
    body.template = JSON.stringify(ctx.request.body.template)
  }
  if (ctx.request.body.arguments) {
    body.arguments = JSON.stringify(ctx.request.body.arguments)
  }
  await template
    .update(body, {where: {name: ctx.params.name}})
    .then(res => {
      if (res) {
        ctx.body = 'success'
      }
    })
})

module.exports = router
