import { useState } from 'react';
import './styles.css';

const Card = ({
  frontImg,
  backImg,
  title,
  subtitle,
  affirmation,
  suggested_music,
  blend,
  power,
}: {
  frontImg: string;
  backImg: string;
  title: string;
  subtitle?: string;
  affirmation: string;
  suggested_music: string;
  blend: string;
  power: string;
  incense?: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleFlip();
    }
  };

  return (
    <div className='justify-items-center m-2 text-center max-w-[400px]'>
      <div
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        role='button'
        tabIndex={0}
      >
        <div className='flip-card-inner'>
          <div className='flip-card-front'>
            <img
              src={frontImg}
              style={{ borderColor: 'rgba(245, 158, 11, 1)' }}
              className='border-[5px] min-w-[400px] rounded-[15px] shadow-sm'
              alt='Front'
            />
          </div>
          <div className='flip-card-back'>
            <img
              src={backImg}
              style={{ borderColor: 'rgba(245, 158, 11, 1)' }}
              className=' border-[5px] rounded-[15px] shadow-sm min-w-[400px]'
              alt='Back'
            />
          </div>
        </div>
      </div>
      <p className='text-lg font-bold mt-2'>{title}</p>
      <p className='text-sm font-bold mt-2'>{subtitle}</p>
      <p className='text-sm text-custom-gray-text mt-1'>
        Essa afirmação positiva é projetada para reforçar as qualidades e o tema de cada carta.
        Ajudando você a se conectar com seu poder interior e a sua jornada do autoconhecimento.{' '}
        {affirmation}
      </p>
      {blend && (
        <div>
          <p className='my-5 text-sm'>
            Como sugestão para refletir sobre essa carta, tome o blend abaixo e ouça a música
            relacionada à sua carta escolhida.
          </p>
          <div className='mt-4'>
            <p className='text-sm text-custom-start'>
              Blend de chás exclusivo das PoderRosas:{' '}
              <p className='text-sm text-custom-gray-text'>{blend}</p>
            </p>
          </div>
        </div>
      )}
      {power && (
        <div className='mt-4'>
          <p className='text-sm text-custom-gray-text'>{power}</p>
        </div>
      )}
      {suggested_music && (
        <div className='mt-10 w-full'>
          <iframe
            title='music'
            style={{ borderRadius: '10px' }}
            src={suggested_music}
            width='100%'
            height='130'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Card;
