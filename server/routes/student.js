const router = require('koa-router')()

const controller = require('../controller')

router
  .get('/api/student/list', async (ctx, next) => {
    ctx.body = {
      title: 'product json',
    }
  })
  .post('/api/addcar', controller.car.add) // 添加汽车
  .get('/api/getinfo', controller.car.find) // 查询汽车信息
  .get('/api/deletecar/:id', controller.car.delcar) // 删除汽车信息 (有参数路由问题)
// .get("/api/deletecar", controller.car.delcar)  // 删除汽车信息 (有参数路由问题)

module.exports = router
