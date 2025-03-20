const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Book = require("../models/Book");

const router = express.Router();

// GET books - Only fetch books of the logged-in user
router.get("/", authMiddleware, async (req, res) => {
    try {
        const books = await Book.find({ userId: req.user }); // Fetch only user-specific books
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
});

// POST a new book - Associate book with the user
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: "Title and Author are required" });
        }

        const newBook = new Book({ 
            title, 
            author, 
            userId: req.user
        });

        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: "Error adding book" });
    }
});

// Update a book by ID - Ensure the user owns the book
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: "Title and Author are required" });
        }

        const book = await Book.findOne({ _id: req.params.id, userId: req.user });

        if (!book) {
            return res.status(404).json({ error: "Book not found or unauthorized" });
        }

        book.title = title;
        book.author = author;
        await book.save();

        res.json(book);
    } catch (error) {
        res.status(500).json({ error: "Failed to update book" });
    }
});

// Delete a book by ID - Ensure the user owns the book
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user });

        if (!book) {
            return res.status(404).json({ error: "Book not found or unauthorized" });
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete book" });
    }
});

module.exports = router;
