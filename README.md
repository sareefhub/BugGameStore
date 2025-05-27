![Image](https://github.com/user-attachments/assets/65a6cc94-5b05-427d-865a-212c20b89d8c)

# 🎮 BugGameStore

A modern game store web application for browsing, purchasing, and managing digital games.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-green.svg)](https://nodejs.org/)

---

## ✨ Features

- 🎯 **Game Catalog** - Browse extensive collection of games
- 🛒 **Shopping Cart** - Add games to cart and checkout
- 👤 **User Authentication** - Secure login and registration
- 💳 **Payment Integration** - Safe and secure payment processing
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⭐ **Reviews & Ratings** - User reviews and game ratings
- 🔍 **Search & Filter** - Find games by genre, price, rating
- 📊 **Admin Dashboard** - Manage games, users, and orders

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- CSS3/SCSS
- JavaScript ES6+

**Backend:**
- Node.js
- Express.js
- MongoDB/MySQL

**Tools:**
- Git
- npm/yarn

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sareefhub/BugGameStore.git
   cd BugGameStore
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend environment
   cd backend
   cp .env.example .env
   # Edit .env file with your configuration

   # Frontend environment
   cd ../frontend
   cp .env.example .env
   # Edit .env file with your API endpoints
   ```

4. **Run the application**
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend (in new terminal)
   cd frontend
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 📁 Project Structure

```
BugGameStore/
├── frontend/                 # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS/SCSS files
│   │   └── utils/          # Utility functions
│   └── package.json
│
├── backend/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── config/           # Configuration files
│   └── package.json
│
└── README.md
```

---

## 🎯 Usage

### For Customers
1. **Browse Games** - Explore our game catalog
2. **Search & Filter** - Find games by your preferences
3. **Add to Cart** - Select games you want to purchase
4. **Checkout** - Complete your purchase securely
5. **Download** - Access your purchased games

### For Admins
1. **Dashboard Access** - Login with admin credentials
2. **Manage Games** - Add, edit, or remove games
3. **User Management** - Handle user accounts
4. **Order Tracking** - Monitor sales and transactions

---

## 🔧 Configuration

### Backend Environment Variables
```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_CONNECTION_STRING=your_database_url

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

# Payment (Example: Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend Environment Variables
```env
# API
REACT_APP_API_URL=http://localhost:5000/api

# Payment
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sareef Hub**
- GitHub: [@sareefhub](https://github.com/sareefhub)

---

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern game distribution platforms
- Built with ❤️ for the gaming community

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

</div>
