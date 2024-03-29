const { addOrder, getOrderUser, getOrderSeller } = require('../../controller/order')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

router.post('/product/order',[authenticateToken], addOrder)
router.get('/product/order/:user_buyer_id', [authenticateToken], getOrderUser)
router.get('/product/order/seller/:user_seller_id', [authenticateToken], getOrderSeller)

module.exports = router