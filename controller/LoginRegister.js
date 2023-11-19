const User = require("../moduls/Users");
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

    const hashPassword = await bcrypt.hash(password, 10);
    if (spaceSpam([nama_depan, nama_belakang, email, password, alamat])) {
      return responseFailed(400, "Harap masukan data dengan valid", res);
    }

    if (typeof nik !== 'string' || nik.length !== 16) {
    return responseFailed(400, "NIK tidak sesuai atau harus berisi 16 karakter", res);
    }


    const newUser = new User({
      nama_depan,
      nama_belakang,
      email,
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

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return responseFailed(401, "Email atau password tidak ditemukan", res);
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return responseFailed(401, "Email atau password tidak ditemukan", res);
  }

  responseSuccess(200, { user }, "Login berhasil", res);
}

module.exports = {
  register,
  login
};
