import back_carta_do_dia from '../../assets/back-carta-do-dia.svg';
import back_tres_cartas from '../../assets/back_tres_cartas.svg';
import back_cinco_cartas from '../../assets/back_cinco_cartas.svg';

import './style.css';
import { useNavigate } from 'react-router';
import VideoModal from '@/components/VIdeoModal';
import { useState } from 'react';
import { tw } from '@/utils/tw';

const TarotCardButton = ({
  background,
  subtitle,
  onClick,
  ...rest
}: {
  background: string;
  subtitle: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={tw(
        'flex flex-col items-center justify-center gap-2 p-2 rounded-lg shadow-md transition hover:scale-105',
        rest.className,
      )}
    >
      <img src={background} alt='' className={tw('w-full max-w-[200px] rounded-md')} />
      <div className={tw('w-[200px] text-center')}>
        <p className={tw('text-sm break-words')}>{subtitle}</p>
      </div>
    </button>
  );
};

export default function Tarot() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen((state) => !state);

  return (
    <>
      <div className='flex w-full h-screen flex-col text-center'>
        <p className='font-merryweather text-md'>Desperte sua Intuição</p>
        <p className='font-raleway text-sm'>
          Escolha suas cartas e conecte-se com sua sabedoria interior
        </p>
        <div className='flex flex-col items-center justify-center'>
          <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3  justify-around justify-items-center gap-x-4 w-full'>
            <TarotCardButton
              onClick={() => navigate('/tarot/carta-do-dia')}
              background={back_carta_do_dia}
              subtitle='Objetivo: Obter uma mensagem diária que inspire e te dê direção.'
            />
            <TarotCardButton
              onClick={() => navigate('/tarot/tres-cartas')}
              background={back_tres_cartas}
              subtitle='Objetivo: Compreender melhor uma situação específica em sua vida.'
            />
            <TarotCardButton
              onClick={() => navigate('/tarot/cinco-cartas')}
              background={back_cinco_cartas}
              subtitle='Objetivo: Receber uma visão aprofundada sobre um desafio ou decisão importante.'
            />
          </div>
        </div>
        <div className='flex flex-row justify-center'>
          <button
            onClick={() => closeModal()}
            className='mt-4 text-sm text-white bg-custom-start p-2 rounded'
          >
            Como Jogar
          </button>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl='https://player-vz-88b4be7d-dd2.tv.pandavideo.com.br/embed/?v=5a76d6d0-eaa9-4cbc-a0c1-34dbb150937f'
      />
    </>
  );
}
