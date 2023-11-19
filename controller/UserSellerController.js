const { responseFailed, responseSuccess } = require("../utils/response");
const { spaceSpam } = require("../utils/validations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User_Seller = require("../moduls/UserSeller");

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
    if (spaceSpam([email, password, pin])) {
      return responseFailed(400, "Harap masukan data dengan valid", res);
    }

    if (typeof pin !== "string" || pin.length !== 5) {
    return responseFailed(400, "NIK tidak sesuai atau harus berisi 16 karakter", res);
    }

    const newUser = new User_Seller({
      nama_toko,
      alamat_toko,
      email: email.toLowerCase(),
      password: hashPassword,
      pin: hashPassword
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

module.exports = {
    registerSeller
}