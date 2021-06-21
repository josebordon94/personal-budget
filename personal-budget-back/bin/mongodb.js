var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate-v2')
let dataBaseName = 'personalBudget'
let direccion = 'mongodb://localhost/' + dataBaseName
mongoose.connect(direccion, { useNewUrlParser: true }, function (error) {
  if (error) {
    throw error
  } else {
    console.log('Successfully connected to ' + dataBaseName)
  }
})
mongoosePaginate.paginate.options = {
  limit: 1,
  lean: false,
}
mongoose.mongoosePaginate = mongoosePaginate
module.exports = mongoose
