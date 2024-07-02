import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ReadingList = () => {
  const { currentUser } = useAuth();
  const [readingList, setReadingList] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/user/${currentUser._id}/reading-list`);
        setReadingList(response.data);
      } catch (err) {
        setError(err.response?.data || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchReadingList();
    }
  }, [currentUser]);

  const handleRemoveBook = async (bookId) => {
    try {
      await axios.post(`http://localhost:4000/api/user/${currentUser._id}/reading-list/remove`, { bookId });
      setReadingList((prevList) => prevList.filter((book) => book._id !== bookId));
    } catch (err) {
      setError(err.response?.data || 'An error occurred while removing the book');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-7xl w-full p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Reading List</h1>
        {readingList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {readingList.map((book) => (
              <div key={book._id} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                <img
                  className="h-64 w-full object-contain mb-4 rounded-md"
                  src={book.image ? `http://localhost:4000/${book.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                  alt={book.title}
                />
                <div className="text-lg font-semibold text-black">{book.title}</div>
                <p className="mt-2 text-sm text-gray-700">by {book.author}</p>
                <p className="mt-2 text-sm text-gray-500">Published Date: {new Date(book.publishedDate).toDateString()}</p>
                <p className="mt-2 text-sm text-gray-500">Pages: {book.pages}</p>
                <div className="mt-2 text-xs text-indigo-500 font-semibold">Genre: {book.genre}</div>
                <button
                  className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveBook(book._id)}
                >
                  Remove from Reading List
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No books in your reading list.</div>
        )}
      </div>
    </div>
  );
};

export default ReadingList;
