import transporter from '../config/emailConfig.js';

const sendOrderConfirmation = async (order, userEmail, userName) => {
    try {
        console.log(`[Email Service] Preparing Order Confirmation for: ${userEmail}`);
        
        // Ensure ID is a string to prevent .slice() crash
        const orderId = String(order._id);
        const orderDate = new Date(order.date).toLocaleDateString();

        const mailOptions = {
            from: `"Khilariverse" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Mission Accepted: Order #${orderId.slice(-6).toUpperCase()}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { margin: 0; padding: 0; background-color: #000000; font-family: 'Courier New', Courier, monospace; color: #ffffff; }
                    .container { max-width: 600px; margin: 20px auto; background-color: #050505; border: 2px solid #ff003c; box-shadow: 0 0 15px rgba(255, 0, 60, 0.3); }
                    .header { background-color: #000; padding: 30px; text-align: center; border-bottom: 2px solid #ff003c; }
                    .logo { color: #fff; font-size: 28px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0; }
                    .logo span { color: #ff003c; text-shadow: 0 0 10px #ff003c; }
                    .content { padding: 40px 30px; }
                    .greeting { font-size: 24px; margin-bottom: 20px; color: #ff003c; text-transform: uppercase; border-left: 5px solid #ff003c; padding-left: 15px; }
                    .order-card { background-color: #111; border: 1px solid #333; padding: 25px; margin: 20px 0; }
                    .order-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #222; padding-bottom: 10px; }
                    .order-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
                    .label { color: #aaa; text-transform: uppercase; font-size: 12px; }
                    .value { color: #fff; font-weight: bold; }
                    .items-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    .items-table th { text-align: left; color: #ff003c; padding: 10px; border-bottom: 1px solid #333; font-size: 12px; text-transform: uppercase; }
                    .items-table td { padding: 15px 10px; border-bottom: 1px solid #222; color: #fff; }
                    .btn { display: block; width: 200px; margin: 30px auto; background-color: #ff003c; color: #fff; text-align: center; padding: 15px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #ff003c; transition: all 0.3s; }
                    .btn:hover { background-color: #000; color: #ff003c; border: 1px solid #ff003c; }
                    .footer { text-align: center; padding: 30px; color: #666; font-size: 12px; border-top: 1px solid #222; background-color: #000; }
                    .highlight { color: #ff003c; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 class="logo">KHILARI<span>VERSE</span></h1>
                    </div>
                    
                    <div class="content">
                        <h2 class="greeting">MISSION CONFIRMED</h2>
                        <p style="color: #ddd;">Agent ${userName}, your gear request has been secured. We are preparing your loadout for immediate deployment.</p>
                        
                        <div class="order-card">
                            <div class="order-row">
                                <span class="label">Order ID</span>
                                <span class="value">#${orderId.slice(-6).toUpperCase()}</span>
                            </div>
                            <div class="order-row">
                                <span class="label">Date</span>
                                <span class="value">${orderDate}</span>
                            </div>
                            <div class="order-row">
                                <span class="label">Total Amount</span>
                                <span class="value highlight">$${order.amount}</span>
                            </div>
                        </div>

                        <h3 style="border-bottom: 1px solid #333; padding-bottom: 10px; margin-top: 30px; color: #fff;">LOADOUT DETAILS</h3>
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr>
                                        <td>
                                            <div style="font-weight: bold;">${item.name}</div>
                                            <div style="font-size: 12px; color: #888;">${item.size || 'Standard'}</div>
                                        </td>
                                        <td>${item.quantity}</td>
                                        <td>$${item.price}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <a href="${process.env.FRONTEND_URL}/track-order/${orderId}" class="btn">Track Status</a>
                    </div>

                    <div class="footer">
                        <p>DOMINATE THE GAME.</p>
                        <p>&copy; ${new Date().getFullYear()} KhilariVerse Systems.</p>
                        <p style="margin-top: 10px;"><a href="${process.env.FRONTEND_URL}" style="color: #666; text-decoration: none;">khilariverse.com</a></p>
                    </div>
                </div>
            </body>
            </html>
            `
        };

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("CRITICAL: Email credentials missing in .env");
            return;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Order Email sent successfully. MessageID: %s', info.messageId);

    } catch (error) {
        console.error("Error sending order email:", error);
    }
};

const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        console.log(`[Email Service] Preparing Welcome Email for: ${userEmail}`);
        
        const mailOptions = {
            from: `"Khilariverse" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Welcome to the Verse | 50% OFF UNLOCKED`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { margin: 0; padding: 0; background-color: #000000; font-family: 'Courier New', Courier, monospace; color: #ffffff; }
                    .container { max-width: 600px; margin: 20px auto; background-color: #050505; border: 2px solid #ff003c; box-shadow: 0 0 15px rgba(255, 0, 60, 0.3); }
                    .header { background-color: #000; padding: 30px; text-align: center; border-bottom: 2px solid #ff003c; }
                    .logo { color: #fff; font-size: 28px; font-weight: bold; letter-spacing: 4px; text-transform: uppercase; margin: 0; }
                    .logo span { color: #ff003c; text-shadow: 0 0 10px #ff003c; }
                    .hero { background-color: #1a1a1a; padding: 40px 20px; text-align: center; background-image: radial-gradient(circle, #222 1px, transparent 1px); background-size: 20px 20px; }
                    .welcome-text { font-size: 28px; font-weight: bold; color: #fff; text-transform: uppercase; margin: 0; text-shadow: 2px 2px 0px #ff003c; }
                    .content { padding: 40px 30px; text-align: center; }
                    .promo-box { background-color: #000; border: 2px solid #ff003c; color: #fff; padding: 20px; margin: 30px 0; box-shadow: 5px 5px 0px #ff003c; }
                    .promo-title { font-size: 24px; font-weight: bold; margin: 0; text-transform: uppercase; color: #ff003c; }
                    .promo-details { margin-top: 10px; font-size: 16px; }
                    .btn { display: inline-block; background-color: #ff003c; color: #fff; padding: 15px 40px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; transition: all 0.3s; margin-top: 20px; border: 1px solid #ff003c; }
                    .btn:hover { background-color: #000; color: #ff003c; box-shadow: 0 0 15px #ff003c; }
                    .products-grid { display: table; width: 100%; margin-top: 40px; border-collapse: separate; border-spacing: 10px; }
                    .product-cell { display: table-cell; width: 33%; vertical-align: top; }
                    .product-card { background: #111; padding: 15px; border: 1px solid #333; height: 100%; transition: border-color 0.3s; }
                    .product-card:hover { border-color: #ff003c; }
                    .product-icon { font-size: 24px; margin-bottom: 10px; display: block; }
                    .product-link { color: #888; text-decoration: none; font-size: 12px; text-transform: uppercase; display: block; margin-top: 5px; }
                    .product-link:hover { color: #ff003c; }
                    .footer { text-align: center; padding: 30px; color: #666; font-size: 12px; border-top: 1px solid #222; background-color: #000; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1 class="logo">KHILARI<span>VERSE</span></h1>
                    </div>
                    
                    <div class="hero">
                        <h2 class="welcome-text">WELCOME TO THE VERSE</h2>
                    </div>
                    
                    <div class="content">
                        <p style="font-size: 16px; line-height: 1.6; color: #ccc;">
                            Agent ${userName}, you have successfully initialized your account. 
                            The Verse awaits. Equip yourself with high-performance peripherals engineered for victory.
                        </p>
                        
                        <div class="promo-box">
                            <h3 class="promo-title">NEW RECRUIT OFFER</h3>
                            <div class="promo-details">GET 50% OFF YOUR FIRST ORDER</div>
                        </div>

                        <a href="${process.env.FRONTEND_URL}/shop" class="btn">INITIATE SHOPPING</a>

                        <div class="products-grid">
                            <div class="product-cell">
                                <div class="product-card">
                                    <span class="product-icon">⌨️</span>
                                    <div style="font-weight:bold; color:#fff;">KEYBOARDS</div>
                                    <a href="${process.env.FRONTEND_URL}/category/keyboards" class="product-link">View Tech ></a>
                                </div>
                            </div>
                            <div class="product-cell">
                                <div class="product-card">
                                    <span class="product-icon">🖱️</span>
                                    <div style="font-weight:bold; color:#fff;">MICE</div>
                                    <a href="${process.env.FRONTEND_URL}/category/mice" class="product-link">View Tech ></a>
                                </div>
                            </div>
                            <div class="product-cell">
                                <div class="product-card">
                                    <span class="product-icon">🎧</span>
                                    <div style="font-weight:bold; color:#fff;">AUDIO</div>
                                    <a href="${process.env.FRONTEND_URL}/category/headsets" class="product-link">View Tech ></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="footer">
                        <p>SYSTEM ONLINE.</p>
                        <p>&copy; ${new Date().getFullYear()} KhilariVerse Systems.</p>
                    </div>
                </div>
            </body>
            </html>
            `
        };

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("CRITICAL: Email credentials missing in .env");
            return;
        }

        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome Email sent successfully. MessageID: %s', info.messageId);

    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
};

const sendContactEmail = async (data) => {
    try {
        console.log(`[Email Service] Sending Contact Email from: ${data.email}`);

        const mailOptions = {
            from: `"Khilariverse Support" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to admin
            replyTo: data.email, // Allow replying to the user
            subject: `[Support Request] ${data.subject || 'New Message'} - ${data.name}`,
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #ff003c;">New Support Message</h2>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #ff003c;">
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Subject:</strong> ${data.subject}</p>
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${data.message}</p>
                </div>
                <p style="font-size: 12px; color: #666; margin-top: 20px;">Sent via Khilariverse Contact Form</p>
            </div>
            `
        };

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("CRITICAL: Email credentials missing in .env");
            return;
        }

        await transporter.sendMail(mailOptions);
        console.log('Contact Email sent successfully');
        return true;

    } catch (error) {
        console.error("Error sending contact email:", error);
        return false;
    }
};

export { sendOrderConfirmation, sendWelcomeEmail, sendContactEmail };
