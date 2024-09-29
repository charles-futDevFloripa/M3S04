import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email });
    navigate('/home');
  };

  if (isAuthenticated) {
    navigate('/home');
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>E-mail:</label>
            <input
              type='email'
              name='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700'>Senha:</label>
            <input
              type='password'
              name='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
