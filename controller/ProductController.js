const { responseFailed, responseSuccess } = require("../utils/response");
const Produk = require("../moduls/Products");
const { upload } = require("../utils");

async function addProduct(req, res) {
  try {
    const { nama_produk, harga, deskripsi, kategori } = req.body;

    if (!nama_produk || !harga || !deskripsi || !kategori || !req.file) {
      return res.status(400).json({ error: 'Semua field harus diisi dan gambar harus diunggah' });
    }
    const cloudinaryResult = await upload(req.file.buffer);
    
    const newProduct = new Produk({
      nama_produk,
      harga,
      deskripsi,
      kategori,
      img: cloudinaryResult.secure_url
    });

    await newProduct.save();

    responseSuccess(200, newProduct, "data berhasil ditambahkan", res)
  } catch (error) {
    responseFailed(500, error.massage, res)
  }
}

module.exports = {
  addProduct,
};
