import { createProduct, getMyProducts , editProducts, deleteProduct, getAllProducts } from "../controllers/product.controller.js";
import { Router } from 'express';
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/createProduct").post(upload.single("image"), createProduct);
router.route("/myProducts").get(getMyProducts);
router.route("/getAllProducts").get(getAllProducts);
router.route("/edit/:id").put(upload.single("image"), editProducts);
router.route("/delete/:id").delete(deleteProduct);

export default router