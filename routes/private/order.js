const { addOrder, getOrderUser } = require('../../controller/order')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

router.post('/product/order', addOrder)
router.get('/poruct/order/:user_buyer_id',[authenticateToken], getOrderUser)

module.exports = router