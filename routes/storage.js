const router = require('koa-router')()
let template = require('../modules/sql/models/template')
const errors = require('../config/errors')

router.get('/template/:name', async (ctx, next) => {
  await template
    .findOne({where: {name: ctx.params.name}})
    .then(res => {
      // 成功找到，因为是添加操作，所以返回失败
      if (res) {
        ctx.body = {
          data: {
            template: res.template,
            arguments: res.arguments,
            name: res.name
          },
          status: 0,
          error: 0
        }
      } else {
        ctx.body = {
          status: 1,
          error: errors[404100]
        }
      }
    }, err => {
      ctx.body = {
        status: 1,
        error: errors[404100]
      }
      console.log('not found')
    })
})

router.post('/template/add', async (ctx, next) => {
  await template
    .findOne({
      name: ctx.request.body.name
    })
    .then(res => {
      // 成功找到，因为是添加操作，所以返回失败
      ctx.body = {
        status: 1,
        error: errors[400100]
      }
    }, err => {
      console.log('not found')
    })
  await template
    .build({
      name: ctx.request.body.name,
      template: JSON.stringify(ctx.request.body.template),
      arguments: JSON.stringify(ctx.request.body.arguments)
    })
    .save()
    .then((res) => {
      ctx.body = {status: 0, message: '模板添加成功！', data: res}
    }, (err) => {
      ctx.body = {status: 1}
    })
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
        ctx.body = {status: 0, message: '模板修改成功！', data: res}
      }
    }, err => {
      ctx.body = {
        status: 1,
        error: errors[400100]
      }
    })
})

module.exports = router
