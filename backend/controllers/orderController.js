import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { sendOrderConfirmation } from "../utils/emailService.js";

// Placing orders using COD Method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Cleanup legacy Stripe index if it exists (Fix "duplicate key" error)
        try {
            await orderModel.collection.dropIndex('stripeSessionId_1');
        } catch (error) {
            // Index doesn't exist or already dropped, ignore
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Send Confirmation Email
        // Use the email from the shipping address if available, otherwise fallback to account email
        const user = await userModel.findById(userId);
        const emailToSend = address.email || (user ? user.email : null);
        const nameToSend = address.firstName || (user ? user.name : 'Customer');

        if (emailToSend) {
            await sendOrderConfirmation(newOrder, emailToSend, nameToSend);
        }

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// User Orders Data For Frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: 'Status Updated' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { placeOrder, allOrders, userOrders, updateStatus }
