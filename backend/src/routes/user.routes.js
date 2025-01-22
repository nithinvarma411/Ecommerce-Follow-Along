import { registerUser, loginUser } from "../controllers/user.controller.js";

import { Router } from "express";

const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);

export default router;