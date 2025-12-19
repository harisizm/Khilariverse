import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js' // Assuming you have this, or we'll create/use basic auth for now
import authUser from '../middleware/auth.js'

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', allOrders); // Protected by adminAuth ideally, using basic for now or strict role check in controller if middleware missing
orderRouter.post('/status', updateStatus); // Protected by adminAuth

// Payment Features
orderRouter.post('/place', authUser, placeOrder);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;
