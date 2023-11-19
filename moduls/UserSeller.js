const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nama_toko: {
      type: String,
      required: true,
    },
    alamat_toko: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
  }
);

const User_Seller = mongoose.model("user_seller", userSchema);

module.exports = User_Seller;
