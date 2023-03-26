// CREATE SERVER
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

const cors = require("cors");
app.use(cors());

// CONNECT DB
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DB;
const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0-m0.shznpsr.mongodb.net/${database}?retryWrites=true&w=majority`
);

// IMPORT USER MODEL
const UserModel = require("./models/Users");

app.get("/", (req, res) => {
  res.send("test");
});
app.get("/users", async (req, res) => {
  const users = await UserModel.find();

  res.json(users);
});

// CREATE USER
app.post("/createUser", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();

  res.json(req.body);
});

app.listen(PORT, () => {
  console.log("server works !!");
});
