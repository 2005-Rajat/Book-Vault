BookVault 📚✨

BookVault is a premium full-stack MERN E-Book Store built with MongoDB, Express.js, React.js, Node.js, and Vite. It allows users to browse, purchase, and read digital books online through a modern, responsive, and visually premium platform inspired by Kindle-style ecommerce experiences.

🚀 Live Features
👤 User Features
User Registration & Login (JWT Authentication)
Browse books by categories / genres
Search and filter books
View detailed book pages
Add books to cart
Premium checkout experience
Purchase books
Access purchased books in My Library
Read books online (PDF Reader)
Read sample preview
Order history
Wishlist support
🛒 Ecommerce Features
Dynamic shopping cart
Quantity controls
Coupon / discount system
Tax & order summary
Simulated premium payment gateway
Payment success flow
📚 Book Categories
Business & Finance
Self Help
Productivity
Psychology
Marketing
Technology
Entrepreneurship
Biography
Fiction
Health & Wellness
👑 Admin Features
Admin Dashboard
Add / Edit / Delete Books
Manage Orders
Manage Users
Sales Analytics
Upload Book Covers
🛠 Tech Stack
Frontend
React.js
Vite
React Router DOM
Context API
Axios
Tailwind CSS / Custom CSS
Framer Motion
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
bcryptjs
Multer
Deployment
Frontend: Render / Vercel
Backend: Render
Database: MongoDB Atlas
🎨 UI Theme

BookVault uses a Luxury Dark Theme with elegant gold accents for a premium reading-store experience.

Primary Background: #0f0f11
Gold Accent: #d4af37
Text: #ffffff
📂 Project Structure
BookVault/
│── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── services/
│
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── uploads/
│   └── server.js
⚙️ Installation & Setup
Clone Repository
git clone https://github.com/2005-Rajat/Book-Vault.git
cd Book-Vault
Backend Setup
cd backend
npm install
npm run dev

Create .env

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
Frontend Setup
cd frontend
npm install
npm run dev
🌐 Deployment
Backend

Deploy backend on Render as Web Service

Frontend

Deploy frontend on Render / Vercel as Static Site

📌 Future Improvements
Real Stripe / Razorpay Integration
EPUB Reader Support
AI Book Recommendations
Social Reviews
Reading Progress Sync
Mobile App Version
🎯 Purpose of Project

This project was built as a:

Full Stack MERN Portfolio Project
College Major Project
Recruiter Showcase Project
Real Startup MVP Prototype
