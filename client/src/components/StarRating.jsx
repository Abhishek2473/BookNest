import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating, onStarClick }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
          onClick={() => onStarClick(index + 1)}
        />
      ))}
    </div>
  );
};

export default StarRating;
