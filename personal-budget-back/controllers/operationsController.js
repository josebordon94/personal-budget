const usersWebModel = require('../models/usersWebModel')
module.exports = {
  getByUserId: async function (req, res, next) {
    try {
      console.log(req.params)
      const user = await usersWebModel.findById(req.params.user_id)
      res.json(user.operations)
    } catch (e) {
      next(e)
    }
  },
  getLastOperations: async function (req, res, next) {
    try {
      console.log(req.params)
      const user = await usersWebModel.findById(req.params.user_id)
      //Get only the 10 last operations
      res.json(user.operations.slice(-10))
    } catch (e) {
      next(e)
    }
  },
  create: async function (req, res, next) {
    try {
      console.log('Validating user id')
      const user = await usersWebModel.findBydIdAndValidate(req.body.user_id)
      if (user.error) {
        res.json(user)
        return
      }
      const operation = {
        concept: req.body.concept,
        mount: req.body.mount,
        type: req.body.type,
        date: req.body.date,
      }
      //Push new operation intro user history
      user.operations.push(operation)

      console.log('Inserting: ' + operation)
      const response = await user.save()
      res.json(response)
    } catch (e) {
      next(e)
    }
  },
  update: async function (req, res, next) {
    try {
      const user_id = req.params.user_id
      const operation_id = req.params.operation_id
      const data = req.body
      const user = await usersWebModel.findOne({ _id: user_id })
      user.operations.id(operation_id).concept = data.concept
      user.operations.id(operation_id).mount = data.mount
      user.operations.id(operation_id).date = data.date
      console.log('Req:', req.body)
      const response = await user.save()
      res.json(response)
    } catch (e) {
      res.json({ error: true, msg: 'Datos no válidos' })
    }
  },
  delete: async function (req, res, next) {
    try {
      console.log('Validating user id')
      console.log(req.params)
      const user = await usersWebModel.findBydIdAndValidate(req.params.user_id)
      if (user.error) {
        res.json(user)
        return
      }
      console.log(user)
      const response = user.operations.pull(req.params.operation_id)
      await user.save()
      res.json(response)
    } catch (e) {
      next(e)
    }
  },
  getBalance: async function (req, res, next) {
    const user = await usersWebModel.findById(req.params.user_id)
    let total = 0
    user.operations.forEach((op) => {
      op.type == 1
        ? (total += parseFloat(op.mount))
        : (total -= parseFloat(op.mount))
    })
    res.json(total.toFixed(2))
  },
}
