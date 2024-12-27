import back_carta_do_dia from '../../assets/back-carta-do-dia.svg';
import back_tres_cartas from '../../assets/back_tres_cartas.svg';
import back_cinco_cartas from '../../assets/back_cinco_cartas.svg';

import './style.css';
import { useHistory } from 'react-router';
import VideoModal from '@/components/VIdeoModal';
import { useState } from 'react';

export const Card = ({
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
    <button onClick={onClick} {...rest} className='justify-items-center'>
      <img src={background} alt='' />
      <div className='w-[200px]'>
        <p className='text-sm break-words'>{subtitle}</p>
      </div>
    </button>
  );
};

export default function Tarot() {
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen((state) => !state);

  return (
    <>
      <div className='flex flex-col w-full h-full min-h-screen text-center '>
        <p className='text-md'>Desperte sua Intuição</p>
        <p className='text-sm'>Escolha suas cartas e conecte-se com sua sabedoria interior</p>
        <div className='flex flex-col justify-items-center justify-center w-full h-full'>
          <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3  justify-around justify-items-center gap-x-4 w-full'>
            <Card
              onClick={() => history.push('/tarot/carta-do-dia')}
              background={back_carta_do_dia}
              subtitle='Objetivo: Obter uma mensagem diária que inspire e te dê direção.'
            />
            <Card
              onClick={() => history.push('/tarot/tres-cartas')}
              background={back_tres_cartas}
              subtitle='Objetivo: Compreender melhor uma situação específica em sua vida.'
            />
            <Card
              onClick={() => history.push('/tarot/cinco-cartas')}
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
        videoUrl='https://www.youtube.com/embed/NBSE2mUnMFg?si=330lPgdagXS6mMfo'
      />
    </>
  );
}
