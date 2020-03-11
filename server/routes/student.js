const Router = require('koa-router')
var router = new Router()

const student = require('../controller/student')

router
  .get('/api/student/list', student.find)
  .post('/api/student/add', student.add) // 添加汽车
  .get('/api/student/delete/:id', student.delete) // 删除汽车信息
  .post('/api/student/update', student.update) // 删除汽车信息

module.exports = router
