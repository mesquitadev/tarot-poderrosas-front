import './style.css';
import { useState } from 'react';
import { getThreeCards } from '@/utils';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';

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
                affirmation={card.affirmation}
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

        <HowToPlay />
      </div>
    </div>
  );
}
