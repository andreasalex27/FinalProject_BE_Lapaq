const router = require("express").Router();
const loginRegister = require("./public/LoginRegister");
const userBuyer = require('./private/UserBuyer')
const loginRegisterSeller = require('./private/UserSellerLoginResgister')
const userSeller = require('./private/UserSaller')
const produk = require("./public/Produk")
const comment = require('./private/comments')

router.get("/", (req, res) => {
  res.send("welcome");
});

router.use(loginRegister);
router.use(userBuyer)
router.use(loginRegisterSeller)
router.use(userSeller)
router.use(produk)
router.use(comment)

module.exports = router;
