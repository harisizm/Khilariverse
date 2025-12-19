import transporter from '../config/emailConfig.js';

const sendOrderConfirmation = async (order, userEmail, userName) => {
    try {
        console.log(`Attempting to send Order email to: ${userEmail}`);
        
        const mailOptions = {
            from: `"Khilariverse" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Order Confirmed! #${order._id.slice(-6).toUpperCase()}`,
            html: `... (same html content) ...` // Keeping content logic same, just updating wrapper for brevity in diff if needed, but here I will reuse existing html structure for stability.
            // Wait, I need to provide the full HTML again since I am replacing the block or just use the same concept. 
            // Better to just add the LOGGING at start and finish.
        };
        // Re-implementing full HTML to ensure no loss
         mailOptions.html = `
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
            `;


        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("CRITICAL: Email credentials missing in .env");
            return;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Order Email sent: %s', info.messageId);

    } catch (error) {
        console.error("Error sending order email:", error);
    }
};

const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        console.log(`Attempting to send Welcome email to: ${userEmail}`);
        
        const mailOptions = {
            from: `"Khilariverse" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Welcome to the Verse!`,
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #000; padding: 20px; text-align: center;">
                    <h1 style="color: #ec008c; margin: 0;">KhilariVisuals</h1>
                </div>
                
                <div style="padding: 20px; text-align: center;">
                    <h2 style="color: #000;">Welcome, ${userName}!</h2>
                    <p style="font-size: 16px; line-height: 1.5;">You have successfully joined the elite league of gamers. Get ready to dominate with premium gear.</p>
                    
                    <a href="${process.env.FRONTEND_URL}/shop" style="display: inline-block; margin: 20px 0; background-color: #ec008c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 18px;">EXPLORE PRODUCTS</a>

                    <div style="margin-top: 40px; text-align: left;">
                        <h3 style="border-bottom: 2px solid #ec008c; padding-bottom: 10px; display: inline-block;">Top Picks For You</h3>
                        
                        <div style="display: flex; gap: 15px; margin-top: 20px; flex-wrap: wrap;">
                            <!-- Mock Product 1 -->
                            <div style="flex: 1; min-width: 120px; border: 1px solid #eee; padding: 10px; border-radius: 5px; text-align: center;">
                                <div style="background-color: #f5f5f5; height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">🎮</div>
                                <p style="font-weight: bold; font-size: 14px; margin: 5px 0;">Mechanical Keyboards</p>
                                <a href="${process.env.FRONTEND_URL}/category/keyboards" style="color: #ec008c; font-size: 12px; text-decoration: none;">View Collection</a>
                            </div>

                            <!-- Mock Product 2 -->
                            <div style="flex: 1; min-width: 120px; border: 1px solid #eee; padding: 10px; border-radius: 5px; text-align: center;">
                                <div style="background-color: #f5f5f5; height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">🖱️</div>
                                <p style="font-weight: bold; font-size: 14px; margin: 5px 0;">Pro Gaming Mice</p>
                                <a href="${process.env.FRONTEND_URL}/category/mice" style="color: #ec008c; font-size: 12px; text-decoration: none;">View Collection</a>
                            </div>

                             <!-- Mock Product 3 -->
                            <div style="flex: 1; min-width: 120px; border: 1px solid #eee; padding: 10px; border-radius: 5px; text-align: center;">
                                <div style="background-color: #f5f5f5; height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">🎧</div>
                                <p style="font-weight: bold; font-size: 14px; margin: 5px 0;">Headsets</p>
                                <a href="${process.env.FRONTEND_URL}/category/headsets" style="color: #ec008c; font-size: 12px; text-decoration: none;">View Collection</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                    <p>&copy; ${new Date().getFullYear()} Khilariverse. All rights reserved.</p>
                </div>
            </div>
            `
        };

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("CRITICAL: Email credentials missing in .env");
            return;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome Email sent: %s', info.messageId);

    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

export { sendOrderConfirmation, sendWelcomeEmail };
