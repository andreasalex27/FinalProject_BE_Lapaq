const { registerSeller } = require('../../controller/UserSellerController')

const router = require('express').Router()

router.post('/api/users_seller', registerSeller)

module.exports = router