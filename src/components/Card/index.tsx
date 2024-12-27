const Card = ({
  img,
  title,
  subtitle,
  affirmation,
  suggested_music,
  blend,
  power,
}: {
  img: string;
  title: string;
  subtitle?: string;
  affirmation: string;
  suggested_music: string;
  blend: string;
  power: string;
  incense?: string;
}) => {
  return (
    <div className='justify-items-center m-2 text-center'>
      <img src={img} className='w-full' alt='' />
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
