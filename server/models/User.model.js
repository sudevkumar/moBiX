const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },

    shopDesc: {
      type: String,
    },

    email: {
      type: String,
      default: 0,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    secretAnswer: {
      type: String,
      require: true,
    },

    role: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
