import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedDate, setSelectedDate] = useState('Any');
  const [visibleBooks, setVisibleBooks] = useState(9);
  const [allBooksLoaded, setAllBooksLoaded] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/book/');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setVisibleBooks(9); // Reset to initial books to show when genre changes
    setAllBooksLoaded(false); // Reset the "Show More" button
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setVisibleBooks(9); // Reset to initial books to show when date changes
    setAllBooksLoaded(false); // Reset the "Show More" button
  };

  const sortBooksByDate = (booksToSort) => {
    return booksToSort.sort((a, b) => {
      return new Date(b.publishedDate) - new Date(a.publishedDate);
    });
  };

  // Apply filters
  let filteredBooks = [...books];
  if (selectedGenre !== 'All') {
    filteredBooks = filteredBooks.filter(book => book.genre === selectedGenre);
  }
  if (selectedDate === 'MostRecent') {
    filteredBooks = sortBooksByDate(filteredBooks);
  }

  // Display only books up to `visibleBooks` count
  const booksToShow = filteredBooks.slice(0, visibleBooks);

  // Load more books on button click
  const handleShowMore = () => {
    if (visibleBooks >= filteredBooks.length) {
      setAllBooksLoaded(true);
    } else {
      setVisibleBooks(prevVisibleBooks => prevVisibleBooks + 9);
    }
  };

  // Extract unique genres for filter dropdown
  const genres = ['All', ...new Set(books.map(book => book.genre))];

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto mt-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4 flex">
      {/* Sidebar */}
      <div className="mr-6 bg-gradient-to-b from-purple-100 to-blue-100 shadow-lg rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl p-7">
        <label htmlFor="genre" className="font-semibold block text-slate-800">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange}
          className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>

        <label htmlFor="publishedDate" className="font-semibold block mt-4 text-slate-800">Sort by Published Date:</label>
        <select
          id="publishedDate"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 block w-full border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Any">Any</option>
          <option value="MostRecent">Most Recent</option>
        </select>
      </div>

      {/* Books grid */}
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Latest Books:
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {booksToShow.map((book) => (
            <Link to={`/book/${book._id}`} key={book._id}>
              <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <img
                  src={book.image ? `http://localhost:4000/${book.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt={book.title}
                  className="h-48 w-full object-contain mb-4 rounded-md"
                />
                <div className="text-lg font-semibold text-black">{book.title}</div>
                <p className="mt-2 text-sm text-gray-700">by {book.author}</p>
                <p className="mt-2 text-xs text-gray-600">Genre: {book.genre}</p>
                <p className="mt-1 text-xs text-gray-600">Published: {new Date(book.publishedDate).toDateString()}</p>
                <div className="mt-4 flex justify-end">
                  <button className="bg-indigo-500 text-white text-xs font-semibold py-1 px-2 rounded hover:bg-indigo-700">
                    Click for details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleShowMore}
            className={`bg-indigo-500 text-white text-xs font-semibold py-2 px-4 rounded hover:bg-indigo-700 ${allBooksLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={allBooksLoaded}
          >
            {allBooksLoaded ? 'No More Books' : 'Show More'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
