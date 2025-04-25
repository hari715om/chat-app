# 📱 Chat App (React Native + Socket.io)

This is a basic real-time chat application built using **React Native** (frontend) and **Node.js with Socket.io** (backend). It allows users to join with a username, send and receive messages in real-time, 
and see when users join or leave the chat.


## 🛠 Tech Stack

- **Frontend:** React Native (via Expo)
- **Backend:** Node.js, Express, Socket.io
- **Real-time Communication:** Socket.io

---

## 📱 Features

- Join chat using a username
- Real-time message sending and receiving
- System messages for join/leave events
- Timestamp for each message
- Clean UI with sender/receiver message styling

---

## 🚀 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/chat-app-assignment.git
cd chat-app-assignment
2. Start Backend Server

cd backend
npm install
node server.js
3. Start React Native Frontend

cd ..
npx expo start
