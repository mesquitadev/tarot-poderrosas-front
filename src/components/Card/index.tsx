import { useEffect, useState } from 'react';
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
  useEffect(() => {
    console.log('');
  }, []);
  return (
    <div className='flex flex-col items-center justify-center m-2 text-center w-full max-w-[400px] sm:max-w-[300px] xs:max-w-full'>
      <div
        className={`flip-card ${
          isFlipped ? 'flipped' : ''
        } w-full max-w-[400px] sm:max-w-[300px] xs:max-w-full`}
        role='region'
        aria-label='Carta do Tarot'
      >
        <div className='flip-card-inner h-full pointer-events-none'>
          <div className='flip-card-front h-full'>
            <img
              src={frontImg}
              style={{ border: '5px solid rgba(245, 158, 11, 1)', height: '100%', width: '100%' }}
              className='object-cover rounded-[15px] shadow-sm'
              alt='Front'
            />
          </div>
          <div className='flip-card-back h-full'>
            <img
              src={backImg}
              style={{ border: '5px solid rgba(245, 158, 11, 1)', height: '100%', width: '100%' }}
              className='object-cover rounded-[15px] shadow-sm'
              alt='Back'
            />
          </div>
        </div>
      </div>
      <button
        className='mt-4 px-6 py-2 rounded-lg bg-custom-primary text-white font-bold shadow hover:bg-yellow-600 transition-colors duration-200 text-base sm:text-sm w-full max-w-[300px]'
        onClick={() => setIsFlipped((f) => !f)}
        aria-pressed={isFlipped}
      >
        {isFlipped ? 'Voltar' : 'Virar carta'}
      </button>
      <p className='text-lg font-bold mt-2 break-words'>{title}</p>
      {subtitle && <p className='text-sm font-bold mt-2 break-words'>{subtitle}</p>}
      <p className='text-sm text-custom-gray-text mt-1 break-words'>
        Essa afirmação positiva é projetada para reforçar as qualidades e o tema de cada carta.
        Ajudando você a se conectar com seu poder interior e a sua jornada do autoconhecimento.{' '}
      </p>
      <p className='text-xl italic text-primary text-bold mt-1 break-words'>
        &#34;{affirmation}&#34;
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
              <span className='text-sm text-custom-gray-text'>{blend}</span>
            </p>
          </div>
        </div>
      )}
      {power && (
        <div className='mt-4'>
          <p className='text-sm text-custom-gray-text break-words'>{power}</p>
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
