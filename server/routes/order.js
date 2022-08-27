import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../middleware/middle.js";
import Order from './../models/Order.js';
const router = express.Router();

//CREATE

// async function getTransaction(bankdata){
//   const t = bankdata;
//   try {
//     const {data:response} = await axios.post('http://localhost:8000/transaction/payment',t).then(); //use data destructuring to get data from the promise object
//     return response
//   }
//   catch (error) {
//     console.log(error);
//   }
  
//   // // console.log(bankdata);
//   // let pp={};
//   // const { data} = await axios.post('http://localhost:8000/transaction/payment',t)
//   //   .then(response => {
//   //     // const {data} = response;
//   //     // console.log(data);
//   //     // pp=data;
//   //     response;
//   //   })
//   //   .catch(error => {
//   //     console.log(error);
//   //   });
//   //   console.log(data);
//   //   return pp;
  
// }

router.post("/", verifyToken, async (req, res) => {
  
  const {userId, products, amount, address, bankData} = req.body;

  // console.log(req.body);
  try {
    
    const newOrder = new Order({
      transactionId: bankData.transactionId,
      userId,
      products,
      amount,
      address,
    });
    // console.log(newOrder);
    const result = await newOrder.save();
    console.log(result);  
    } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", async (req, res) => {
  // console.log(req.params);
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.post("/allorders", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: previousMonth },
          ...(productId && {
            products: { $elemMatch: { productId } },
          }),
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
