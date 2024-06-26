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
  
  const {userId, products, amount, address, transactionId} = req.body;
  try {
    
    const newOrder = new Order({
      transactionId: transactionId,
      userId,
      products,
      amount,
      address,
    });
    const result = await newOrder.save();
    } catch (err) {
    res.status(500).json(err);
  }
});

// const {ecom_orderId, status, productId} = req.body;
//   console.log(req.body);
//   try {
//     const doc = await Order.find({_id : ecom_orderId, "products.productId" : productId});
//     console.log(doc);

//     doc.products.map((temp)=>{
//       console.log(temp);
//       if(temp.productId == productId){
//         temp.status = status;
//       }
//     });

//     console.log(doc);
//     await doc.save();
//     return res.status(200).json(doc);
//   } catch (err) {
//     res.status(500).json(err);
//   }

router.post("/update/delivery", verifyTokenAndAdmin, async (req, res) => {
  const {ecom_orderId, status, productId} = req.body;
  // console.log(status);
  try{
    const updatedOrder = await Order.findOne({_id : ecom_orderId, "products.productId" : productId});
    // updatedOrder.map((single)=>{
    //   single.products.map((temp)=>{
    //     // console.log(temp);
    //     if(temp.productIdStr == productId){
    //       temp.delivery = status;
    //       console.log(temp.delivery);
    //       // console.log(temp);
    //   }});
    // })

    updatedOrder.products.map((temp)=>{
      if(temp.productIdStr == productId){
        temp.delivery = status;
    }});
    const newOr = await updatedOrder.save();
    return res.status(200).json(updatedOrder[0]);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.post("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  const updatedData = req.body.updatedData;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedData,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const temp = await Order.findById(req.params.id).populate('products.productId');
    
    return res.status(200).json(temp);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

//UPDATE USER TRANSACTION ID VERIFICATION
router.post("/verify/usertransaction/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await Order.findByIdAndUpdate(id, { userTransactionVerified: true }, { new: true }); 
    return res.status(200).send("Update Successfull");
  } catch (error) {
    res.status(500).json(error.message);
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
  try {
    // const orders = await Order.find({ userId: req.params.userId });
    let temp="";
    Order.find({userId: req.params.userId})
      .populate("products.productId")
      .exec(function (err, all_transaction) {
        if (err){
          console.log(err);
        }
        temp = all_transaction;
        return res.status(200).json(temp);
      });

    // return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/allorders", async (req, res) => {
  try {
    // const orders = await Order.find({ userId: req.params.userId });
    let temp="";
    Order.find()
      .populate("products.productId")
      .exec(function (err, all_transaction) {
        if (err){
          console.log(err);
        }
        temp = all_transaction;
        return res.status(200).json(temp);
      });

    // return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


// //GET ALL

router.post("/allorders", async (req, res) => {
  try {
    let temp={};
    const tt = await Order.find();
    Order.find()
      .populate("products.productId")
      .exec(function (err, all_transaction) {
        temp = all_transaction;
      });
    return res.status(200).json(temp);
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
