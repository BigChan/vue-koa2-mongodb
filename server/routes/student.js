const Router = require('koa-router')
var router = new Router()

const student = require('../controller/student')

router
  .get('/api/student/list', student.find)
  .post('/api/student/add', student.add) // 添加汽车
  .get('/api/student/detail/:id', student.find) // 查询汽车信息
  .get('/api/student/delete/:id', student.delete) // 删除汽车信息 (有参数路由问题)

module.exports = router
