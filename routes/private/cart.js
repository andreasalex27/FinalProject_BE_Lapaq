const { addCart } = require('../../controller/Cart')

const router = require('express').Router()

router.post('/product/cart', addCart)

module.exports = router