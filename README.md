📘 Smart Study Scheduler

A productivity web application that helps students plan, track, and optimize their study sessions with goals, Pomodoro timer, progress tracking, and subject-based analytics.

🚀 Features

🔐 Authentication – Secure signup & login with JWT.
🎯 Daily Goals Tracking – Set, complete, and reset goals daily.
⏱️ Pomodoro Timer – Stay productive with work/break cycles, synced across devices.
📅 Study Plan Editor – Add, edit, and manage tasks for each subject.
📊 Progress Tracker – Visualize daily and weekly performance.
📚 Subject-wise Progress – Charts showing study effort per subject.
🌐 Cross-device Sync – All progress is stored in backend & persists across sessions.

🛠️ Tech Stack

Frontend

React.js (with Hooks & Context API).
TailwindCSS (UI styling).
Recharts (Data visualization).

Backend

Node.js & Express.js.
MongoDB + Mongoose (Database).
JWT Authentication.
REST API architecture.

⚙️ Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/yourusername/smart-study-scheduler.git
cd smart-study-scheduler

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/ with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key


Run the backend:

npm start

3️⃣ Frontend Setup
cd frontend
npm install
npm start


The app will run on:

Frontend: http://localhost:3000
Backend: http://localhost:5000

📈 Project Structure

smart-study-scheduler/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
│── README.md

🔮 Future Improvements

Google Calendar integration.
AI-powered task prioritization (planned 🚧).
Offline mode with local storage sync.
Mobile app version.

👨‍💻 Author

Laxman Singh G
GitHub: @Laxman38 (https://github.com/Laxman38)
LinkedIn: laxman-singh (https://www.linkedin.com/in/laxman-singh-b97705254)

📜 License
This project is licensed under the MIT License.