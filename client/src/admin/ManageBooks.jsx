import React from 'react';

const ManageBooks = ({ books, deleteBook }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-semibold">Manage Books</h2>
      </div>
      <div className="bg-white px-6 py-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Title</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Author</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map(book => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td className="py-4 px-4 whitespace-nowrap">{book.title}</td>
                <td className="py-4 px-4 whitespace-nowrap">{book.author}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
