# Khilariverse

**An E-commerce Store in MERN for Software Design and Architecture Semester Project.**

![Khilariverse Banner](frontend/src/assets/Screenshot%20(47).png)

## 🚀 Project Overview

**Khilariverse** is a specialized e-commerce platform designed for gamers, by gamers. Built with a "Cyberpunk / Neon-Noir" aesthetic, it offers a premium shopping experience for high-performance gaming peripherals like keyboards, mice, and headsets.

The project demonstrates a full-stack **MERN** (MongoDB, Express, React, Node.js) architecture, featuring a robust admin dashboard, secure authentication, and a dynamic, responsive user interface.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Notifications:** React Toastify
- **Charts:** Recharts (for Admin Analytics)
- **HTTP Client:** Axios

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Image Storage:** Cloudinary
- **Email Service:** Nodemailer (Gmail SMTP)
- **Security:** Bcryptjs

## ✨ Features

- **Storefront:**
  - Premium, neon-themed responsive UI.
  - Product filtering and categories (Keyboards, Mice, Headsets).
  - Dynamic "Add to Cart" and Cart Management.
  - Cash on Delivery (COD) order placement.
  - User Order History & Order Tracking.

- **Admin Dashboard:**
  - **Analytics:** Visual charts for sales, revenue, and user growth.
  - **Product Management:** Add, edit, remove products with image uploads.
  - **Order Management:** View orders, update status (Processing, Shipped, Delivered), and delete orders.
  - **Secure Admin Login:** Dedicated authentication for administrators.

- **Authentication & Security:**
  - User Signup/Login.
  - JWT-based protected routes.
  - Environment variable configuration for secrets.

- **Notifications:**
  - Automated Emails: Welcome emails, Order Confirmations, and Support inquiries.
  - Toast notifications for user actions (success/error feedback).

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB (Local or Atlas URL)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/harisizm/Khilariverse.git
cd Khilariverse
```

### 2. Backend Setup
The root directory serves as the backend.

```bash
# Install backend dependencies
npm install
```

**Create a `.env` file in the root directory** and add the following variables:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string

# Admin Credentials (for Admin Dashboard Access)
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret_key

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Nodemailer - Gmail App Password recommended)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend Connection (For Email Links)
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup
Navigate to the frontend folder.

```bash
cd frontend

# Install frontend dependencies
npm install
```

**Create a `.env` file in the `frontend` directory** to connect to the backend:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### 4. Running the Project

**Start the Backend:**
Return to the root directory and run:
```bash
# Development mode (with Nodemon)
npm run dev
# OR Production mode
npm start
```
*Server runs on http://localhost:4000*

**Start the Frontend:**
Open a new terminal, navigate to `frontend`, and run:
```bash
npm run dev
```
*Client runs on http://localhost:5173*

## 📂 Folder Structure

```
Khilariverse/
├── backend/               # Backend logic
│   ├── config/            # DB, Cloudinary, Email configs
│   ├── controllers/       # Route logic (User, Product, Order)
│   ├── middleware/        # Auth middlewares
│   ├── models/            # Mongoose Models
│   ├── routes/            # API Routes
│   ├── utils/             # Helpers (EmailService)
│   └── server.js          # Entry point
├── frontend/              # React App
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images, fonts
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Full pages (Home, Shop, Login)
│   │   ├── redux/         # State definitions
│   │   └── App.jsx        # Main component
├── .env                   # Environment variables (GitIgnored)
└── package.json           # Root dependencies
```
