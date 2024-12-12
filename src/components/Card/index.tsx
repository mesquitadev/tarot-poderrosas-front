const Card = ({
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
    <div className='card w-80 sm:w-60 text-start m-2'>
      <img src={img} className='w-full h-80 sm:h-60' alt='' />
      <p className='text-lg font-bold mt-2'>{title}</p>
      <p className='text-sm text-custom-gray-text mt-1'>{article}</p>
      {blend && (
        <div>
          <p className='my-5 text-sm'>
            Como sugestão para refletir sobre essa carta, tome o blend abaixo e ouça a música
            relacionada à sua carta escolhida.
          </p>
          <div className='mt-4'>
            <p className='text-sm text-custom-gray-text'>{blend}</p>
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
            frameBorder='0'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
        </div>
      )}
    </div>
  );
};
export default Card;

// export const Card = ({
//   img,
//   title,
//   article,
//   suggested_music,
//   blend,
//   power,
// }: {
//   img: string;
//   title: string;
//   article: string;
//   suggested_music: string;
//   blend: string;
//   power: string;
// }) => {
//   return (
//     <div className='justify-items-center m-2 text-center'>
//       <img src={img} className='w-80 h-80 sm:w-80 sm:h-80' alt='' />
//       <p className='text-lg font-bold mt-2'>{title}</p>
//       <p className='text-sm text-custom-gray-text mt-1'>{article}</p>
//       {blend && (
//         <div className='mt-4'>
//           <p className='text-sm text-custom-gray-text'>{blend}</p>
//         </div>
//       )}
//       {power && (
//         <div className='mt-4'>
//           <p className='text-sm text-custom-gray-text'>{power}</p>
//         </div>
//       )}
//       {suggested_music && (
//         <div className='mt-10'>
//           <p className='mb-2'>Música Sugerida:</p>
//           <iframe
//             title='music'
//             style={{ borderRadius: '10px' }}
//             src={suggested_music}
//             width='100%'
//             height='130'
//             frameBorder='0'
//             allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
//             loading='lazy'
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// };
