import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book }) => {
  return (
    <Link to={`/book/${book._id}`} key={book._id}>
      <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
        <img
          src={book.image ? `http://localhost:4000/${book.image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
          alt={book.title}
          className="h-48 w-full object-contain mb-4 rounded-md"
        />
        <div className="text-lg font-semibold text-black">{book.title}</div>
        <p className="mt-2 text-sm text-gray-700">by {book.author}</p>
        <p className="mt-2 mb-2 text-xs text-gray-600">Genre: {book.genre}</p>
      </div>
    </Link>
  );
};

export default BookItem;