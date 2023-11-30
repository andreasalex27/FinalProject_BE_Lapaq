const { addCart, deleteCart, listCart } = require('../../controller/Cart')

const router = require('express').Router()

router.post('/product/cart', addCart)
router.delete('/product/cart/:_id', deleteCart)
router.get('/product/cart/:user_buyer_id', listCart)

module.exports = router