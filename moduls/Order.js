const mongoose = require("mongoose");

const orderShema = mongoose.Schema(
  {
    user_buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    produk_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true
    },
    nama_produk: {
      type: String,
    },
    harga: {
      type: String,  
    },
    image: {
      type: String, 
    },
    status_cart:{
      type: String,
      default: "active"
    }
  },
  {
    timestamps: true,
  }
);

exports.Order = mongoose.model("Order", orderShema);
