import { getOrders, placeOrder } from "../controllers/order.contoller.js";
import {Router} from "express";

const router = Router()


router.route("/getOrders").get(getOrders)
router.route("/placeOrder").post(placeOrder)

export default router