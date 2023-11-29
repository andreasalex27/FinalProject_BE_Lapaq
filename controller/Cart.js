const mongoose = require("mongoose");
const { Cart } = require("../moduls/cart");
const { responseFailed, responseSuccess } = require("../utils/response");
const Produk = require("../moduls/Products");

async function addCart(req, res){
    try {
        // Pastikan mendapatkan userId dan productId dari permintaan HTTP
        const { user_buyer_id, produk_id } = req.body;
        const produk = await Produk.findById(produk_id)
        const hargaProduk = produk.harga;
        // Pastikan skema Cart konsisten dengan bidang yang digunakan
        const newCartData = {
            user_buyer_id: new mongoose.Types.ObjectId(user_buyer_id),
            produk_id: new mongoose.Types.ObjectId(produk_id),
            harga: hargaProduk
        };
    
        const newCart = new Cart(newCartData);
        await newCart.save();

        responseSuccess(200, newCart, "Berhasil menambahkan ke cart", res);
    } catch (error) {
        console.log(error)
        responseFailed(500, error.message, res);
    }
}

module.exports = {
    addCart
}
