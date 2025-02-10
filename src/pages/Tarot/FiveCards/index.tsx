import './style.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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

export default function FiveCards() {
  const [cards, setCards] = useState<CardData[]>([]);
  const history = useHistory();

  const handleNewDraw = () => {
    fetchRandomCards();
  };

  const fetchRandomCards = async () => {
    try {
      const response = await api.get('/cards', {
        params: {
          limit: 5,
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
    <>
      <div className='flex flex-col w-full h-full text-center'>
        <div className='flex justify-center items-center w-full relative'>
          <p className='text-md text-custom-gray-text break-words'>
            Estrela de Cinco Cartas como Conselho para uma Situação
          </p>
        </div>
        <p className='text-sm text-custom-gray-text'>
          Descubra novas perspectivas e insights profundos para guiar suas escolhas.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-3 gap-4 justify-items-center items-start'>
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                className={`mb-4 sm:mb-0 ${
                  index === 0
                    ? 'col-start-1 sm:col-start-2 row-start-1'
                    : index === 1
                    ? 'col-start-1 row-start-2'
                    : index === 2
                    ? 'col-start-1 row-start-3 sm:col-start-2 sm:row-start-2'
                    : index === 3
                    ? 'col-start-1 row-start-4 sm:col-start-3 sm:row-start-2'
                    : 'col-start-1 row-start-5 sm:col-start-2 sm:row-start-3'
                }`}
              >
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
              </div>
            );
          })}
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
    </>
  );
}
