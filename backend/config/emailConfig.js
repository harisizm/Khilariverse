import nodemailer from 'nodemailer';

// Create Transporter
// NOTE: User must provide EMAIL_USER and EMAIL_PASS (App Password) in .env
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export default transporter;
