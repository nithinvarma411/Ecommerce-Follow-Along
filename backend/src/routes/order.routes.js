import { getOrders, placeOrder, cancelOrder } from "../controllers/order.contoller.js";
import {Router} from "express";

const router = Router()

router.route("/getOrders").get(getOrders)
router.route("/placeOrder").post(placeOrder)
router.route("/cancel/:id").delete(cancelOrder)

export default router