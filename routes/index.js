const router = require("express").Router();
const loginRegister = require("./public/LoginRegister");
const private = require('./private/private')
router.get("/", (req, res) => {
  res.send("welcome");
});

router.use(loginRegister);
router.use(private)

module.exports = router;
