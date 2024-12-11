import React, { useEffect, useState } from 'react';
import { FaCalendar, FaEdit, FaHome, FaSignOutAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import logo from '../../assets/PoderRosa_logo_Branca.svg';
import { useAuth } from '@/hooks/useAuth';

const SidebarLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { signOut } = useAuth();

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
    <AlertDialog.Root>
      <AlertDialog.Overlay className='fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow' />
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

              <AlertDialog.Trigger asChild>
                <button className=' text-white py-2 px-4 rounded hover:bg-custom-primary-hover flex items-center'>
                  <FaSignOutAlt className='mr-2' />
                  {isSidebarOpen && 'Sair da plataforma'}
                </button>
              </AlertDialog.Trigger>
            </nav>
          </div>
          {/* Main Content */}
          <div className='flex-1 p-5 text-2xl font-bold'>{children}</div>
        </div>
      </div>
      <AlertDialog.Portal>
        <AlertDialog.Content className='fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow'>
          <AlertDialog.Title className='m-0 text-[17px] font-medium text-mauve12'>
            Deseja Sair da Plataforma?
          </AlertDialog.Title>
          {/*<AlertDialog.Description className='mb-5 mt-[15px] text-[15px] leading-normal text-mauve11'>*/}
          {/*  This action cannot be undone. This will permanently delete your account and remove your*/}
          {/*  data from our servers.*/}
          {/*</AlertDialog.Description>*/}
          <div className='flex justify-end gap-[25px]'>
            <AlertDialog.Cancel asChild>
              <button className='inline-flex h-[35px] items-center justify-center rounded bg-mauve4 px-[15px] font-medium leading-none text-mauve11 outline-none hover:bg-mauve5 focus:shadow-[0_0_0_2px] focus:shadow-mauve7'>
                Não
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={() => signOut()}
                className='inline-flex h-[35px] items-center justify-center rounded bg-red4 px-[15px] font-medium leading-none text-red11 outline-none hover:bg-red5 focus:shadow-[0_0_0_2px] focus:shadow-red7'
              >
                Sim
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default SidebarLayout;
