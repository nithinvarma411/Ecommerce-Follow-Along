import { Order } from "../models/order.model.js";

const placeOrder = async(req, res) => {
    try {
        const { products, address, price, quantity } = req.body;
        const userId = req.user.id;
    
        const order = new Order({ products, address, price, quantity, user: userId });
        await order.save();
    
        res.json({ message: "Order placed successfully!", order });
    } catch (error) {
        res.status(500).json({ message: "Error placing order", error });
    }
}

const getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ user: userId }).populate("products.product");
    
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

export {getOrders, placeOrder}