const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://naana:naana@cluster0.7ilut.mongodb.net/naana?retryWrites=true&w=majority"
      // "mongodb://localhost:27017/naana"
  )
  .then(() => console.log("Database connected successfully"));