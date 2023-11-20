const router = require("express").Router();
const loginRegister = require("./public/LoginRegister");
const userBuyer = require('./private/UserBuyer')
const loginRegisterSeller = require('./private/UserSellerLoginResgister')
const userSeller = require('../routes/private/UserSaller')
router.get("/", (req, res) => {
  res.send("welcome");
});

router.use(loginRegister);
router.use(userBuyer)
router.use(loginRegisterSeller)
router.use(userSeller)

module.exports = router;
