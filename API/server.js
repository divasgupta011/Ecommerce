import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import userRouter from './Routes/User.js';
import productRouter from './Routes/Products.js';
import cartRouter from './Routes/Cart.js';
import addressRouter from './Routes/Address.js';
import cors from 'cors';
const app = express();

app.use(bodyParser.json());

app.use(cors({
    origin:true,
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials:true
}))

mongoose.connect("mongodb+srv://divasgupta010:KDJH3GUbbaXyF47o@cluster0.h1nsoxv.mongodb.net/", {
    dbName:"Ecommerce",
}).then(()=>console.log("MongoDB connected successfully ......")).catch((err)=>console.log(err));

const port = 1000;

app.get("/", async (req, res) => {
    res.json({message: "I am at home page"});
});

app.use("/api/user", userRouter);

app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter);

app.use("/api/address", addressRouter);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});