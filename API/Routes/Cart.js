import express from "express";
import { addToCart, clearCart, decreaseQty, removeFromCart, userCart } from "../Controllers/Cart.js";

import { Authenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/add", Authenticated, addToCart);

router.get("/user", Authenticated, userCart);

router.delete("/remove/:productId", Authenticated,removeFromCart);

router.delete("/clear",Authenticated, clearCart);

router.delete("/--quantity",Authenticated, decreaseQty);

export default router;