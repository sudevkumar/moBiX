const mongoose = require("mongoose");
const FavoriteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },

    desc: {
      type: String,
      require: true,
    },

    mainPhoto: {
      type: String,
      require: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      require: true,
    },

    // Seller and account Info

    sellerId: {
      type: String,
      require: true,
    },

    sellerName: {
      type: String,
      require: true,
    },

    userId: {
      type: String,
      require: true,
    },

    prodId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
