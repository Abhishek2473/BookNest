import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from '../components/BookForm';
import ManageUsers from './ManageUsers';
import ManageBooks from './ManageBooks';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentView, setCurrentView] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/book');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchUsers();
    fetchBooks();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:4000/api/book/${bookId}`);
      setBooks(books.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'bookForm':
        return <BookForm />;
      case 'manageUsers':
        return <ManageUsers users={users} deleteUser={deleteUser} />;
      case 'manageBooks':
        return <ManageBooks books={books} deleteBook={deleteBook} />;
      default:
        return (
          <div className="text-center text-gray-500">
            Please select an option above to get started.
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-4xl font-bold mb-10 text-center text-indigo-600">Welcome Admin</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={() => setCurrentView('bookForm')}
        >
          Create Book
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={() => setCurrentView('manageUsers')}
        >
          Manage Users
        </button>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={() => setCurrentView('manageBooks')}
        >
          Manage Books
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        {renderView()}
      </div>
    </div>
  );
};

export default AdminPanel;
