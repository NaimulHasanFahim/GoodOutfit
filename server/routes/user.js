import express from "express";
import jwt from "jsonwebtoken";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/middle.js";
import User from "../models/user.js";
const router = express.Router();

//UPDATE
router.post("/:id", async (req, res) => {
  const {bankid, password} = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        bankid : bankid,
        bankpass : password
      },
      { new: true }
    );
    console.log(updatedUser);
    const token = jwt.sign(
      {
        id: updatedUser._id,
        isAdmin: updatedUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" });
      console.log(token);
      if(updatedUser){
        const {_id,firstName,lastName,username,email,password,image,isAdmin,bankid} = updatedUser;
        res.status(200).json({_id,firstName,lastName,username,email,password,image,isAdmin,bankid, token});
      }
      else{
        res.status(500).json({ message: "No user with this email!" });  
      }
      
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.post("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    console.log(others);
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL USER
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  
  // console.log(req.body);

  // try {
  //   const users = query
  //     ? await User.find().sort({ _id: -1 }).limit(5)
  //     : await User.find();
  //   res.status(200).json(users);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
