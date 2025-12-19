import nodemailer from 'nodemailer';

// Create Transporter
// NOTE: User must provide EMAIL_USER and EMAIL_PASS (App Password) in .env
const transporter = nodemailer.createTransport({
    service: 'gmail', // or use 'smtps' for other providers
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export default transporter;
