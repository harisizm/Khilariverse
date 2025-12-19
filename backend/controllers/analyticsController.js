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

        // Calculate Total Sales
        const totalSales = orders.reduce((acc, order) => {
            return order.payment ? acc + order.amount : acc;
        }, 0);

        // Prep data for Graph (Last 5 orders or grouped by day? Let's do simple order list for now or dummy graph data if too complex)
        // Better: Group orders by date for the graph 'Sales vs Date'
        // Let's create a map of last 7 days sales
        const salesDataMap = {};
        orders.forEach(order => {
            if (order.payment) {
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
                totalSales,
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
