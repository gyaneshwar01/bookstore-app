const express = require("express");

const router = express.Router();

const {
  addBook,
  getBooks,
  getBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");

const requireAuth = require("../middleware/requireAuth");

// Require auth for all book requests
router.use(requireAuth);

// GET all books
router.get("/", getBooks);

// GET a single book
router.get("/:id", getBook);

// POST a new book
router.post("/", addBook);

// DELETE a book
router.delete("/:id", deleteBook);

// UPDATE a book
router.patch("/:id", updateBook);

module.exports = router;
