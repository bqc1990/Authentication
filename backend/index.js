const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`the server started on port: ${PORT}`);
});

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connected!");
  }
);

app.use("/api/user", require("./router/User.router"));
