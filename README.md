<!-- Banner -->
<p align="center">
  <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/googlekeep.svg" width="80" alt="Keeper Logo"/>
</p>

<h1 align="center">Keeper App ✨</h1>

<p align="center">
  <b>A minimalist yet powerful note-taking app</b><br/>
  Inspired by Google Keep · Built with React, Express & MongoDB
</p>

---

## 🌈 Overview

Keeper is more than just a to-do list.  
It’s a **beautiful, distraction-free space** to capture your thoughts, reminders, and ideas — and keep them safe locally or in the cloud.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🖋️ Minimal UI | Clean, clutter-free design focused on your notes |
| 🔄 Dual Storage | Choose between **LocalStorage** (temporary) or **MongoDB** (permanent) |
| ⚡ Blazing Fast | React + Vite frontend with live updates |
| ☁️ Cloud Ready | Easily connect your own MongoDB Atlas cluster |
| 🔐 Your Data | Local mode keeps everything on your device |

---

## 🛠 Tech Stack

- **Frontend:** React · Vite · TailwindCSS  
- **Backend:** Node.js · Express  
- **Database:** MongoDB (via Mongoose)  
- **Styling:** Modern glassmorphism design  

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/keeper-app.git
cd keeper-app
1. Start the backend
bash
Copy code
cd server
npm install
npm start
Runs at http://localhost:5000

If you want permanent storage, set your MongoDB connection:

bash
Copy code
export MONGO_URI="your-mongo-uri"
npm start
2. Start the frontend
bash
Copy code
cd 320-styling-the-keeper-app-starting
npm install
npm run dev
Runs at http://localhost:5173
```
🔧 Configuration
When the app launches:

You’ll be prompted whether to store notes locally or permanently in MongoDB.

If you choose MongoDB, paste your connection string and the app will handle the rest.
```bash
🗂 Project Structure
bash
Copy code
keeper_project/
│
├── server/                         # Express API + MongoDB
│   ├── server.js
│   └── .env
│
└── 320-styling-the-keeper-app-starting/  # React frontend
    └── src/components/
```
🛣️ Roadmap
 Local & MongoDB storage modes

 Fancy UI with glassmorphism

 Dark/Light mode toggle

 Tagging & search notes

 Deploy full-stack app on one server

🤝 Contributing
We love your input!
Fork the repo, create a branch, and open a pull request. 🎉
