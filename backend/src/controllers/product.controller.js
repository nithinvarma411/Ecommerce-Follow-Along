import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../models/Product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
    let { name, description, actualPrice, discountPrice, availableSizes } = req.body;

    if ([name, description].some((field) => field.trim() === "")) {
        return res.status(400).send({ message: "ALL FIELDS ARE REQUIRED" });
    }

    if (!(actualPrice && discountPrice)) {
        return res.status(400).send({ message: "ALL FIELDS ARE REQUIRED" });
    }

    if (typeof availableSizes === "string") {
        try {
            availableSizes = JSON.parse(availableSizes);
        } catch (error) {
            return res.status(400).send({ message: "INVALID FORMAT FOR AVAILABLE SIZES" });
        }
    }

    if (!Array.isArray(availableSizes) || availableSizes.some(size => typeof size !== "number")) {
        return res.status(400).send({ message: "AVAILABLE SIZES MUST BE AN ARRAY OF NUMBERS" });
    }

    if (!req.file) {
        return res.status(400).send({ message: "IMAGE IS REQUIRED" });
    }

    let image;

    try {
        image = await uploadOnCloudinary(req.file.path);
        if (!image) {
            return res.status(500).send({ message: "IMAGE UPLOAD FAILED" });
        }
    } catch (error) {
        console.log("Error in product.controller.js", error);
        return res.status(500).send({ message: "INTERNAL SERVER ERROR", error });
    }

    const newProduct = new Product({
        name,
        description,
        actualPrice,
        discountPrice,
        image,
        availableSizes,
        user: req.user._id
    });

    try {
        await newProduct.save();
        return res.status(201).send({ message: "PRODUCT CREATED", product: newProduct });
    } catch (error) {
        console.log("Error saving product", error);
        return res.status(500).send({ message: "FAILED TO SAVE PRODUCT", error });
    }
});

const getMyProducts = async (req, res) => {
    try {
      const products = await Product.find({ user: req.user._id });
      console.log("products", req.user._id);
      res.json(products);
    } catch (error) {
      console.error("Error fetching user products", error);
      res.status(500).json({ message: "Error fetching user products", error });
    }
  };

const editProducts = asyncHandler(async (req, res) => {
    try {
        const { name, image, description, actualPrice, discountPrice, availableSizes } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { name, image, description, actualPrice, discountPrice, availableSizes },
          { new: true }
        );
        res.json({ message: "Product updated", updatedProduct });
      } catch (error) {
        res.status(500).json({ message: "Error updating product" });
      }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
      }
});

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "ALL PRODUCTS", products });
    } catch (error) {
        res.status(500).json({ message: "Error fetching all products", error });
    }
});
export { createProduct, getMyProducts, editProducts, deleteProduct, getAllProducts };