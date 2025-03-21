const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const authRoute = require('./routes/userAuthroute')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const messageroute = require('./routes/messageRoute');
const cors = require('cors');
const { app, server } = require("./socket");
const path = require("path");


const port = process.env.PORT 


let DB = process.env.DATABASE.replace("<password>",process.env.PASSWORD);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "*", 
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true 
}))

app.use("/api/auth",authRoute)
app.use("/api/message",messageroute)
app.get("/", (req, res) => {
  res.send("Backend is running!");
});




if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
  });
}

server.listen(port, () => {
    console.log(`server listening on ${port}`);
    ConnectDB();
  });

const ConnectDB = async () =>{ 
    try{
      const conn = await mongoose.connect(DB);
      console.log(`Connected to MongoDB at ${conn.connection.host}`);
    } catch(err){
      console.log(err);
    }
  };

module.exports = app;