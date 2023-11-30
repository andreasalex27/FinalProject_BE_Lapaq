const { addOrder, getOrderUser } = require('../../controller/order')

const router = require('express').Router()

router.post('/product/order', addOrder)
router.get('/poruct/order/:user_buyer_id', getOrderUser)

module.exports = router