const mongoose = require('mongoose')
const db = mongoose.connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true },
  function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log('Connection mongodb success !')
    }
  },
)

const Schema = mongoose.Schema

//用户
let carSchema = new Schema({
  car_id: { type: String },
  car_name: { type: String },
  create_time: {
    type: String,
    default: Date.now,
  },
})

exports.Car = mongoose.model('Car', carSchema)
