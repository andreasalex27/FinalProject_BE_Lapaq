const User = require("../moduls/UsersBuyer");
const { responseFailed, responseSuccess } = require("../utils/response");
const { spaceSpam } = require("../utils/validations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {

  try {
    const { nama_depan, nama_belakang, email, password, nik, alamat } = req.body;

    if(!nama_depan || !nama_belakang || !email || !password || !nik){
      return responseFailed(400, "Data harus di isi", res)
    }

    const existingUser = await User.findOne({email})
    if(existingUser){
      return responseFailed(400, "email sudah terdaftar", res)
    }

    const existingNik = await User.findOne({nik})
    if(existingNik){
      return responseFailed(400, "nik sudah terdaftar", res)
    }

    const hashPassword = await bcrypt.hash(password, 10);
    if (spaceSpam([nama_depan, nama_belakang, email, password, alamat])) {
      return responseFailed(400, "Harap masukan data dengan valid", res);
    }

    if (typeof nik !== "string" || nik.length !== 16) {
    return responseFailed(400, "NIK tidak sesuai atau harus berisi 16 karakter", res);
    }

    const newUser = new User({
      nama_depan,
      nama_belakang,
      email: email.toLowerCase(),
      password: hashPassword,
      nik,
      alamat,
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
const generatedToken = (user) => {
  const token = jwt.sign({userId: user._id},'SECRET_KEY', {expiresIn:"1h"})
  return token
}
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return responseFailed(401, "Email atau password tidak ditemukan", res);
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password)
  
    if (!passwordMatch) {
      return responseFailed(401, "Email atau password tidak ditemukan", res);
    }
    const token = generatedToken(user)
    responseSuccess(200, {user, token}, "Login berhasil", res);
  } catch (error) {
    responseFailed(500, "terjadi kesalahan server", res)
  }
}

module.exports = {
  register,
  login
};
