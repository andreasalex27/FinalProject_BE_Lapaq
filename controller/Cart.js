const mongoose = require("mongoose");
const { Cart } = require("../moduls/cart");
const { responseFailed, responseSuccess } = require("../utils/response");
const Produk = require("../moduls/Products");
const User = require("../moduls/UsersBuyer")

async function addCart(req, res){
    try {
        const { user_buyer_id, produk_id, status_code } = req.body;

        const existingId = await User.findOne({_id: user_buyer_id})
        if(!existingId){
            return responseFailed(400, "id user tidak ditemukan", res)
        }

        const existingProduct = await Produk.findOne({_id: produk_id})
        if(!existingProduct){
            return responseFailed(400, "id seller tidak ditemukan", res)
        }
        const product = await Produk.findById(produk_id)
        const harga = parseFloat(product.harga)
        const nama_produk = product.nama_produk
        const image = product.image
        if(!status_code){
            return responseFailed(400, "error status code", res)
        }

        const newCartData = {
            user_buyer_id: new mongoose.Types.ObjectId(user_buyer_id),
            produk_id: new mongoose.Types.ObjectId(produk_id),
            nama_produk: nama_produk, 
            harga: harga,
            image: image,
            status_code: status_code
        };
    
        const newCart = new Cart(newCartData);
        await newCart.save();

        responseSuccess(200, newCart, "Berhasil menambahkan ke cart", res);
    } catch (error) {
        console.log(error)
        responseFailed(500, error.message, res);
    }
}

async function deleteCart(req, res){
    try {
        const {_id} = req.params
        const cart = await Cart.findOne({_id})

        if(!cart){
            return responseFailed(400, "id tidak ditemukan", res)
        }
        await cart.deleteOne({_id})
        responseSuccess(200, null, "berhasil di hapus", res)
    } catch (error) {
        responseFailed(500, error.message, res)
    }
}

module.exports = {
    addCart,
    deleteCart
}
