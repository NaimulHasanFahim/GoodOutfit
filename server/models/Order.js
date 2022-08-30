import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId, ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
        delivery: {
          type: String,
          default: "Pending",
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
    transactionId : {type : String, required: true},
    supplierTransactionId : [
      {
        productId : {type : String},
        transactionId :{type : String}
      }],
    supplierPaid : {type: Boolean, default: false},
    userTransactionVerified : {type: Boolean, default: false}
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
