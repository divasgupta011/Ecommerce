import express from "express";
import { addAddress, getAddress } from "../Controllers/Address.js";
import { Authenticated } from "../Middlewares/Auth.js";

const router = express.Router();

router.post("/add", Authenticated , addAddress);

router.get("/get", Authenticated, getAddress);

export default router;