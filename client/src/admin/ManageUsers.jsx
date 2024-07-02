import React from 'react';

const ManageUsers = ({ users, deleteUser }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-800 text-white">
        <h2 className="text-2xl font-semibold">Manage Users</h2>
      </div>
      <div className="bg-white px-6 py-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Username</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="py-4 px-4 whitespace-nowrap">{user.username}</td>
                <td className="py-4 px-4 whitespace-nowrap">{user.email}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
                    onClick={() => deleteUser(user._id)}
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

export default ManageUsers;
