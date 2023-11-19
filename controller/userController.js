const User = require("../moduls/Users");
const { responseFailed, responseSuccess } = require("../utils/response");
const { spaceSpam } = require("../utils/validations");

async function getAllUsers(req, res) {
  try {
    const users = await User.find({});

    responseSuccess(200, users, "Data berhasil ditemukan", res);
  } catch (error) {
    responseFailed(400, error.message || "Terjadi kesalahan", res);
  }
}


async function getDetailUser(req, res) {
    try {
        const { _id } = req.params
        const user = await User.findOne({ _id })

        responseSuccess(200, user, "Data berhasil di tampilkan", res)
    } catch (error) {
        responseFailed(400, error.message, res)
    }
}

// async function editUser(req, res) {
//     try {
//         const { _id } = req.params
//         const user = await User.findOne({ _id })
//         const { nama_depan, nama_belakang, email, password, nik, alamat } = req.body;

        
//         if (typeof nik !== 'string' || nik.length !== 16) {
//             return responseFailed(400, "NIK tidak sesuai atau harus berisi 16 karakter", res);
//         }
      
//         if(!user){
//             return responseFailed(400, "User tidak ditemukan", res)
//         }

//         for(const key in req.body){
//             if(key in user){
//                 user[key] = req.body[key]
//             }
//         }
//         await user.save()
//         responseSuccess(200, user, "Berhasil di perbarui", res)
        
//     } catch (error) {
//         responseFailed(400, error.message, res)
//     }
// }

async function deleteUser(req, res) {
    try {
        const {_id} = req.params
        const user = await User.findOne({_id})

        if(!user){
            responseFailed(400, "User tidak dapat ditemukan", res)
        }

        await user.deleteOne({_id})
        responseSuccess(200, null, "User berhasil di hapus", res)
    } catch (error) {
        responseFailed(400, error.message, res)
    }
}

module.exports = {
  getAllUsers,
  getDetailUser,
  deleteUser,
};
