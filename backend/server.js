require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB Connection Error:", err));

app.use("/books", bookRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Book Management API is Running...");
});

app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Something went wrong!" });
});

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
