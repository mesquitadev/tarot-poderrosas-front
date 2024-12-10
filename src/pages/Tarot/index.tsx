import back_carta_do_dia from '../../assets/back-carta-do-dia.svg';
import back_tres_cartas from '../../assets/back_tres_cartas.svg';
import back_cinco_cartas from '../../assets/back_cinco_cartas.svg';

import './style.css';
import { useState } from 'react';

export const Card = ({
  background,
  subtitle,
  ...rest
}: {
  background: string;
  subtitle: string;
}) => {
  return (
    <button {...rest} className='justify-items-center'>
      <img src={background} alt='' />
      <div className='w-[200px]'>
        <p className='text-sm break-words'>{subtitle}</p>
      </div>
    </button>
  );
};

export default function SignUp() {
  const [flipped, setFlipped] = useState([false, false, false]);

  const handleFlip = (index: number) => {
    setFlipped((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };
  return (
    <>
      <div className='flex flex-col  w-full h-full text-center'>
        <p className='text-md'>Desperte sua Intuição</p>
        <p className='text-sm'>Escolha suas cartas e conecte-se com sua sabedoria interior</p>
        <div className='flex flex-col justify-items-center justify-center w-full h-full'>
          <div className='grid grid-cols-3 justify-around justify-items-center gap-x-4 w-full'>
            <Card
              onClick={() => handleFlip(0)}
              background={back_carta_do_dia}
              subtitle='Objetivo: Obter uma mensagem diária que inspire e te dê direção.'
            />
            <Card
              onClick={() => handleFlip(1)}
              background={back_tres_cartas}
              subtitle='Objetivo: Compreender melhor uma situação específica em sua vida.
'
            />
            <Card
              onClick={() => handleFlip(2)}
              background={back_cinco_cartas}
              subtitle='Objetivo: Receber uma visão aprofundada sobre um desafio ou decisão importante.'
            />
          </div>
        </div>
      </div>
    </>
  );
}
