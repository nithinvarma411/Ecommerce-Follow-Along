import { addToCart, getCart } from "../controllers/cart.controller.js";

import { Router } from "express";

const router = Router();
router.route("/add/:productId").post(addToCart);
router.route("/getCart").get(getCart);

export default router