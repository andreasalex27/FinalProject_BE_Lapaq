const { addCart, deleteCart } = require('../../controller/Cart')

const router = require('express').Router()

router.post('/product/cart', addCart)
router.delete('/product/cart/:_id', deleteCart)

module.exports = router