// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
import cryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email} = req.body;
  //console.log(req.body);
  
  try {
    const existingUser = await User.findOne({ email });
    // console.log(existingUser);
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "Please log in with a registered email." });

    const hashedPassword = cryptoJs.AES.decrypt(
      existingUser.password,
      process.env.PASS_SECRET
    );
    
    const OriginalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
    
    if (OriginalPassword != req.body.password)
      return res.status(401).json({ message: "Invalid credintials." });
    
      const token = jwt.sign(
      {
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    //console.log(token);
    //console.log(existingUser);
    // const { username, email,  } = existingUser;
    if(existingUser){
      const {_id,firstName,lastName,username,email,password,image,isAdmin,bankid} = existingUser;
      res.status(200).json({_id,firstName,lastName,username,email,password,image,isAdmin,bankid, token});
    }
    else{
      res.status(500).json({ message: "No user with this email!" });  
    }
  } catch (error) {
    //   res.status(500).json(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword, bankid, bankpass } =
    req.body;
    // console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = cryptoJs.AES.encrypt(
      password,
      process.env.PASS_SECRET
    ).toString();
    ///console.log(hashedPassword);
    // const hashedBankid = cryptoJs.AES.encrypt(
    //   bankpass,
    //   process.env.PASS_SECRET
    // ).toString();



    const result = await User.create({
      firstName, 
      lastName,
      email,
      password: hashedPassword,
      username,
      bankid,
      bankpass,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    ///console.log(result);
    try {
      const {firstName, lastName, email, username, bankid, isAdmin, _id , image,bankpass} = result;    
      return res.status(200).json({ firstName, lastName, email, username, bankid, isAdmin, _id , image,bankpass, token });
    } catch (error) {
      console.log(error.message);
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
