const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    nama_produk: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    harga: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      default: null
    },
    image:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Produk = mongoose.model("products", productSchema);

module.exports = Produk;
