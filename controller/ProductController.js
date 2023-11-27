const { responseFailed, responseSuccess } = require("../utils/response");
const Produk = require("../moduls/Products");
const { upload, deleteFile } = require("../utils/cloudinary");

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

async function deleteProduct(req, res) {
  try {
    const { _id } = req.params;
    const product = await Produk.findOne({ _id });
    if (!product) {
      responseFailed(400, "produk tidak ditemukan", res);
    }
    const fileURL = product.image
    await product.deleteOne({ _id });

    deleteFile(fileURL)
    responseSuccess(200, null, "produk berhasil di hapus", res);
  } catch (error) {
    responseFailed(500, error.message, res);
  }
}

async function editProduct(req,res){
  try {
    const {_id} = req.params
    const product = await Produk.findOne({_id})
    const {nama_produk, deskripsi, kategori, harga} = req.body

    if(!product){
      responseFailed(400, "produk tidak ditemukan", res)
    }
    if (nama_produk) {
      product.nama_produk = nama_produk;
    }
    if (deskripsi) {
      product.deskripsi = deskripsi;
    }
    if (kategori) {
      product.kategori = kategori;
    }
    if (harga) {
      product.harga = harga;
    }

    responseSuccess(200, product, "success di edit", res)
  } catch (error) {
    responseFailed(500, error.message, res)
  }
}
module.exports = {
  addProduct,
  getAllProduk,
  getDetailProduk,
  getDetailKategori,
  deleteProduct,
  editProduct
};
