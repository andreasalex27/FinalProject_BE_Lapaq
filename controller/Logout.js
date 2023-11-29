const jwt = require("jsonwebtoken");
const { responseFailed, responseSuccess } = require("../utils/response");

async function logoutSeller(req, res) {
  try {
    const token = req.cookies.token;
    console.log(token);
    console.log(req.headers.cookie)
    if(!token){
        return responseFailed(400, "anda belum login",res)
    }

    jwt.verify(token, 'SECRET_KEY', (err, decoded)=>{
        if(err){
            if (err.name === 'TokenExpiredError') {
                return responseFailed(401, "Token telah kadaluwarsa", res);
            } else {
                return responseFailed(401, "Token tidak valid", res);
            }
        }
    })
    res.clearCookie('token', { httpOnly: true, secure: true });
    responseSuccess(200, null, "berhasil logout", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

async function logoutBuyyer(req, res) {
  try {
    const token = req.cookies.token;
    console.log(token);
    if(!token){
        return responseFailed(400, "anda belum login",res)
    }

    jwt.verify(token, 'SECRET_KEY', (err, decoded)=>{
        if(err){
            if (err.name === 'TokenExpiredError') {
                return responseFailed(401, "Token telah kadaluwarsa", res);
            } else {
                return responseFailed(401, "Token tidak valid", res);
            }
        }
    })
    res.clearCookie('token');
    responseSuccess(200, null, "berhasil logout", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

module.exports = {
  logoutSeller,
  logoutBuyyer
};
