import './style.css';
import { getFiveCards } from '@/utils';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Card from '@/components/Card';

export default function FiveCards() {
  const [cards, setCards] = useState(getFiveCards());
  const history = useHistory();

  const handleNewDraw = () => {
    setCards(getFiveCards());
  };

  return (
    <>
      <div className='flex flex-col w-full h-full text-center'>
        <div className='flex justify-center items-center w-full relative'>
          <p className='text-md text-custom-gray-text break-words'>
            Estrela de Cinco Cartas como Conselho para uma Situação
          </p>
          <button className='absolute right-0 text-sm text-white bg-custom-start p-2 rounded'>
            Tutorial
          </button>
        </div>
        <p className='text-sm text-custom-gray-text'>
          Descubra novas perspectivas e insights profundos para guiar suas escolhas.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-3 gap-4 justify-items-center items-center'>
          {cards.map((card, index) => (
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
                img={card.img}
                title={card.title}
                article={card.tagline}
                suggested_music={card.suggested_music}
                blend={card.blend}
                power={card.power}
              />
            </div>
          ))}
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
    </>
  );
}
