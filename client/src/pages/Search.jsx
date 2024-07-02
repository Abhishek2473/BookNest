import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookItem from '../components/BookItem';

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const fetchBooks = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/book/?searchTerm=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';

    setSearchTerm(searchTermFromUrl);

    if (searchTermFromUrl !== '') {
      fetchBooks(searchTermFromUrl);
    }
  }, []); // Empty dependency array to run useEffect only on mount

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    fetchBooks(searchTerm);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-r-2 md:min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 shadow-lg rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="text-purple-800 font-semibold text-lg">
              Search:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search for books..."
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 ease-in-out"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <button className="bg-purple-600 text-white p-3 rounded-lg uppercase hover:bg-purple-700 transition duration-300 ease-in-out">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Book results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && books.length === 0 && (
            <p className="text-xl text-slate-700">No books found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}
          {!loading &&
            books &&
            books.map((book) => (
              <BookItem key={book._id} book={book} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
