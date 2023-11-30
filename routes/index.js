const router = require("express").Router();
const loginRegister = require("./public/LoginRegister");
const userBuyer = require('./private/UserBuyer')
const loginRegisterSeller = require('./private/UserSellerLoginResgister')
const userSeller = require('./private/UserSaller')
const produk = require("./public/Produk")
const comment = require('./private/comments')
const logout = require('./private/Logout')
const cart = require('./private/cart')
const order = require('./private/order')

router.get("/", (req, res) => {
  res.send("welcome");
});

router.use(loginRegister);
router.use(userBuyer)
router.use(loginRegisterSeller)
router.use(userSeller)
router.use(produk)
router.use(comment)
router.use(logout)
router.use(cart)
router.use(order)

module.exports = router;
