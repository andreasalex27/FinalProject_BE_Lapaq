const { registerSeller, loginSaller } = require('../../controller/LoginRegisterSellerController')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

router.post('/register/seller', [authenticateToken], registerSeller)
router.post('/login/seller', [authenticateToken], loginSaller)

module.exports = router