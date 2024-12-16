import './style.css';
import { useEffect, useState } from 'react';
import { getCardOfTheDay } from '@/utils';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';
export default function CardOfDay() {
  const [card, setCard] = useState(getCardOfTheDay());

  useEffect(() => {
    setCard(getCardOfTheDay());
  }, []);

  return (
    <div className='flex flex-col w-full h-full text-center'>
      <div className='flex justify-center items-center w-full relative'>
        <p className='text-md text-custom-gray-text'>Carta do Dia</p>
      </div>
      <p className='text-sm text-custom-gray-text'>
        Receba uma mensagem única para iluminar seu dia <br /> e guiar seus passos com inspiração e
        propósito.
      </p>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className=' justify-center justify-items-center gap-x-4 w-full'>
          <Card
            img={card.img}
            affirmation={card.affirmation}
            suggested_music={card.suggested_music}
            title={card.title}
            blend={card.blend}
            power={card.power}
          />
        </div>
        <HowToPlay />
      </div>
    </div>
  );
}
