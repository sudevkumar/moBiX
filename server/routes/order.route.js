const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const CartModal = require("../models/Cart.modal");
const OrderModal = require("../models/Order.modal");

const router = express.Router();


router.post("/create", verifyToken, async (req, res) => {
  try {
    const order = new OrderModal(req.body);
    const saveOrder = await order.save();
    const userCart = await CartModal.deleteMany({ userId: req.body.userId });
    res.status(200).send(saveOrder);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await OrderModal.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been cancelled!");
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = router;
