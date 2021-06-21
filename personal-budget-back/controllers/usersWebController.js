const usersWebModel = require('../models/usersWebModel')
const jwt = require('jsonwebtoken')
module.exports = {
  getAll: async function (req, res, next) {
    try {
      const productos = await productsModel.find()
      res.json(productos)
    } catch (e) {
      next(e)
    }
  },
  create: async function (req, res, next) {
    try {
      console.log(req.body)
      console.log(req.body.name)

      const document = new usersWebModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })

      const response = await document.save()

      res.json(response)
    } catch (e) {
      next(e)
    }
  },
  login: async function (req, res, next) {
    try {
      const userWeb = await usersWebModel.findOne({ email: req.body.email })
      if (!userWeb) {
        res.json({
          error: true,
          message: 'El email ingresado no pertenece a ningun usuario',
        })
        return
      }
      if (req.body.password == userWeb.password) {
        const token = jwt.sign(
          { userId: userWeb._id },
          req.app.get('secretKey'),
          {},
        )
        res.json({
          error: false,
          message: 'Ha iniciado sesion correctamente',
          user_id: userWeb._id,
          user_name: userWeb.name,
          token: token,
        })
        return
      } else {
        res.json({
          error: true,
          message: 'La contraseña ingresada no es correcta',
        })
        return
      }
    } catch (e) {
      next(e)
    }
  },
}
