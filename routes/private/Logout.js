const { logoutSeller, logoutBuyyer } = require('../../controller/Logout')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

router.post('/logout/seller', logoutSeller)
router.post('/logout/buyyer', logoutBuyyer)
router.get('/logout/seller', [authenticateToken], (req, res)=>{
    res.send("test")
})

module.exports = router