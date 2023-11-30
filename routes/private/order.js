const { addOrder } = require('../../controller/order')

const router = require('express').Router()

router.post('/product/order', addOrder)

module.exports = router