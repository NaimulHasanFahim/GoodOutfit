import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bankid : { type: String, required: true },
    bankpass :{ type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
