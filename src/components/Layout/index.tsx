import React, { useState } from 'react';
import { FaCalendar, FaEdit, FaHome, FaSignOutAlt, FaStar } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Sheet, SheetContent, SheetFooter, SheetHeader } from '@/components/ui/sheet';
import { tw } from '@/utils/tw';

import logo from '../../assets/PoderRosa_logo_Branca.svg';
import { useAuth } from '@/hooks/useAuth';
import { getGreeting } from '@/utils';
import PetalsRain from '../PetalsRain';

const SidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [openSignOutModal, setOpenSignOutModal] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { signOut, token } = useAuth();
  const location = useLocation();
  const cookieUser = Cookies.get('poderrosas.user')
    ? JSON.parse(Cookies.get('poderrosas.user')!)
    : null;

  const isAuthenticated = Boolean(token);
  const displayName = cookieUser?.fullName || (isAuthenticated ? 'Usuário' : 'Convidado');

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
    },
  ];

  return (
    <div className='flex h-screen'>
      <PetalsRain />
      {/* Sidebar - só aparece em telas md+ */}
      <div
        className={tw(
          'custom-gradient-sidebar text-white fixed z-40 flex flex-col justify-between transition-all duration-500 ease-in-out',
          'top-0 left-0 w-64 opacity-100 visible',
          'hidden md:flex',
        )}
        style={{
          transitionProperty: 'width, opacity, visibility',
          height: '100%',
        }}
      >
        {/* Topo do sidebar com logo */}
        <div className='flex items-center justify-between px-4 pt-4 pb-2'>
          <img src={logo} alt='PoderRosa Logo' className='w-32 h-auto' />
        </div>
        <nav className='pt-4 flex-1'>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={location.pathname.startsWith(link.startsWith) ? 'page' : undefined}
              className={tw(
                'font-merryweather font-light relative py-2.5 px-4 mb-1 transition duration-200 flex items-center hover:bg-custom-primary',
                location.pathname.startsWith(link.startsWith) ? 'bg-custom-primary font-bold' : '',
              )}
            >
              <link.icon className={tw('mr-2')} />
              {link.label}
              {location.pathname.startsWith(link.startsWith) && (
                <span className='absolute top-0 right-0 w-1 h-full bg-yellow-500'></span>
              )}
            </Link>
          ))}
        </nav>
        <footer className='p-4'>
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className={tw(
                'text-white py-2 px-4 hover:bg-custom-primary flex items-center w-full',
              )}
            >
              <FaSignOutAlt className={tw('mr-2')} size={24} />
              Sair da plataforma
            </button>
          ) : (
            <div className='text-sm opacity-80 px-1 pb-2'>Acesse mais conteúdos fazendo login.</div>
          )}
        </footer>
      </div>
      {/* Sidebar mobile - Sheet do shadcn/ui */}
      <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
        <SheetContent
          side='left'
          className='p-0 custom-gradient-sidebar text-white w-64 flex flex-col justify-between h-full md:hidden'
        >
          <SheetHeader className='flex items-center justify-between px-4 pt-4 pb-2'>
            <img src={logo} alt='PoderRosa Logo' className='w-32 h-auto' />
          </SheetHeader>
          <nav className='pt-4 flex-1'>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-current={location.pathname.startsWith(link.startsWith) ? 'page' : undefined}
                className={tw(
                  'font-merryweather font-light relative py-2.5 px-4 mb-1 transition duration-200 flex items-center hover:bg-custom-primary',
                  location.pathname.startsWith(link.startsWith)
                    ? 'bg-custom-primary font-bold'
                    : '',
                )}
                onClick={() => setOpenMobileMenu(false)}
              >
                <link.icon className={tw('mr-2')} />
                {link.label}
                {location.pathname.startsWith(link.startsWith) && (
                  <span className='absolute top-0 right-0 w-1 h-full bg-yellow-500'></span>
                )}
              </Link>
            ))}
          </nav>
          <SheetFooter className='p-4'>
            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className={tw(
                  'text-white py-2 px-4 hover:bg-custom-primary flex items-center w-full',
                )}
              >
                <FaSignOutAlt className={tw('mr-2')} size={24} />
                Sair da plataforma
              </button>
            ) : (
              <div className='text-sm opacity-80 px-1 pb-2'>
                Acesse mais conteúdos fazendo login.
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* Main Content */}
      <div className={tw('flex-1 transition-all duration-500', 'ml-0 md:ml-64', 'overflow-y-auto')}>
        {/* Top Bar */}
        <div
          className={tw(
            'bg-gradient-to-r from-custom-start to-custom-end text-white px-4 py-3 flex justify-between items-center fixed top-0 left-0 right-0 z-10 transition-all duration-500',
          )}
          style={{ minHeight: '56px', height: '56px', position: 'relative' }}
        >
          {/* Botão menu mobile */}
          <div className={tw('flex items-center md:hidden')}>
            <button
              onClick={() => setOpenMobileMenu(true)}
              className={tw(
                'bg-custom-primary text-white flex justify-center items-center p-2 rounded-md shadow-md transition-all duration-300',
              )}
              style={{ width: 44, height: 44 }}
              aria-label='Abrir menu lateral'
              type='button'
            >
              <span className='text-2xl'>&#9776;</span>
            </button>
          </div>
          <div className={tw('flex items-center')}>
            <span className={tw('text-sm')}>
              {getGreeting()}, {displayName}
            </span>
          </div>
        </div>
        {/* Conteúdo principal */}
        <div className='p-5 pt-2 text-2xl font-bold'>{children}</div>
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
