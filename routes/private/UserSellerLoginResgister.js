const { registerSeller, loginSaller } = require('../../controller/LoginRegisterSellerController')

const router = require('express').Router()

router.post('/register/seller', registerSeller)
router.post('/login/seller', loginSaller)

module.exports = router