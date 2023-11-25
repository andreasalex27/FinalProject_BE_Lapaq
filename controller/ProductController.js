const { responseFailed, responseSuccess } = require("../utils/response");
const Produk = require("../moduls/Products");
const { upload } = require("../utils/cloudinary");

async function getAllProduk(req, res) {
  try {
    const produk = await Produk.find({});
    responseSuccess(200, produk, "produk berhasil ditampilkan", res);
  } catch (error) {
    responseFailed(400, error.message, res);
  }
}

async function getDetailProduk(req, res) {
  try {
    const { _id } = req.params;
    const produk = await Produk.findOne({ _id });
    responseSuccess(200, produk, "produk berhasil ditampilkan", res);
  } catch (error) {
    responseFailed(400, error.message, res);
  }
}
async function getDetailKategori(req, res) {
  try {
    const { kategori } = req.params;
    const produk = await Produk.find({ kategori });
    responseSuccess(200, produk, "produk berhasil ditampilkan", res);
  } catch (error) {
    responseFailed(400, error.message, res);
    console.log(error);
  }
}

async function addProduct(req, res) {
  try {
    const { nama_produk, harga, deskripsi, kategori, rating } = req.body;

    if (!nama_produk || !harga || !deskripsi || !kategori || !req.file) {
      return responseFailed(400, "error", res);
    }

    const cloudinaryResult = await upload(req.file.buffer);

    const newProduct = new Produk({
      nama_produk,
      harga,
      deskripsi,
      kategori,
      rating,
      image: cloudinaryResult.secure_url,
    });

    await newProduct.save();

    responseSuccess(200, newProduct, "data berhasil ditambahkan", res);
  } catch (error) {
    responseFailed(500, error.message, res);
    console.log(error);
  }
}
module.exports = {
  addProduct,
  getAllProduk,
  getDetailProduk,
  getDetailKategori,
};
