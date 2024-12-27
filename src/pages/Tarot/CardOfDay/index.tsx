import './style.css';
import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';
import api from '@/services';
import { useHistory } from 'react-router';

interface CardData {
  card: string;
  title: string;
  subtitle: string;
  affirmation: string;
  img: string;
  suggested_music: string;
  blend: string;
  power: string;
  incense: string;
}
export default function CardOfDay() {
  const [card, setCard] = useState<CardData[]>([]);
  const history = useHistory();

  const handleNewDraw = () => {
    fetchRandomCards();
  };

  const fetchRandomCards = async () => {
    try {
      const response = await api.get('/cards', {
        params: {
          limit: 1,
          random: true,
        },
      });
      setCard(response.data);
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
        <p className='text-md text-custom-gray-text'>Carta do Dia</p>
      </div>
      <p className='text-sm text-custom-gray-text'>
        Receba uma mensagem única para iluminar seu dia <br /> e guiar seus passos com inspiração e
        propósito.
      </p>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className=' justify-center justify-items-center gap-x-4 w-full'>
          <Card
            img={card[0]?.img}
            affirmation={card[0]?.affirmation}
            suggested_music={card[0]?.suggested_music}
            title={card[0]?.title}
            blend={card[0]?.blend}
            power={card[0]?.power}
          />
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
