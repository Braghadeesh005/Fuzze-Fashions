const express = require('express');
const cors = require("cors")
const app = express();
const dotenv = require('dotenv')
dotenv.config({path: './config.env' })
const passport = require("passport");
const passportStrategy = require("./passport");

const mongoose =require("mongoose")
const razorpay =require("razorpay");
const crypto =require("crypto")
dotenv.config();

// Google Auth - passport
app.use(passport.initialize());
 
//cors gateway to client
// app.use(cors());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "UPDATE", "DELETE"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//Connect to the DB
require('./db/dbconn');

//Router 
app.use(express.json());
app.use(express.urlencoded({extended:true}));




//Razorpay
const instance = new razorpay({
  key_id:process.env.KEY,
  key_secret:process.env.SECRET,
})

const paymentschema = new mongoose.Schema({
  razorpay_order_id:{
      type:String,
      required:true,
  },
  razorpay_payment_id:{
      type:String,
      required:true,
  },
  razorpay_signature:{
      type:String,
      required:true,
  },
}) 

const Payment =mongoose.model("Payment",paymentschema);

// checkout api
app.post("/checkout1",async(req,res)=>{

  const options ={
      amount:Number(req.body.amount*100),
      currency:"INR",
  };
  const order = await instance.orders.create(options);
  console.log("======================================");
  console.log(order);
  console.log("======================================");
  res.status(200).json({ 
      success:true,order
  })

})

// payemnt verification
app.post("/paymentverification",async(req,res)=>{
 const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
 const body = razorpay_order_id + "|" +razorpay_payment_id;
 const expectedsgnature =crypto.createHmac('sha256',process.env.SECRET).update(body.toString()).digest('hex')
 const isauth = expectedsgnature === razorpay_signature;
 if(isauth){
  await Payment.create({
      razorpay_order_id,razorpay_payment_id,razorpay_signature 
  })
  res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
 }
 else{
  res.status(400).json({success:false});
 }
})   

app.get("/api/getkey",(req,res)=>{
  return res.status(200).json({key:process.env.KEY})
})







const authRoute = require("./router/auth");
app.use("/", authRoute);











//Rendering Client
app.use(express.static("client/dist"));
app.get("/",function(req,res) {
    res.sendFile(path.join(__dirname, "./client/dist/index.html"));
})
                                 
//PORT
const PORT = 4000;
app.listen(PORT,()=>console.log(`Server Running on Port ${PORT}`)); 
console.log("========================"); 