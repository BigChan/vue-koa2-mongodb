const Student = require('../db/student')

module.exports = {
  async add(ctx, next) {
    let { name, sid } = ctx.request.body
    let student = new Student({ sid: sid, name: name })

    try {
      res = await student.save()
      if (res._id != null) {
        ctx.body = {
          code: 1,
          msg: 'add success',
        }
      }
    } catch (e) {
      if (e.code === 11000) {
        ctx.body = {
          code: 0,
          msg: '学号重复',
        }
      }
    }
  },

  async find(ctx, next) {
    try {
      let student = await Student.find({}, null).sort({ create_time: -1 })
      ctx.body = {
        code: 1,
        msg: '获取信息成功',
        list: student,
      }
    } catch (e) {
      ctx.body = {
        code: 0,
        msg: '获取信息，服务器异常，请稍后再试！',
      }
    }
  },

  async update(ctx, next) {
    const params = ctx.request.body
    try {
      let student = await Student.update(
        { _id: params._id },
        { sid: params.sid, name: params.name },
      )
      ctx.body = {
        code: 1,
        msg: '更新信息成功',
        list: student,
      }
    } catch (e) {
      ctx.body = {
        code: 0,
        msg: '更新失败',
      }
    }
  },

  async delete(ctx, next) {
    let id = ctx.params.id
    try {
      let res = await Student.findOneAndDelete({ sid: id })
      if (res == null) {
        ctx.body = {
          code: 0,
          msg: 'Delete fail',
        }
      } else {
        ctx.body = {
          code: 1,
          msg: 'Delete Success',
        }
      }
    } catch (e) {
      ctx.body = {
        code: 0,
        msg: '删除失败，服务器异常!',
      }
    }
  },
}
