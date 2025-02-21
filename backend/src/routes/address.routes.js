import { uploadAdress } from "../controllers/user.controller.js";

import { Router } from "express";

const router = Router();

router.route("/uploadAdress").put(uploadAdress);

export default router