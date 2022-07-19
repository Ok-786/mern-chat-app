import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import path from "path";
import { Server } from 'socket.io';
import db from './config/db.js';

dotenv.config();

db();

const app = express();


app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use('/uploads/images', express.static(path.join('uploads', 'images')))


// app.use('/api/chats', chatRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/messages', chatRoutes)


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html'));
    })
}


const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server running at Port: ${process.env.PORT}`)
})


const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "/",
        credentials: true
    }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id)
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    })
});