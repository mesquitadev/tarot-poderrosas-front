import './style.css';
import { useState } from 'react';
import { getThreeCards } from '@/utils';

export const Card = ({
  img,
  title,
  article,
  suggested_music,
  blend,
  power,
}: {
  img: string;
  title: string;
  article: string;
  suggested_music: string;
  blend: string;
  power: string;
}) => {
  return (
    <div className='justify-items-center m-2 text-center'>
      <img src={img} className='w-80 h-80 sm:w-80 sm:h-80' alt='' />
      <p className='text-lg font-bold mt-2'>{title}</p>
      <p className='text-sm text-custom-gray-text mt-1'>{article}</p>
      {blend && (
        <div className='mt-4'>
          <p className='text-sm text-custom-gray-text'>{blend}</p>
        </div>
      )}
      {power && (
        <div className='mt-4'>
          <p className='text-sm text-custom-gray-text'>{power}</p>
        </div>
      )}
      {suggested_music && (
        <div className='mt-10'>
          <p className='mb-2'>Música Sugerida:</p>
          <iframe
            title='music'
            style={{ borderRadius: '10px' }}
            src={suggested_music}
            width='100%'
            height='130'
            frameBorder='0'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default function ThreeCards() {
  const [cards, setCards] = useState(getThreeCards());

  const handleNewDraw = () => {
    setCards(getThreeCards());
  };

  return (
    <div className='flex flex-col w-full h-full text-center'>
      <div className='flex justify-center items-center w-full relative'>
        <p className='text-md text-custom-gray-text'>
          Três Cartas como Inspiração para Clarear uma Situação
        </p>
        <button className='absolute right-0 text-sm text-white bg-custom-start p-2 rounded'>
          Tutorial
        </button>
      </div>
      <p className='text-sm text-custom-gray-text'>
        Receba uma mensagem única para iluminar seu dia <br /> e guiar seus passos com inspiração e
        propósito.
      </p>
      <div className='flex flex-col w-full h-full text-center'>
        <div className='flex justify-center items-center w-full relative'>
          <p className='text-md text-custom-gray-text'>Três Cartas</p>
        </div>
        <div className='flex justify-center items-center'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center'>
            {cards.map((card, index) => (
              <Card
                key={index}
                img={card.img}
                title={card.title}
                article={card.tagline}
                suggested_music={card.suggested_music}
                blend={card.blend}
                power={card.power}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handleNewDraw}
          className='mt-4 text-sm text-white bg-custom-start p-2 rounded'
        >
          Nova Tiragem
        </button>

        <div className='flex flex-col bg-custom-gray-light p-5 justify-start text-start rounded-md mt-10'>
          <div className='my-2'>
            <p className='text-center text-custom-gray-text'>Como Jogar?</p>
          </div>
          <ul>
            <li>
              <p className='text-sm text-custom-gray-text'>
                1. Em um ambiente tranquilo, respire profundamente e centrar-se em si mesma.
              </p>
            </li>
            <li>
              <p className='text-sm text-custom-gray-text'>
                2. Em seguida, olhe bens para todas as cartas , focando na intenção de receber uma
                mensagem que a guiará durante o dia.
              </p>
            </li>
            <li>
              <p className='text-sm text-custom-gray-text'>3. Escolha uma única carta.</p>
            </li>
            <li>
              <p className='text-sm text-custom-gray-text'>
                4. Ao revelar a carta, observe sua imagem e simbolismos. Pergunte a si mesma: "O que
                esta carta está tentando me mostrar?
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
