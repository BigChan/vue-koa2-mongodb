// 学生信息
var mongoose = require('./index.js'),
  Schema = mongoose.Schema

let StudentSchema = new Schema({
  sid: { type: String, unique: true },
  name: { type: String },
  create_time: {
    type: String,
    default: Date.now,
  },
})

module.exports = mongoose.model('Student', StudentSchema, 'student')
