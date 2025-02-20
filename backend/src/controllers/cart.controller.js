import { Cart } from "../models/Cart.model.js";
import { Product } from "../models/Product.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addToCart = asyncHandler(async (req, res) => {
    const { size, quantity } = req.body;
    const { productId } = req.params;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId && item.size === size
    );

    if (existingProductIndex > -1) {
        cart.products[existingProductIndex].quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity, size });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
});

const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate("products.product");
    if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart found", cart });
});

export { addToCart, getCart };
