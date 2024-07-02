import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaStar } from 'react-icons/fa';
import StarRating from '../components/StarRating';

const Book = () => {
  const { id } = useParams();
  const { currentUser, username } = useAuth();  // Get `username` from `AuthContext`

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [inReadingList, setInReadingList] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/book/${id}`);
        setBook(response.data);
        setReviews(response.data.reviews || []);

        if (currentUser) {
          const readingListResponse = await axios.get(`http://localhost:4000/api/user/${currentUser._id}/reading-list`);
          const isInList = readingListResponse.data.some(item => item._id === response.data._id);
          setInReadingList(isInList);
        }
      } catch (error) {
        setError('Failed to fetch book details');
      }
    };
    fetchBook();
  }, [id, currentUser]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/book/${book._id}/reviews`, { review: newReview, rating });
      setBook(response.data);
      setReviews(response.data.reviews || []);
      setNewReview('');
      setRating(0);
    } catch (error) {
      setError('Failed to submit review');
    }
  };

  const handleAddToReadingList = async () => {
    try {
      await axios.post(`http://localhost:4000/api/user/${currentUser._id}/reading-list/add`, { bookId: book._id });
      setInReadingList(true);
    } catch (error) {
      setError('Failed to add book to reading list');
    }
  };

  const handleRemoveFromReadingList = async () => {
    try {
      await axios.post(`http://localhost:4000/api/user/${currentUser._id}/reading-list/remove`, { bookId: book._id });
      setInReadingList(false);
    } catch (error) {
      setError('Failed to remove book from reading list');
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-center">
        <div className="w-1/2">
          <img
            src={book.image ? `http://localhost:4000/${book.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
            alt={book.title}
            className="rounded-lg mx-auto shadow-md"
          />
        </div>
        <div className="ml-8 w-2/3">
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-lg text-gray-700 mb-2">by {book.author}</p>
          <p className="text-gray-500 mb-2">Published Date: {new Date(book.publishedDate).toDateString()}</p>
          <p className="text-gray-500 mb-2">Pages: {book.pages}</p>
          <p className="text-lg text-indigo-500 font-semibold mb-6">Genre: {book.genre}</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{book.description}</p>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              inReadingList ? (
                <button className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center" onClick={handleRemoveFromReadingList}>
                  Remove from Reading List
                </button>
              ) : (
                <button className="bg-green-500 text-white py-2 px-4 rounded-md flex items-center" onClick={handleAddToReadingList}>
                  Add to Reading List
                </button>
              )
            ) : (
              <p className="text-lg text-gray-700 leading-relaxed mb-8">Sign in to add to reading list</p>
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Reviews</h2>
            {reviews.length > 0 ? (
              <ul className="space-y-4">
                {reviews.map((review) => (
                  <li key={review._id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-lg font-semibold">{review.username}</div>
                      <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-lg ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p>{review.text}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {currentUser && (
            <form onSubmit={handleReviewSubmit} className="mt-8">
              <div className="flex items-center mb-4">
                <StarRating rating={rating} onStarClick={handleStarClick} />
              </div>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Book;
