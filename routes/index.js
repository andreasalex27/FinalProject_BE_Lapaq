const router = require("express").Router();
const loginRegister = require("./public/LoginRegister");
const userBuyer = require('./private/UserBuyer')
const loginRegisterSeller = require('./private/UserSellerLoginResgister')
const userSeller = require('./private/UserSaller')
const produk = require("./private/Produk")
router.get("/", (req, res) => {
  res.send("welcome");
});

router.use(loginRegister);
router.use(userBuyer)
router.use(loginRegisterSeller)
router.use(userSeller)
router.use(produk)

module.exports = router;
