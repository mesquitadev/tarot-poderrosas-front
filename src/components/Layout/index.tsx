import React, { useEffect, useState } from 'react';
import {
  FaCalendar,
  FaEdit,
  FaHome,
  FaSignOutAlt,
  FaStar,
  FaInstagram,
  FaLinkedin,
  FaPlus,
  FaList,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { ExclamationTriangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

import logo from '../../assets/PoderRosa_logo_Branca.svg';
import { useAuth } from '@/hooks/useAuth';
import { getGreeting } from '@/utils';

const SidebarLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<{ [key: string]: boolean }>({});
  const { signOut } = useAuth();
  const location = useLocation();

  const user = Cookies.get('poderrosas.user') ? JSON.parse(Cookies.get('poderrosas.user')!) : null;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignOut = () => {
    setOpenSignOutModal((state) => !state);
  };

  const toggleSubmenu = (menu: string) => {
    setIsSubmenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const links = [
    { to: '/inicio', icon: FaHome, label: 'Início', startsWith: '/inicio' },
    { to: '/tarot', icon: FaStar, label: 'Tarot', startsWith: '/tarot' },
    {
      to: '/desafio-do-dia',
      icon: FaCalendar,
      label: 'Desafio do Dia',
      startsWith: '/desafio-do-dia',
    },
    {
      to: '/minhas-anotacoes',
      icon: FaEdit,
      label: 'Minhas Anotações',
      startsWith: '/minhas-anotacoes',
      // submenu: [
      //   { to: '/minhas-anotacoes/nova', label: 'Nova Anotação', icon: FaPlus },
      //   { to: '/minhas-anotacoes/lista', label: 'Lista de Anotações', icon: FaList },
      // ],
    },
  ];

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div
        className={`custom-gradient-sidebar text-white fixed top-0 left-0 h-full ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } space-y-6 py-7 transition-width duration-200 flex flex-col justify-between`}
      >
        <nav className='pt-20'>
          {links.map((link) => (
            <div key={link.to}>
              <Link
                to={link.to}
                className={`relative py-2.5 px-4 mb-1 transition duration-200 hover:bg-custom-primary flex items-center ${
                  isSidebarOpen ? '' : 'justify-center text-center'
                } ${location.pathname.startsWith(link.startsWith) ? 'bg-custom-primary' : ''}`}
                onClick={() => link.submenu && toggleSubmenu(link.label)}
              >
                <link.icon className={`mr-2 ${isSidebarOpen ? '' : 'm-0'}`} />
                {isSidebarOpen && link.label}
                {location.pathname.startsWith(link.startsWith) && (
                  <span className='absolute top-0 right-0 w-1 h-full bg-yellow-500'></span>
                )}
              </Link>
              {link.submenu && isSubmenuOpen[link.label] && (
                <ul className='pl-8 bg-custom-start transition-height '>
                  {link.submenu.map((sublink) => (
                    <li key={sublink.to}>
                      <Link
                        to={sublink.to}
                        className={`relative py-2.5 px-4 mb-1 transition duration-200 hover:bg-custom-primary flex items-center ${
                          isSidebarOpen ? '' : 'justify-center text-center'
                        } ${location.pathname.startsWith(sublink.to) ? 'bg-custom-primary' : ''}`}
                      >
                        <sublink.icon className='mr-2' />
                        {isSidebarOpen && sublink.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
        <footer className='p-4'>
          <button
            onClick={handleSignOut}
            className='text-white py-2 px-4 hover:bg-custom-primary flex items-center w-full'
          >
            <FaSignOutAlt className='mr-2' size={24} />
            {isSidebarOpen && 'Sair da plataforma'}
          </button>
          {/*{isSidebarOpen && (*/}
          {/*  <div className='mt-4 text-center'>*/}
          {/*    <p className='text-sm'>Desenvolvido por:</p>*/}
          {/*    <p className='text-lg font-bold'>Paulo Victor Mesquita</p>*/}
          {/*    <div className='flex justify-center mt-2 space-x-4'>*/}
          {/*      <a*/}
          {/*        href='https://www.linkedin.com/in/mesquitadev'*/}
          {/*        target='_blank'*/}
          {/*        rel='noopener noreferrer'*/}
          {/*      >*/}
          {/*        <FaLinkedin className='text-white hover:text-blue-500' size={24} />*/}
          {/*      </a>*/}
          {/*      <a*/}
          {/*        href='https://www.instagram.com/_mesquitadev'*/}
          {/*        target='_blank'*/}
          {/*        rel='noopener noreferrer'*/}
          {/*      >*/}
          {/*        <FaInstagram className='text-white hover:text-pink-500' size={24} />*/}
          {/*      </a>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*)}*/}
        </footer>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} overflow-y-auto`}>
        {/* Top Bar */}
        <div className='bg-gradient-to-r from-custom-start to-custom-end text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10'>
          <div className='flex items-center justify-center align-middle'>
            <img src={logo} alt='PoderRosa Logo' className='w-100 h-100' />
            <button
              onClick={() => setIsSidebarOpen((state) => !state)}
              className='text-white rounded ml-2 py-2 px-4 bg-white hover:bg-custom-primary flex items-center w-full'
            >
              {isSidebarOpen ? (
                <XMarkIcon aria-hidden='true' className='size-6 text-red-600' />
              ) : (
                <Bars3Icon aria-hidden='true' className='size-6 text-red-600' />
              )}
            </button>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-sm'>
              {getGreeting()}, {user ? user.fullName : 'Usuário'}
            </span>
            {/*<img src={logo} alt='User' className='w-8 h-8 rounded-full' />*/}
          </div>
        </div>
        <div className='mt-24 p-5 text-2xl font-bold'>{children}</div>
      </div>

      <Dialog open={openSignOutModal} onClose={handleSignOut} className='relative z-10'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
        />

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <DialogPanel
              transition
              className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'
            >
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10'>
                    <ExclamationTriangleIcon aria-hidden='true' className='size-6 text-red-600' />
                  </div>
                  <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                    <DialogTitle as='h3' className='text-base font-semibold text-gray-900'>
                      Sair da Plataforma
                    </DialogTitle>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>Deseja sair da plataforma?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
                  onClick={() => signOut()}
                  className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto'
                >
                  Sim
                </button>
                <button
                  type='button'
                  onClick={handleSignOut}
                  className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                >
                  Não
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SidebarLayout;
