import './style.css';
import { getFiveCards } from '@/utils';
import { useState } from 'react';

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
        <div className='mt-10 w-full h-full'>
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

export default function FiveCards() {
  const [cards, setCards] = useState(getFiveCards());

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

        <div className='flex flex-col justify-around items-center w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 justify-items-center'>
            {cards.map((card, index) => (
              <div key={index} className='flex justify-center items-center'>
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
                  4. Ao revelar a carta, observe sua imagem e simbolismos. Pergunte a si mesma: "O
                  que esta carta está tentando me mostrar?
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
