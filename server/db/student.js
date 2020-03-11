// 学生信息
var mongoose = require('./index.js'),
  Schema = mongoose.Schema

let StudentSchema = new Schema({
  sid: { type: Number, unique: true },
  name: { type: String },
  create_time: {
    type: Number,
    default: Date.now,
  },
})

module.exports = mongoose.model('Student', StudentSchema, 'student')
