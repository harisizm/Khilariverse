import transporter from '../config/emailConfig.js';

const sendOrderConfirmation = async (order, userEmail, userName) => {
    try {
        const mailOptions = {
            from: `"Khilariverse" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Order Confirmed! #${order._id.slice(-6).toUpperCase()}`,
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #000; padding: 20px; text-align: center;">
                    <h1 style="color: #ec008c; margin: 0;">KhilariVisuals</h1>
                </div>
                
                <div style="padding: 20px;">
                    <h2>Hi ${userName},</h2>
                    <p>Thank you for your purchase! We are getting your gear ready.</p>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Order ID:</strong> #${order._id.slice(-6).toUpperCase()}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Total Amount:</strong> $${order.amount}</p>
                    </div>

                    <h3>Items:</h3>
                    <ul style="padding-left: 20px;">
                        ${order.items.map(item => `
                            <li style="margin-bottom: 10px;">
                                <strong>${item.name}</strong> x ${item.quantity} - ${item.size || 'Standard'}
                            </li>
                        `).join('')}
                    </ul>

                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${process.env.FRONTEND_URL}/track-order/${order._id}" style="background-color: #ec008c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Track Your Order</a>
                    </div>
                </div>

                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>Need help? Contact us at support@khilariverse.com</p>
                    <p>&copy; ${new Date().getFullYear()} Khilariverse. All rights reserved.</p>
                </div>
            </div>
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            console.log(`Order confirmation sent to ${userEmail}`);
        } else {
            console.log("Email credentials missing. Skipping email send.");
        }

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export { sendOrderConfirmation };
