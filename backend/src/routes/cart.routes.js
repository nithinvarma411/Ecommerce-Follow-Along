import { addToCart, getCart, updateCartQuantity } from "../controllers/cart.controller.js";

import { Router } from "express";

const router = Router();
router.route("/add/:productId").post(addToCart);
router.route("/getCart").get(getCart);
router.route("/update/:productId").put(updateCartQuantity);

export default router