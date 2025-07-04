import back_carta_do_dia from '../../../assets/back-carta-do-dia.svg';
import back_tres_cartas from '../../../assets/back_tres_cartas.svg';
import back_cinco_cartas from '../../../assets/back_cinco_cartas.svg';

import './style.css';

export const Card = ({
  background,
  subtitle,
  ...rest
}: {
  background: string;
  subtitle: string;
}) => {
  return (
    <button
      {...rest}
      className='flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-3 m-2 w-full max-w-[220px] min-h-[320px] hover:shadow-lg transition-all duration-200'
    >
      <img
        src={background}
        alt='Carta do Tarot'
        className='w-full max-w-[120px] sm:max-w-[140px] md:max-w-[180px] h-auto mb-2'
      />
      <div className='w-full'>
        <p className='text-xs sm:text-sm break-words text-gray-700'>{subtitle}</p>
      </div>
    </button>
  );
};

function TwoCards() {
  return (
    <div className='flex flex-col w-full h-full text-center px-2 sm:px-8 pb-8'>
      <p className='text-md mt-4 mb-1 font-bold text-custom-primary'>Desperte sua Intuição</p>
      <p className='text-sm mb-4 text-custom-gray-text'>
        Escolha suas cartas e conecte-se com sua sabedoria interior
      </p>
      <div className='flex flex-col items-center w-full h-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl'>
          <Card
            background={back_carta_do_dia}
            subtitle='Objetivo: Obter uma mensagem diária que inspire e te dê direção.'
          />
          <Card
            background={back_tres_cartas}
            subtitle='Objetivo: Compreender melhor uma situação específica em sua vida.'
          />
          <Card
            background={back_cinco_cartas}
            subtitle='Objetivo: Receber uma visão aprofundada sobre um desafio ou decisão importante.'
          />
        </div>
      </div>
    </div>
  );
}

export default TwoCards;
