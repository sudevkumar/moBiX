const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const MobileModel = require("../models/Mobile.model");

const router = express.Router();

// Get All Mobiles or search or by name

router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const mobiles = await MobileModel.find(
      query.search ? searchFilter : null
    ).sort({
      createdAt: -1,
    });
    res.status(200).json(mobiles);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Get All Mobiles from seller id

router.get("/seller/:sellerId", verifyToken, async (req, res) => {
  try {
    const mobiles = await MobileModel.find({
      sellerId: req.params.sellerId,
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(mobiles);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Get A Mobile from its id

router.get("/:id", async (req, res) => {
  try {
    const mobiles = await MobileModel.findById(req.params.id);
    res.status(200).json(mobiles);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// CreateVerify

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newBestElectronics = new MobileModel(req.body);
    const saveBestElectronics = await newBestElectronics.save();
    res.status(200).send(saveBestElectronics);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

// Update

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedMobile = await MobileModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedMobile);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Delete

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await MobileModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Mobile has been deleted!");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
