import express from "express";
import { verifyTokenAndAdmin } from "../middleware/middle.js";
import Product from "./../models/Product.js";
const router = express.Router();

//CREATE

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const {
    title,
    desc,
    img,
    supplierId,
    supplerProdId,
    categories,
    size,
    color,
    inStock,
    price,
    supplierBankId
  } = req.body;
  try {
    const newProduct = new Product({
      title,
      desc,
      img,
      supplierId,
      supplerProdId,
      supplierBankId,
      categories,
      size,
      color,
      inStock,
      price,
    });
   
    const savedProduct = await newProduct.save();
    return res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
});

//DELETE
router.post("/delete", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.productId);
    return res.status(200).json("Product has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
   
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
