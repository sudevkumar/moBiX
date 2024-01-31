const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const CartModel = require("../models/Cart.modal");

const router = express.Router();

// Get Fav Id

router.get("/:userId", async (req, res) => {
  try {
    const cart = await CartModel.find({
      userId: req.params.userId,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// CreateVerify

router.post("/create", verifyToken, async (req, res) => {
  try {
    const cart = new CartModel(req.body);
    const saveCart = await cart.save();
    res.status(200).send(saveCart);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = router;
