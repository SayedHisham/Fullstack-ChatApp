const dotenv =require('dotenv');
const express = require('express');
const authRoute = require('./routes/userAuthroute')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const messageroute = require('./routes/messageRoute');
const cors = require('cors');
const { app, server } = require("./socket");

dotenv.config({ path: './../config.env' });

const port = process.env.PORT 

let DB = process.env.DATABASE.replace('<password>',process.env.PASSWORD);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use('/api/auth',authRoute)
app.use('/api/message',messageroute)

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