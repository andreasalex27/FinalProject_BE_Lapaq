const Comment = require("../moduls/Comments");
const { comment } = require("../utils/cloudinary");
const { responseFailed, responseSuccess } = require("../utils/response");

async function addComment(req, res) {
  try {
    const { nama, deskripsi, rating } = req.body;

    if (!nama || !deskripsi) {
     return responseFailed(400, "mohon isi dengan lengkap", res);
    }

    const cloudinaryResult = await comment(req.file.buffer);

    const newComment = new Comment({
      nama: nama,
      deskripsi: deskripsi,
      rating: rating,
      image: cloudinaryResult.secure_url,
    });

    await newComment.save();
    responseSuccess(200, newComment, "berhasil menambah komentar", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

async function deleteComment(req, res) {
  try {
    const { _id } = req.params;
    const comment = await Comment.findOne({ _id });

    if (!comment) {
     return responseFailed(400, "comment tidak ditemukan", res);
    }

    await comment.deleteOne({ _id });
    responseSuccess(200, null, "berhasil di hapus", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

async function getComment(req, res){
    try {
        const comment = await Comment.find({})
        responseSuccess(200, comment, "data berhasil di ambil", res)
    } catch (error) {
        responseFailed(500, error.message, res)
    }
}

async function editComment(req, res){
    try {
        const {_id} =req.params
        const comment = await Comment.findOne({_id})
        const {nama, deskripsi, rating} = req.body
        if(!comment){
            responseFailed(400, "data tidak ditemukan", res)
        }

        if(!nama){
            comment.nama = nama
        }
        if(!deskripsi){
            comment.deskripsi = deskripsi
        }
        if(!rating){
            comment.rating = rating
        }

        responseSuccess(200, null, "data berhasil di edit", res)
    } catch (error) {
        responseFailed(500, error.message, res)
    }
}
module.exports = {
  addComment,
  deleteComment,
  getComment,
  editComment
};
