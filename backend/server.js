require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To support URL-encoded bodies
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" })); // Modify as needed

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/books", bookRoutes);
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Book Management API is Running...");
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// module.exports = app;
