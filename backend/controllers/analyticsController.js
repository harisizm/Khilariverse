import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// Get Dashboard Data
const getDashboardStats = async (req, res) => {
    try {
        // Parallel queries for efficiency
        const [users, products, orders] = await Promise.all([
            userModel.find({}),
            productModel.find({}),
            orderModel.find({})
        ]);

        const totalUsers = users.length;
        const totalProducts = products.length;
        const totalOrders = orders.length;

        // Calculate Total Sales (Only Delivered)
        const totalSales = orders.reduce((acc, order) => {
            return (order.payment || order.status === 'Delivered') ? acc + order.amount : acc; 
            // Wait, request said "whenever status marked as delivered, add...". 
            // Usually 'payment' is true for online, but COD depends on delivery.
            // Let's stick strict: Only if Status is 'Delivered'.
            // Actually, if paid online, it's sales? 
            // User request: "whenever status marked delivered add data into sales graph". 
            // So Strict 'Delivered'.
        }, 0);
        
        // Strict Delivered calculation for Total Sales
        const deliveredSales = orders.reduce((acc, order) => {
             // Check if Delivered
             if (order.status === 'Delivered') {
                 return acc + order.amount;
             }
             return acc;
        }, 0);

        // Prep data for Graph (Sales vs Date) - Only Delivered
        const salesDataMap = {};
        orders.forEach(order => {
            if (order.status === 'Delivered') {
                const date = new Date(order.date).toLocaleDateString();
                salesDataMap[date] = (salesDataMap[date] || 0) + order.amount;
            }
        });

        // Convert map to array for Recharts
        const graphData = Object.keys(salesDataMap).map(date => ({
            name: date,
            sales: salesDataMap[date]
        }));


        res.json({
            success: true,
            stats: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalSales: deliveredSales,
            },
            graphData,
            recentOrders: orders.slice(-5).reverse() // Last 5 orders
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { getDashboardStats };
