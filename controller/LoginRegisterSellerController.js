const { responseFailed, responseSuccess } = require("../utils/response");
const { spaceSpam } = require("../utils/validations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User_Seller = require("../moduls/UserSeller");

const generatedToken = (user) => {
  const token = jwt.sign({userId: user._id},'SECRET_KEY', {expiresIn:"1h"})
  return token
}

async function registerSeller(req, res) {

  try {
    const { nama_toko, alamat_toko, email, password, pin } = req.body;

    if(!nama_toko || !alamat_toko || !email || !password || !pin){
      return responseFailed(400, "Data harus di isi", res)
    }

    const existingUser = await User_Seller.findOne({email})
    if(existingUser){
      return responseFailed(400, "email sudah terdaftar", res)
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const hashPin = await bcrypt.hash(pin, 10)

    if (spaceSpam([email, password, pin])) {
      return responseFailed(400, "Harap masukan data dengan valid", res);
    }

    if (typeof pin !== "string" || pin.length !== 5) {
    return responseFailed(400, "PIN tidak sesuai atau harus berisi 5 angka", res);
    }

    const newUser = new User_Seller({
      nama_toko,
      alamat_toko,
      email: email.toLowerCase(),
      password: hashPassword,
      pin: hashPin
    });
    await newUser.save();

    const token = jwt.sign({ user_id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    responseSuccess(200, { newUser, token }, `Berhasil membuat akun..`, res);
  } catch (error) {
    responseFailed(400, error.message, res);
  }
}

async function loginSaller(req, res) {
  const { email, password, pin } = req.body;
  try {
      const user = await User_Seller.findOne({ email });
      if (!user) {
          return responseFailed(400, "Kombinasi email, password, dan pin tidak valid", res);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
          return responseFailed(400, "Kombinasi email, password, dan pin tidak valid", res);
      }

      const pinMatch = await bcrypt.compare(pin, user.pin);
      if (!pinMatch) {
          return responseFailed(400, "Kombinasi email, password, dan pin tidak valid", res);
      }

      const token = generatedToken(user);
      responseSuccess(200, { user, token }, "Berhasil login", res);
  } catch (error) {
      responseFailed(500, error.message, res);
  }
}

module.exports = {
    registerSeller,
    loginSaller
}