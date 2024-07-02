import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { FaBookOpen } from 'react-icons/fa'; // Importing a book icon


const Header = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 shadow-lg">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white text-2xl font-bold tracking-wide">
            <Link to="/" className="flex items-center space-x-2">
            <FaBookOpen className="text-5xl text-white-600" />

            <span>BookNest</span>
            </Link>
          </div>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white px-3 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white px-3 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="bg-transparent focus:outline-none text-white placeholder-white border-b-2 border-transparent focus:border-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="text-white">
                  <FaSearch className="text-white" />
                </button>
              </form>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-9 w-9 object-cover border-2 border-white shadow"
                src={currentUser.avatar}
                alt="profile"
              />
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-white px-3 py-2 rounded hover:bg-white hover:text-purple-600 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;