var express = require('express')
var router = express.Router()
const operationsController = require('../controllers/operationsController')

router.get('/balance/:user_id', operationsController.getBalance)
router.get('/:user_id', operationsController.getByUserId)
router.get('/last/:user_id', operationsController.getLastOperations)
router.post('/', operationsController.create)
router.put('/:user_id/:operation_id', operationsController.update)
router.delete('/:user_id/:operation_id', operationsController.delete)
module.exports = router
