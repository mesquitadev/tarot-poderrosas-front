import './style.css';
import { useNavigate } from 'react-router';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';
import cardBack from '@/assets/back-card.svg';
import {
  useGetFiveRandomCardsQuery,
  useLazyGetFiveRandomCardsQuery,
} from '@/services/cardsApiSlice';
import {
  ArrowPathIcon,
  PencilSquareIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

export default function FiveCards() {
  const navigate = useNavigate();
  const {
    data: initialCards,
    isLoading: initialLoading,
    error: initialError,
  } = useGetFiveRandomCardsQuery();
  const [getFiveCards, { data: newCards, isLoading: newLoading, error: newError }] =
    useLazyGetFiveRandomCardsQuery();

  // Usa as cartas mais recentes (novas ou iniciais)
  const cards = newCards || initialCards || [];
  const isLoading = newLoading || initialLoading;
  const error = newError || initialError;

  const handleNewDraw = () => {
    getFiveCards();
  };

  const cardPositions = [
    { title: 'Situação', position: 'col-start-1 sm:col-start-2 row-start-1' },
    { title: 'Desafio', position: 'col-start-1 row-start-2' },
    { title: 'Você', position: 'col-start-1 row-start-3 sm:col-start-2 sm:row-start-2' },
    { title: 'Solução', position: 'col-start-1 row-start-4 sm:col-start-3 sm:row-start-2' },
    { title: 'Resultado', position: 'col-start-1 row-start-5 sm:col-start-2 sm:row-start-3' },
  ];

  return (
    <div className='flex flex-col w-full min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white'>
      {/* Header */}
      <div className='text-center py-8 px-4'>
        <div className='relative inline-block mb-4'>
          <div className='absolute -inset-2 bg-gradient-to-r from-custom-primary to-purple-600 rounded-lg blur opacity-20'></div>
          <h1 className='relative font-merryweather text-2xl md:text-3xl font-bold bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-3'>
            <StarIcon className='w-8 h-8 text-custom-primary' />O Jardim da Rosa
          </h1>
        </div>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
          Cinco cartas sagradas formam uma estrela de sabedoria, revelando todos os aspectos da sua
          jornada espiritual.
        </p>
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col justify-center items-center px-4 pb-8'>
        {isLoading ? (
          <div className='relative'>
            <div className='absolute -inset-4 bg-gradient-to-r from-custom-primary to-purple-600 rounded-full blur opacity-20 animate-pulse'></div>
            <div className='relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-100'>
              <div className='flex flex-col items-center space-y-4'>
                <StarIcon className='w-12 h-12 text-custom-primary animate-spin' />
                <p className='text-lg font-medium text-gray-700'>
                  🌹 Preparando seu Jardim da Rosa...
                </p>
                <div className='flex space-x-1'>
                  <div className='w-2 h-2 bg-custom-primary rounded-full animate-bounce'></div>
                  <div
                    className='w-2 h-2 bg-purple-600 rounded-full animate-bounce'
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className='w-2 h-2 bg-pink-600 rounded-full animate-bounce'
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className='bg-white rounded-2xl p-8 shadow-2xl border border-red-100 max-w-md w-full'>
            <div className='flex flex-col items-center space-y-4'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
                <StarIcon className='w-8 h-8 text-red-500' />
              </div>
              <h3 className='text-xl font-bold text-red-600'>Oops! Algo deu errado</h3>
              <p className='text-gray-600'>Não foi possível carregar suas cartas especiais</p>
              <button
                onClick={handleNewDraw}
                className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                <ArrowPathIcon className='w-5 h-5' />
                Tentar Novamente
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Cards in Star Formation */}
            <div className='grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-3 gap-6 justify-items-center items-start mb-8 w-full max-w-5xl'>
              {cards.map((card, index) => (
                <div
                  key={card?.id || index}
                  className={`mb-4 sm:mb-0 ${cardPositions[index]?.position} relative group`}
                >
                  <div className='absolute -inset-2 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300'></div>
                  <div className='relative'>
                    {/* Card Title */}
                    <div className='text-center mb-4'>
                      <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-custom-primary to-purple-600 text-white rounded-xl font-medium shadow-lg'>
                        <SparklesIcon className='w-4 h-4' />
                        <span>{cardPositions[index]?.title}</span>
                      </div>
                    </div>

                    <Card
                      affirmation={card?.affirmation || ''}
                      suggested_music={card?.suggestedMusic || ''}
                      title={card?.title || ''}
                      subtitle={card?.subtitle || ''}
                      blend={card?.blend || ''}
                      power={card?.power || ''}
                      backImg={card?.img || ''}
                      frontImg={cardBack}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
              <button
                onClick={handleNewDraw}
                disabled={isLoading}
                className='group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-custom-primary to-purple-600 hover:from-purple-600 hover:to-custom-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ArrowPathIcon
                  className={`w-5 h-5 ${
                    isLoading ? 'animate-spin' : 'group-hover:rotate-180'
                  } transition-transform duration-300`}
                />
                <span>{isLoading ? '🌹 Sorteando...' : 'Nova Tiragem'}</span>
              </button>

              <button
                onClick={() => navigate('/minhas-anotacoes/nova')}
                className='group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-custom-primary hover:to-purple-600 text-gray-700 hover:text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
              >
                <PencilSquareIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
                <span>Criar Anotação</span>
              </button>
            </div>

            {/* How to Play */}
            <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-2xl w-full'>
              <HowToPlay />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
