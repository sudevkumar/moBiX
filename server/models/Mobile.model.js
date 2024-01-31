const mongoose = require("mongoose");
const MobileSchema = new mongoose.Schema(
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

    secondPhoto: {
      type: String,
      require: true,
    },

    thirdPhoto: {
      type: String,
      require: true,
    },

    fourthPhoto: {
      type: String,
      require: true,
    },

    fifthPhoto: {
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

    packingFee: {
      type: Number,
      require: true,
    },

    sellerId: {
      type: String,
      require: true,
    },

    sellerName: {
      type: String,
      require: true,
    },

    sellerReplacement: {
      type: String,
      require: true,
    },

    prodDescTitle: {
      type: String,
      require: true,
    },

    prodDescImg: {
      type: String,
      require: true,
    },

    inTheBox: {
      type: String,
      require: true,
    },

    modelNumber: {
      type: String,
      require: true,
    },

    modelName: {
      type: String,
      require: true,
    },

    color: {
      type: Array,
      require: true,
    },

    browserType: {
      type: String,
      require: true,
    },

    quickCharging: {
      type: Boolean,
      require: true,
    },

    touchScreen: {
      type: Boolean,
      require: true,
    },

    SIMType: {
      type: String,
      require: true,
    },

    displaySize: {
      type: String,
      require: true,
    },

    resolution: {
      type: String,
      require: true,
    },

    resolutionType: {
      type: String,
      require: true,
    },

    // Os & Processor Features

    operatingSystem: {
      type: String,
      require: true,
    },

    processorBrand: {
      type: String,
      require: true,
    },

    // Memory & Storage Features

    internalStorage: {
      type: Array,
      require: true,
    },

    RAM: {
      type: Array,
      require: true,
    },

    expandableStorage: {
      type: String,
      require: true,
    },

    // Battery & Power Features

    batteryCapacity: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mobiles", MobileSchema);
