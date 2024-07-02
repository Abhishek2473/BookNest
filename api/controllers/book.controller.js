import Book from "../models/book.model.js";
import upload from "../middleware/upload.js"


export const createBook = async (req, res) => {
  const { title, author, publishedDate, pages, genre, description } = req.body;
  const image = req.file ? req.file.path : undefined;

  try {
    const newBook = new Book({ title, author, publishedDate, pages, genre, description, image });
    await newBook.save();

    res.status(201).send(newBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

  
    const searchTerm = req.query.searchTerm || '';

    const books = await Book.find({
      title: { $regex: searchTerm, $options: 'i' },
    })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};


export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true, runValidators: true });

    if (!updatedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send(updatedBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).send('Book not found');
    }

    res.status(200).send(deletedBook);
  } catch (err) {
    res.status(500).send(err.message);
  }
};




export const addReview = async (req, res, next) => {
  const { id } = req.params;
  const { review, rating } = req.body;
  const { username } = req.user;  // Get username from the authenticated user

  console.log('Review Data:', { id, review, rating, username }); // Debugging line

  try {
    const book = await Book.findById(id);
    if (!book) return next(errorHandler(404, 'Book not found'));

    book.reviews.push({ text: review, rating, username });
    await book.save();

    res.status(200).json(book);
  } catch (error) {
    console.log('Error adding review:', error); // Debugging line
    next(error);
  }
};





