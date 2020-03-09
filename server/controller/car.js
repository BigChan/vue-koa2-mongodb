const { Car } = require('../db')

module.exports = {
  async add(ctx, next) {
    let { name, uid } = ctx.request.body
    console.log(ctx.request.body)
    console.log(name)
    console.log(uid)
    let car = new Car({ car_id: uid, car_name: name })

    res = await car.save()
    if (res._id != null) {
      ctx.body = {
        code: 200,
        msg: 'add success',
      }
    }
  },

  async find(ctx, next) {
    try {
      let carInfo = await Car.find({}, null)
      ctx.body = {
        code: 200,
        msg: '获取信息成功',
        list: carInfo,
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '获取信息，服务器异常，请稍后再试！',
      }
    }
  },

  async delcar(ctx, next) {
    let id = ctx.params.id
    console.log(id)
    try {
      let res = await Car.findOneAndDelete({ car_id: id })
      if (res == null) {
        ctx.body = {
          code: 500,
          msg: 'Delete fail',
        }
      } else {
        ctx.body = {
          code: 200,
          msg: 'Delete Success',
        }
      }
    } catch (e) {
      console.log(e)
      ctx.body = {
        code: 500,
        msg: '删除失败，服务器异常!',
      }
    }
  },
}
