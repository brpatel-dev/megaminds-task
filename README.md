# 📚 Full Stack Book Management App

This is a **Full Stack Book Management Application** built using **Next.js (Frontend)** and **Node.js, Express, MongoDB (Backend)**. It allows users to register, log in, and manage books.

---

## 🌍 Live Demo
🔗 **Frontend**: [Vercel Deployment Link](https://frontend.vercel.app)  
🔗 **Backend**: [Vercel Deployment Link](https://backend.vercel.app)

---

---

## 🚀 Tech Stack
### **Frontend**
- Next.js (React Framework)
- Material-UI (For UI components)
- Redux Toolkit (State Management)
- Axios (API Calls)

### **Backend**
- Node.js (Runtime)
- Express.js (Backend Framework)
- MongoDB Atlas (Database)
- Mongoose (MongoDB ODM)
- JSON Web Token (JWT) (Authentication)
- Cors & Dotenv (Security & Config)

---

# 🛠️ Installation & Setup
Follow these steps to set up the project **locally**.

---

## 🖥️ 1. Clone this Repository

## 💻 2. Backend Setup
```sh
cd ../backend
npm install
```

### 🔑 2.1 Create `.env` file in `/backend`
Paste the following into `.env` (Replace values with your own):
```env
MONGO_URI=mongodb+srv://your-db-user:your-db-password@cluster.mongodb.net/your-db-name
```

### 🚀 2.2 Start Backend
```sh
npm start
```
Backend runs on: **http://localhost:5000**

---

## 💻 3. Frontend Setup
```sh
cd ../frontend
npm install
```

### 🔑 3.1 Create `.env` file in `/frontend`
Paste the following:
```env
NEXT_PUBLIC_API_URL=https://backend.vercel.app
```

### 🚀 3.2 Start Frontend
```sh
npm run dev
```
Frontend runs on: **http://localhost:3000**

---

# 🛠️ API Endpoints
## **Auth Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login user & get token |

## **Book Routes**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/books` | Get all books |
| POST   | `/books` | Add a new book |
| PUT   | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete a book |