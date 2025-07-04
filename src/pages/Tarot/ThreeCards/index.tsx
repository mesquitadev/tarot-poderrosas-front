import './style.css';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';
import api from '@/services';
import cardBack from '@/assets/back-card.svg';

interface CardData {
  id: number;
  card: string;
  title: string;
  subtitle: string;
  affirmation: string;
  img: string;
  suggestedMusic: string;
  blend: string;
  power: string;
}

export default function ThreeCards() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);
  const handleNewDraw = () => {
    fetchRandomCards();
  };

  const fetchRandomCards = async () => {
    try {
      const response = await api.get('/cards', {
        params: {
          limit: 3,
          random: true,
        },
      });
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching random cards:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchRandomCards();
  }, []);

  return (
    <div className='flex flex-col w-full h-full text-center px-2 sm:px-8 pb-8'>
      <div className='flex flex-col sm:flex-row justify-between items-center w-full relative mb-2 gap-2'>
        <p className='text-md text-custom-gray-text mb-2 sm:mb-0'>
          Três Cartas como Inspiração para Clarear uma Situação
        </p>
        <button
          className='sm:absolute sm:right-0 text-sm text-white bg-custom-start p-2 rounded shadow hover:bg-custom-primary transition-colors duration-200 w-full sm:w-auto'
          onClick={() => setShowTutorial(true)}
        >
          Tutorial
        </button>
      </div>
      <p className='text-sm text-custom-gray-text mb-4'>
        Receba uma mensagem única para iluminar seu dia <br /> e guiar seus passos com inspiração e
        propósito.
      </p>
      <div className='flex flex-col w-full h-full text-center'>
        <div className='flex justify-center items-center w-full relative mb-2'>
          <p className='text-md text-custom-gray-text font-bold'>Três Cartas</p>
        </div>
        <div className='flex justify-center items-center w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center w-full max-w-5xl'>
            {cards.map((card) => (
              <Card
                key={card?.id}
                affirmation={card?.affirmation}
                suggested_music={card?.suggestedMusic}
                title={card?.title}
                blend={card?.blend}
                power={card?.power}
                backImg={card?.img}
                frontImg={cardBack}
              />
            ))}
          </div>
        </div>
        <div className='flex flex-row justify-center mt-6'>
          <button
            className='bg-custom-primary hover:bg-custom-start text-white font-bold py-2 px-6 rounded shadow focus:outline-none focus:shadow-outline w-full sm:w-auto transition-colors duration-200'
            onClick={handleNewDraw}
          >
            Sortear Novas Cartas
          </button>
        </div>
      </div>
      {/* Modal de tutorial */}
      {showTutorial && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full relative'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold'
              onClick={() => setShowTutorial(false)}
            >
              ×
            </button>
            <HowToPlay />
          </div>
        </div>
      )}
    </div>
  );
}
