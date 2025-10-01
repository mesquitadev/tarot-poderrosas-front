import back_carta_do_dia from '../../assets/back-carta-do-dia.svg';
import back_tres_cartas from '../../assets/back_tres_cartas.svg';
import back_cinco_cartas from '../../assets/back_cinco_cartas.svg';

import './style.css';
import { useNavigate } from 'react-router';
import VideoModal from '@/components/VIdeoModal';
import React, { useState } from 'react';
import { tw } from '@/utils/tw';
import { SparklesIcon, PlayIcon } from '@heroicons/react/24/outline';

const TarotCardButton = ({
  background,
  subtitle,
  onClick,
  title,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  background: string;
  subtitle: string;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div className='group relative'>
      <div className='absolute -inset-1 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500'></div>
      <button
        onClick={onClick}
        {...rest}
        className={tw(
          'relative flex flex-col items-center justify-between p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 h-full min-h-[400px]',
          rest.className,
        )}
      >
        <div className='flex-1 flex flex-col items-center justify-center space-y-4'>
          <div className='relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300'>
            <img
              src={background}
              alt=''
              className={tw(
                'w-full max-w-[180px] transform group-hover:scale-110 transition-transform duration-500',
              )}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
          </div>

          <div className='text-center space-y-2'>
            <h3 className='text-lg font-bold text-gray-800 group-hover:text-custom-primary transition-colors duration-300'>
              {title}
            </h3>
            <p
              className={tw(
                'text-sm text-gray-600 leading-relaxed px-2 group-hover:text-gray-700 transition-colors duration-300',
              )}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-custom-primary to-purple-600 text-white rounded-xl font-medium text-sm group-hover:shadow-lg transform group-hover:scale-105 transition-all duration-300'>
          <SparklesIcon className='w-4 h-4' />
          <span>Começar Jornada</span>
        </div>
      </button>
    </div>
  );
};

export default function Tarot() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen((state) => !state);

  return (
    <>
      <div className='flex w-full min-h-screen flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-white'>
        {/* Header Section */}
        <div className='text-center py-8 px-4'>
          <div className='relative inline-block'>
            <div className='absolute -inset-2 bg-gradient-to-r from-custom-primary to-purple-600 rounded-lg blur opacity-20'></div>
            <h1 className='relative font-merryweather text-3xl md:text-4xl font-bold bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Desperte sua Intuição
            </h1>
          </div>
          <p className='font-raleway text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed'>
            Conecte-se com sua sabedoria interior através das cartas sagradas. Cada tiragem é uma
            janela para sua alma e um guia para seu caminho.
          </p>
        </div>

        {/* Cards Grid */}
        <div className='flex-1 flex items-center justify-center px-4 pb-8'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl'>
            <TarotCardButton
              onClick={() => navigate('/tarot/carta-do-dia')}
              background={back_carta_do_dia}
              title='A Rosa do Momento'
              subtitle='Uma pétala única que cai em suas mãos, trazendo um recado claro e a energia central que guia seu dia com amor e propósito.'
            />
            <TarotCardButton
              onClick={() => navigate('/tarot/tres-cartas')}
              background={back_tres_cartas}
              title='O Buquê da Rosa'
              subtitle='Três flores que juntas contam sua história completa: onde esteve, onde está agora e para onde vai florescer em sua jornada.'
            />
            <TarotCardButton
              onClick={() => navigate('/tarot/cinco-cartas')}
              background={back_cinco_cartas}
              title='O Jardim da Rosa'
              subtitle='Caminhe por cinco rosas sagradas que revelam todos os aspectos da sua jornada até o florescer final de sua alma.'
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className='flex justify-center pb-8'>
          <button
            onClick={() => closeModal()}
            className='group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-custom-primary hover:to-purple-600 text-gray-700 hover:text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium'
          >
            <PlayIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
            <span>Como Jogar</span>
          </button>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl='https://player.cloudinary.com/embed/?cloud_name=dtsqw41vs&public_id=DINAMICA_DO_TARO_zteiyk&profile=cld-default'
      />
    </>
  );
}
