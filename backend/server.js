require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
