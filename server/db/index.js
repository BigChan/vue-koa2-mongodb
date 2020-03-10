const mongoose = require('mongoose')
mongoose.connect(
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

module.exports = mongoose
