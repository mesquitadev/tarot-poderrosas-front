import Card from '@/components/Card';
import api from '@/services';
import { useEffect, useState } from 'react';

interface CardData {
  card: string;
  title: string;
  subtitle: string;
  affirmation: string;
  img: string;
  suggested_music: string;
  blend: string;
  power: string;
}

const AllCards = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const fetchRandomCards = async () => {
    try {
      const response = await api.get('/cards');
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
        <p className='text-md text-custom-gray-text break-words'>Todas as Cartas</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-start'>
        {cards.map((card, index) => (
          <div key={index} className='mb-4 sm:mb-0'>
            <p className='text-sm text-custom-gray-text'>Carta {index + 1}</p>
            <Card
              img={card.img}
              title={card.title}
              affirmation={card.affirmation}
              suggested_music={card.suggested_music}
              blend={card.blend}
              power={card.power}
              subtitle={card.subtitle}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCards;