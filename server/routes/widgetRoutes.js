import express from "express";
import { verifyTokenAndAdmin } from "../middleware/middle.js";
import User from "../models/User.js";
import Order from "./../models/Order.js";
import Product from "./../models/Product.js";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const widgetDetails = {
        numOfUsers : 0,
        numOfOrders : 0,
        earning : 0,
        numOfProducts: 0
    };
    try {
    const users = await User.find();
    const orders = await Order.find();
    const products = await Product.find();
    widgetDetails.numOfUsers=users.length;
    widgetDetails.numOfOrders=orders.length;
    widgetDetails.numOfProducts=products.length;
    res.status(200).json(widgetDetails);
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
