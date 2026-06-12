# 🚀 MediQueue

> A modern healthcare appointment and tutor management platform built with Next.js, designed for performance, scalability, and an exceptional user experience.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)

---

## 📖 Overview

MediQueue is a full-stack healthcare management platform that enables users to:

* 🏥 Book and manage appointments
* 👨‍⚕️ Connect with healthcare professionals
* 📅 Track appointment schedules
* 🔐 Secure authentication & authorization
* 📱 Fully responsive user experience
* ⚡ Fast and optimized performance

---

## ✨ Features

### 👤 Authentication

* Email & Password Login
* Google Authentication
* JWT-based Authorization
* Protected Routes
* Session Management

### 🏥 Healthcare Management

* Add & Manage Tutors
* Appointment Booking
* User Dashboard
* Role-based Access Control

### 🎨 User Experience

* Responsive Design
* Toast Notifications
* Loading States
* Error Handling
* Modern UI Components

### 🔒 Security

* Password Hashing with bcrypt
* JWT Authentication
* Protected API Routes
* Secure Environment Variables

---

## 🛠️ Tech Stack

### Frontend

| Technology        | Purpose              |
| ----------------- | -------------------- |
| ⚛️ React          | UI Development       |
| ▲ Next.js         | Full Stack Framework |
| 🎨 Tailwind CSS   | Styling              |
| 🔔 React Toastify | Notifications        |
| 📦 Axios          | API Requests         |

### Backend

| Technology    | Purpose           |
| ------------- | ----------------- |
| 🟢 Node.js    | Runtime           |
| 🚀 Express.js | Server            |
| 🍃 MongoDB    | Database          |
| 🔑 JWT        | Authentication    |
| 🔐 bcrypt     | Password Security |

### Deployment

| Platform         | Usage            |
| ---------------- | ---------------- |
| ▲ Vercel         | Frontend Hosting |
| 🚀 Vercel/Render | Backend Hosting  |
| ☁️ MongoDB Atlas | Cloud Database   |

---

## 📂 Project Structure

```bash
mediqueue/
│
├── app/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── page.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── UI/
│
├── hooks/
│
├── lib/
│
├── public/
│
├── services/
│
├── middleware.js
│
├── .env.local
│
└── package.json
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/mediqueue.git
```

### 2️⃣ Navigate to Project

```bash
cd mediqueue
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Setup Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000

GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

JWT_SECRET=your_secret_key
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

## 🚀 Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment

### Deploy Frontend

```bash
Vercel
```

### Deploy Backend

```bash
Vercel / Render
```

### Database

```bash
MongoDB Atlas
```

---

## 📸 Screenshots

### Home Page

Add Screenshot Here

### Dashboard

Add Screenshot Here

### Appointment Page

Add Screenshot Here

---

## 🔑 Environment Variables

Frontend:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
```

Backend:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

---

## 📈 Performance

* ⚡ Server Side Rendering
* ⚡ Optimized Images
* ⚡ Dynamic Imports
* ⚡ Route Protection
* ⚡ SEO Friendly

---

## 🧪 Available Scripts

```bash
npm run dev
```

Runs development server.

```bash
npm run build
```

Builds production application.

```bash
npm run start
```

Starts production server.

```bash
npm run lint
```

Runs ESLint.

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 👨‍💻 Author

**Shawon Ahmed**

* Full Stack Developer
* JavaScript Enthusiast
* Next.js Developer

---

## ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

---

<p align="center">
Made with ❤️ using Next.js, MongoDB, Express & React
</p>
