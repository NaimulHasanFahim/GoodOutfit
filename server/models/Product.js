import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
    supplierId: {type: String,  required: true},
    supplerProdId: {type: String,  required: true},
    supplierBankId : {type: String,  required: true}
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
