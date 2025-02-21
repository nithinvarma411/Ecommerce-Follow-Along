import { getUserProfile } from "../controllers/profile.controller.js";

import { Router } from "express";

const router = Router();

router.route("/getUserProfile").get(getUserProfile);

export default router