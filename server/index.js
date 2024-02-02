const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// All Routers
const authRouter = require("./routes/auth.route");
const mobileRouter = require("./routes/mobile.route");
const favoriteRouter = require("./routes/favorite.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");

// App initiate

const app = express();
const corsOptions = {
  origin: true,
  Credential: true,
};

// Connect to db

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Data base is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

// Middleware

dotenv.config();
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mobiles", mobileRouter);
app.use("/api/v1/favorite", favoriteRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// Connect to server
app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`App is running on port ${process.env.PORT}`);
});
