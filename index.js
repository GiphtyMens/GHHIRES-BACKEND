require("./config/database");
require("dotenv").config();
const express = require("express");
const cors = require("cors"); // cors validates the header

const serviceRoutes = require("./routes/serviceRoutes");
const shopRoutes = require("./routes/shopRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/service", serviceRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running"));
