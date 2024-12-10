import React, { useEffect, useState } from 'react';
import { FaCalendar, FaEdit, FaHome, FaSignOutAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import logo from '../../assets/PoderRosa_logo_Branca.svg';

const SidebarLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);

    // Set the initial state based on the current window size
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      {/* Top Bar */}
      <div className='bg-gradient-to-r from-custom-start to-custom-end text-white p-4 flex justify-between items-center'>
        <div className='flex items-center'>
          <img src={logo} alt='PoderRosa Logo' className='w-100 h-100' />
        </div>
        <div className='flex items-center space-x-4'>
          <span className='text-sm'>Paulinha Lobão</span>
          <img src={logo} alt='User' className='w-8 h-8 rounded-full' />
        </div>
      </div>
      <div className='flex flex-1'>
        {/* Sidebar */}
        <div
          className={`custom-gradient-sidebar text-white ${
            isSidebarOpen ? 'w-64' : 'w-20'
          } space-y-6 py-7 px-2 transition-width duration-200 h-full`}
        >
          <nav>
            {/*<button*/}
            {/*  onClick={toggleSidebar}*/}
            {/*  className='bg-gray-700 text-white py-2 px-4 rounded block md:hidden lg:hidden'*/}
            {/*>*/}
            {/*  {isSidebarOpen ? 'Collapse' : 'Expand'}*/}
            {/*</button>*/}
            <Link
              to='/inicio'
              className='py-2.5 px-4 rounded transition duration-200 hover:custom-primary flex items-center'
            >
              <FaHome className='mr-2' />
              {isSidebarOpen && 'Início'}
            </Link>
            <Link
              to='/tarot'
              className='py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center'
            >
              <FaStar className='mr-2' />
              {isSidebarOpen && 'Tarot'}
            </Link>
            <Link
              to='/desafio-do-dia'
              className='py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center'
            >
              <FaCalendar className='mr-2' />
              {isSidebarOpen && 'Desafio do Dia'}
            </Link>
            <Link
              to='/minhas-anotacoes'
              className='py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center'
            >
              <FaEdit className='mr-2' />
              {isSidebarOpen && 'Minhas Anotações'}
            </Link>
            <Link
              to='/minhas-anotacoes'
              className='py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 flex items-center'
            >
              <FaSignOutAlt className='mr-2' />
              {isSidebarOpen && 'Minhas Anotações'}
            </Link>
            {/*<button className='bg-gray-700 text-white py-2 px-4 rounded hover:bg-custom-primary-hover flex items-center'>*/}
            {/*  <FaSignOutAlt className='mr-2' />*/}
            {/*  {isSidebarOpen && 'Sair da plataforma'}*/}
            {/*</button>*/}
          </nav>
        </div>
        {/* Main Content */}
        <div className='flex-1 p-5 text-2xl font-bold'>{children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
