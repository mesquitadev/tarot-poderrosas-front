import React, { useEffect, useState } from 'react';
import { FaCalendar, FaEdit, FaHome, FaSignOutAlt, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

import logo from '../../assets/PoderRosa_logo_Branca.svg';
import { useAuth } from '@/hooks/useAuth';
import { getGreeting } from '@/utils';
import PetalsRain from '../PetalsRain';

const SidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // sidebar fechado por padrão
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const { signOut } = useAuth();
  const location = useLocation();
  const user = Cookies.get('poderrosas.user') ? JSON.parse(Cookies.get('poderrosas.user')!) : null;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsSidebarOpen(false); // sempre fechado no mobile por padrão
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true); // aberto no desktop
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
      <PetalsRain />
      {/* Sidebar */}
      <div
        className={`custom-gradient-sidebar text-white fixed z-40 flex flex-col justify-between transition-all duration-500 ease-in-out
          ${isMobile ? 'top-14 left-0' : 'top-0 left-0'}
          ${
            isMobile
              ? isSidebarOpen
                ? 'w-full opacity-100 visible'
                : 'w-0 opacity-0 invisible'
              : isSidebarOpen
              ? 'w-64 opacity-100 visible'
              : 'w-20 opacity-100 visible'
          }
        `}
        style={{
          transitionProperty: 'width, opacity, visibility',
          height: isMobile ? 'calc(100% - 56px)' : '100%',
        }}
      >
        {/* Topo do sidebar com logo e botão fechar no mobile */}
        <div className='flex items-center justify-between px-4 pt-4 pb-2'>
          <img src={logo} alt='PoderRosa Logo' className='w-32 h-auto' />
        </div>
        <nav className='pt-4 flex-1'>
          {links.map((link) => (
            <div key={link.to}>
              <Link
                to={link.to}
                className={`font-merryweather font-light hover:font-bold relative py-2.5 px-4 mb-1 transition duration-200 hover:bg-custom-primary flex items-center ${
                  isSidebarOpen ? '' : 'justify-center text-center'
                } ${location.pathname.startsWith(link.startsWith) ? 'bg-custom-primary' : ''}`}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <link.icon className={`mr-2 ${isSidebarOpen ? '' : 'm-0'}`} />
                {isSidebarOpen && link.label}
                {location.pathname.startsWith(link.startsWith) && (
                  <span className='absolute top-0 right-0 w-1 h-full bg-yellow-500'></span>
                )}
              </Link>
            </div>
          ))}
        </nav>
        <footer className='p-4'>
          <button
            onClick={handleSignOut}
            className='text-white py-2 px-4 hover:bg-custom-primary flex items-center w-full'
          >
            <FaSignOutAlt className='mr-2' size={24} />
            Sair da plataforma
          </button>
        </footer>
      </div>
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-500 ${
          isSidebarOpen && !isMobile ? 'ml-64' : 'ml-0'
        } overflow-y-auto`}
      >
        {/* Top Bar */}
        <div
          className='bg-gradient-to-r from-custom-start to-custom-end text-white px-4 py-3 flex justify-between items-center fixed top-0 left-0 right-0 z-10 transition-all duration-500'
          style={{ minHeight: '56px', height: '56px', position: 'relative' }}
        >
          {/* Botão do menu à esquerda */}
          <div className='flex items-center'>
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen((open) => !open)}
                className='bg-custom-primary text-white flex justify-center items-center p-2 rounded-md shadow-md md:hidden transition-all duration-300'
                style={{ width: 44, height: 44 }}
                aria-label={isSidebarOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'}
                type='button'
              >
                {isSidebarOpen ? (
                  <XMarkIcon className='w-6 h-6' />
                ) : (
                  <Bars3Icon className='w-6 h-6' />
                )}
              </button>
            )}
          </div>
          {/* Saudação alinhada à direita */}
          <div className='flex items-center'>
            <span className='text-sm'>
              {getGreeting()}, {user ? user.fullName : 'Usuário'}
            </span>
          </div>
        </div>
        <div className='p-5 text-2xl font-bold'>{children}</div>
      </div>
      {/* Modal de sair permanece igual */}
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
