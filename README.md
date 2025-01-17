# Tic-Tac-Toe Game with Real-Time Chat

## 🎮 Overview
This is a **full-stack** Tic-Tac-Toe game with **real-time chat functionality**, built using the **StreamChat API**. Players can join a game room, play Tic-Tac-Toe, and chat with their opponents in real time.

## 🚀 Features
- **Multiplayer Tic-Tac-Toe** with real-time game updates.
- **Integrated real-time chat** powered by StreamChat API.
- **Full-stack implementation** with a React frontend and an Express backend.
- **Smooth user experience** with instant feedback and UI updates.
- **Join & leave game rooms** dynamically.

## 🛠️ Tech Stack
### **Frontend (Client)**
- React.js
- Vite
- StreamChat React Components
- CSS for styling

### **Backend (Server)**
- Node.js
- Express.js
- StreamChat API


## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone git@github.com:sauravshinde007/Tic-Tac-Toe.git
cd tic-tac-toe-chat
```

### 2️⃣ Set Up the Backend (Server)
```sh
cd server
npm install
```
- Create a `.env` file inside the `server` directory and add:
  ```env
  PORT=4000
  STREAM_API_KEY=your-stream-api-key
  STREAM_API_SECRET=your-stream-api-secret
  ```
- Start the backend server:
  ```sh
  npm run dev
  ```

### 3️⃣ Set Up the Frontend (Client)
```sh
cd ../client
npm install
```
- Create a `.env` file inside the `client` directory and add:
  ```env
  VITE_API_URL=http://localhost:4000
  VITE_STREAM_CHAT_API=your-stream-api-key
  ```
- Start the React development server:
  ```sh
  npm run dev
  ```

### 4️⃣ Open in Browser
Go to: **`http://localhost:5173`** (Vite default port for React)

## 🕹️ How to Play
1. Enter a **game room** (it automatically connects to an opponent).
2. Play **Tic-Tac-Toe** by clicking on the board.
3. **Chat** with your opponent using the built-in chat window.
4. The game declares a **winner** or a **tie** at the end.
5. Click "Leave Game" to disconnect.

## 📌 Future Enhancements
- Add **user authentication** (Google OAuth, username-based login).
- Implement **ranked matchmaking** with a leaderboard.
- Add **sound effects & animations** for a better experience.

## 📜 License
This project is licensed under the **MIT License**.

---


