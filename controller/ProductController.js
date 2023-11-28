const { responseFailed, responseSuccess } = require("../utils/response");
const Produk = require("../moduls/Products");
const { upload, deleteFile } = require("../utils/cloudinary");
const Joi = require('joi')

const addProductSchema = Joi.object({
  nama_produk: Joi.string().max(255).required(),
  harga: Joi.string()
    .pattern(/^[0-9]+([.,][0-9]{1,2})?$/)
    .custom((value, helpers) => {
      const numericValue = parseFloat(value.replace(',', '.'));

      if (numericValue < 1000 || numericValue > 100000000) {
        return helpers.message('Harga harus berada di antara 1.000 dan 100.000.000');
      }

      return value;
    })
    .required(),
    deskripsi: Joi.string().max(255).required(),
    kategori: Joi.string().max(255).required(),
    rating: Joi.string().pattern(/^[1-9]+$/)
});
const updateProductSchema = Joi.object({
  nama_produk: Joi.string().max(255),
  harga: Joi.string()
    .pattern(/^[0-9]+([.,][0-9]{1,2})?$/)
    .custom((value, helpers) => {
      const numericValue = parseFloat(value.replace(',', '.'));

      if (numericValue < 1000 || numericValue > 100000000) {
        return helpers.message('Harga harus berada di antara 1.000 dan 100.000.000');
      }

      return value;
    })
    ,
    deskripsi: Joi.string().max(255),
    kategori: Joi.string().max(255),
    rating: Joi.string().pattern(/^[1-9]+$/)
});

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
    const {error, value}= addProductSchema.validate(req.body)
    if(error){
      return responseFailed(400, error.message, res)
    }
    const { nama_produk, harga, deskripsi, kategori, rating } = value;

    const cloudinaryResult = await upload(req.file.buffer);

    const newProduct = new Produk({
      nama_produk: nama_produk,
      harga: harga,
      deskripsi: deskripsi,
      kategori: kategori,
      rating: rating,
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
    const {error, value} = updateProductSchema.validate(req.body)
    if(error){
      return responseFailed(400, error.message, res)
    }
    const {_id} = req.params
    const product = await Produk.findOne({_id})
    const {nama_produk, deskripsi, kategori, harga} = value

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
