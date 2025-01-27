import { createProduct } from "../controllers/product.controller.js";
import { Router } from 'express';
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/createProduct").post(upload.single("image"),createProduct);

export default router