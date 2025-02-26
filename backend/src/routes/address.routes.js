import { uploadAdress, getUserAddresses } from "../controllers/user.controller.js";

import { Router } from "express";

const router = Router();

router.route("/uploadAdress").put(uploadAdress);
router.route("/addresses").get(getUserAddresses)

export default router