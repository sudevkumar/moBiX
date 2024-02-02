const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },

    userName: {
      type: String,
      require: true,
    },

    userEmail: {
      type: String,
      require: true,
    },

    cartProduct: {
      type: Object,
      require: true,
    },

    totalDiscountPrice: {
      type: Number,
      require: true,
    },

    totalPrice: {
      type: Number,
      require: true,
    },

    shippingName: {
      type: String,
      require: true,
    },

    shippingAddress: {
      type: String,
      require: true,
    },

    selectShppingState: {
      type: String,
      require: true,
    },

    selectedShppingCity: {
      type: String,
      require: true,
    },

    shippingPinCode: {
      type: String,
      require: true,
    },

    paymentType: {
      type: String,
      require: true,
    },

    cardDetails: {
      type: String,
    },

    cvv: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrderSchema);
