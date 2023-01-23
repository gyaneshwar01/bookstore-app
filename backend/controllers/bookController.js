const mongoose = require("mongoose");
const Book = require("../models/booksModel");

// GET all books
const getBooks = async (req, res) => {
  const user_id = req.user._id;
  const books = await Book.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(books);
};

// GET a single book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(200).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

// ADD a new book
const addBook = async (req, res) => {
  const { title, author } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!author) {
    emptyFields.push("author");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const book = await Book.create({ title, author, user_id });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) {
    return res.status(404).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

// UPDATE a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    { new: true }
  ).exec();

  if (!book) {
    return res.status(404).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

module.exports = { addBook, getBooks, getBook, deleteBook, updateBook };
