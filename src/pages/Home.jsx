import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Timer from '../components/Timer';

const Home = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='min-h-screen flex flex-col'>
      {/* Cabeçalho */}
      <header className='flex justify-between items-center p-4 bg-blue-500 text-white'>
        <h2 className='text-2xl font-semibold'>Bem-vindo</h2>
        <button
          onClick={handleLogout}
          className='bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded transition duration-200'
        >
          Sair
        </button>
      </header>

      {/* Conteúdo Principal */}
      <main className='flex flex-grow items-center justify-center bg-gray-100'>
        <Timer minutes={1} />
      </main>
    </div>
  );
};

export default Home;
