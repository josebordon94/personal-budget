const mongoose = require('../bin/mongodb')
const errorMessage = require('../util/errorMessage')

const operationSchema = new mongoose.Schema(
  {
    concept: {
      type: String,
      required: [true, errorMessage.GENERAL.requiredField],
    },
    type: {
      type: Number,
      required: [true, errorMessage.GENERAL.requiredField],
      enum: [1, 2],
    },
    mount: {
      type: Number,
      required: [true, errorMessage.GENERAL.requiredField],
      min: '0.01',
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'categories',
    },
    date: {
      type: Date,
      default: new Date(),
      required: [true, errorMessage.GENERAL.requiredField],
    },
  },
  { timestamps: true },
)

const userWebSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.requiredField],
  },
  email: {
    type: String,
    required: [true, errorMessage.GENERAL.requiredField],
    unique: true,
  },
  password: {
    type: String,
    required: [true, errorMessage.GENERAL.requiredField],
  },
  operations: [operationSchema],
})
userWebSchema.statics.findBydIdAndValidate = async function (id) {
  const document = await this.findById(id)
  if (!document) {
    return {
      error: true,
      message: 'No existe usuario',
    }
  }
  return document
}
module.exports = mongoose.model('usersWeb', userWebSchema)
