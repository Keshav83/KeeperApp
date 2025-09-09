<!-- =============================== -->
<!--           KEEPER APP            -->
<!-- =============================== -->

<p align="center">
  <img src="https://img.shields.io/badge/📝-Keeper%20App-ffca28?style=for-the-badge&logo=googlekeep&logoColor=black" alt="Keeper App"/>
</p>

<h1 align="center">✨ Keeper – Notes that Stay ✨</h1>

<p align="center">
  <i>A beautifully designed <b>Google Keep clone</b> built with love ♥<br>
  Modern UI · Smooth UX · Persistent Storage with MongoDB</i>
</p>

---

## 🌟 Features at a Glance

🔥 Sleek Google Keep–inspired interface  
🛡️ Choose between **LocalStorage** or **MongoDB** persistence  
⚡ Lightning-fast with **React + Vite** frontend  
🌐 **Express + Mongoose** backend with RESTful API  
🎨 UI/UX polished for clarity & productivity  
🪄 Dynamic onboarding: app asks if you want permanent storage at first run  

---

## 🚀 Quickstart Guide

### 1️⃣ Clone & Unpack
```bash
git clone https://github.com/your-username/keeper-app.git
cd keeper-app
2️⃣ Backend Setup
bash
Copy code
cd server
npm install
npm start
By default runs on http://localhost:5000.

3️⃣ Frontend Setup
bash
Copy code
cd 320-styling-the-keeper-app-starting
npm install
npm run dev
Runs on http://localhost:5173.

🗂 Storage Modes
<table align="center"> <tr> <td align="center"> <b>🌱 Local Mode</b> <br/> (quick & temporary) </td> <td align="center"> <b>🌳 MongoDB Mode</b> <br/> (permanent & scalable) </td> </tr> <tr> <td>
No setup required

Saves in browser localStorage

Perfect for drafts or testing

</td> <td>
Paste your Mongo URI (mongodb+srv://…)

Notes auto-sync to MongoDB

Safe across sessions & devices

</td> </tr> </table>
🎬 Live Flow Demo
<p align="center"> <img src="https://img.shields.io/badge/Add%20Note-43a047?style=for-the-badge&logo=react&logoColor=white" /> <img src="https://img.shields.io/badge/Delete%20Note-e53935?style=for-the-badge&logo=trash&logoColor=white" /> <img src="https://img.shields.io/badge/Switch%20to%20MongoDB-039be5?style=for-the-badge&logo=mongodb&logoColor=white" /> </p>
✍️ Create a new note

❌ Delete instantly with one click

🔄 Switch to Mongo mode anytime, migrate notes seamlessly

🛠️ Tech Stack
<p align="center"> <img src="https://skillicons.dev/icons?i=react,express,mongodb,nodejs,vite,git" /> </p>
Frontend: React + Vite + Tailwind CSS

Backend: Express.js + Mongoose

Database: MongoDB (Atlas ready)

Persistence: LocalStorage fallback

📦 Project Structure
plaintext
Copy code
keeper_project/
 ├── server/                 # Express + MongoDB backend
 │   ├── server.js
 │   ├── package.json
 │   └── .env (auto-generated after MongoDB config)
 │
 └── 320-styling-the-keeper-app-starting/   # React frontend
     ├── src/components/   # App.jsx, CreateArea.jsx, Note.jsx
     ├── package.json
     └── vite.config.js
📌 Roadmap
✅ Runtime MongoDB configuration via UI
✅ In-memory fallback when no DB is set
🔲 Static build serving directly from Express
🔲 Auto-sync LocalStorage → MongoDB migration
🔲 User authentication & multi-user notes

🤝 Contributing
We welcome PRs from the community 🌍

Fork it 🍴

Create your feature branch 🌿

Commit with style 💅

Open a pull request 🚀

📜 License
Licensed under the MIT License.
Feel free to use, modify, and share Keeper.

<p align="center"> Crafted with ✨ by <b>The Keeper Dev Team</b> · <a href="#">Say hi 👋</a> </p> ```
