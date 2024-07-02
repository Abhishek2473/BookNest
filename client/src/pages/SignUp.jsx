// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function SignUp() {
//   const [formData, setFormData] = useState({});
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
//       if (response.status === 201) {
//         navigate('/signin');
//       }
//     } catch (error) {
//       setError(error.response?.data || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input
//           type='text'
//           placeholder='username'
//           className='border p-3 rounded-lg'
//           id='username'
//           onChange={handleChange}
//         />
//         <input
//           type='email'
//           placeholder='email'
//           className='border p-3 rounded-lg'
//           id='email'
//           onChange={handleChange}
//         />
//         <input
//           type='password'
//           placeholder='password'
//           className='border p-3 rounded-lg'
//           id='password'
//           onChange={handleChange}
//         />

//         <button
//           disabled={loading}
//           className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
//         >
//           {loading ? 'Loading...' : 'Sign Up'}
//         </button>
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>Have an account?</p>
//         <Link to={'/signin'}>
//           <span className='text-blue-700'>Sign in</span>
//         </Link>
//       </div>
//       {error && <p className='text-red-500 mt-5'>{error}</p>}
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
      const { user, token } = response.data;
      signIn(user, token); // Automatically sign in the user after signing up
      setLoading(false);
      navigate('/SignIn'); // Redirect to profile page after successful sign up
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-8'>
      <h1 className='text-3xl font-bold mb-4'>Sign Up</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          disabled={loading}
          className='bg-indigo-600 text-white p-3 rounded-lg uppercase hover:bg-indigo-700 disabled:opacity-80'
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
