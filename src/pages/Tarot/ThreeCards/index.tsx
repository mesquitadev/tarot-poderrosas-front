import './style.css';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';
import api from '@/services';
import { useHistory } from 'react-router';
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
  const history = useHistory();
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
        <div className='flex flex-row justify-center'>
          <button
            onClick={handleNewDraw}
            className='mt-4 text-sm text-white bg-custom-start p-2 rounded mr-5'
          >
            Nova Tiragem
          </button>

          <button
            onClick={() => history.push('/minhas-anotacoes/nova')}
            className='mt-4 text-sm text-white bg-custom-start p-2 rounded'
          >
            Criar Anotação
          </button>
        </div>
        <HowToPlay />
      </div>
    </div>
  );
}
