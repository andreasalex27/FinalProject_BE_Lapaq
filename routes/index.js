const router = require("express").Router();
const loginRegister = require("./public/LoginRegister");
const userBuyer = require('./private/UserBuyer')
const userSeller = require('./private/UserSeller')
router.get("/", (req, res) => {
  res.send("welcome");
});

router.use(loginRegister);
router.use(userBuyer)
router.use(userSeller)

module.exports = router;
