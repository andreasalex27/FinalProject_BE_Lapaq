const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
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
    harga: {
      type: String,  // Menggunakan Number untuk menyimpan harga sebagai angka
    }
  },
  {
    timestamps: true,
  }
);

exports.Cart = mongoose.model("Cart", cartSchema);
