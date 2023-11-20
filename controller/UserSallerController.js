const User_Seller = require("../moduls/UserSeller");
const { responseSuccess, responseFailed } = require("../utils/response");

async function getAllUsers(req, res) {
    try {
      const users = await User_Seller.find({});
  
      responseSuccess(200, users, "Data berhasil ditemukan", res);
    } catch (error) {
      responseFailed(400, error.message, res);
    }
  }

  async function getDetailUser(req, res){
    try {
        const {_id} = req.params
        const user = await User_Seller.findOne({_id})

        responseSuccess(200, user, "User ditemukan", res)
    } catch (error) {
        responseFailed(400, error.message, res)
    }
  }

  async function updateUser(req, res) {
    try {
      const { _id } = req.params;
      const user = await User_Seller.findOne({ _id });
      const { nama_toko, alamat } = req.body;
  
      if (!user) {
        return responseFailed(400, "User tidak ditemukan", res);
      }
  
      if (nama_toko) {
        user.nama_toko = nama_toko;
      }
      if (alamat) {
        user.alamat = alamat;
      }
  
      await user.save();
      responseSuccess(200, user, "User berhasil diperbarui", res);
    } catch (error) {
      responseFailed(500, error.message, res);
    }
  }
  
  async function deleteUser(req, res){
    try {
      const {_id} = req.params
      const user = await User_Seller.findOne({_id})

      if(!user){
        return responseFailed(400, "user tidak ditemukan", res)
      }
      await user.deleteOne({_id})
      responseSuccess(200, null, "user berhasil di hapus", res)
    } catch (error) {
      responseFailed(500, "server error", res)
    }
  }
  module.exports = {
    getAllUsers,
    getDetailUser,
    updateUser,
    deleteUser
  }