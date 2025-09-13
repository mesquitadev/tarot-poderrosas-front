import './style.css';
import { useState } from 'react';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';
import cardBack from '@/assets/back-card.svg';
import {
  useGetThreeRandomCardsQuery,
  useLazyGetThreeRandomCardsQuery,
} from '@/services/cardsApiSlice';
import {
  SparklesIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function ThreeCards() {
  const [showTutorial, setShowTutorial] = useState(false);
  const {
    data: initialCards,
    isLoading: initialLoading,
    error: initialError,
  } = useGetThreeRandomCardsQuery();
  const [getThreeCards, { data: newCards, isLoading: newLoading, error: newError }] =
    useLazyGetThreeRandomCardsQuery();

  // Usa as cartas mais recentes (novas ou iniciais)
  const cards = newCards || initialCards || [];
  const isLoading = newLoading || initialLoading;
  const error = newError || initialError;

  const handleNewDraw = () => {
    getThreeCards();
  };

  const cardTitles = ['Passado', 'Presente', 'Futuro'];

  return (
    <div className='flex flex-col w-full min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white'>
      {/* Header */}
      <div className='text-center py-8 px-4'>
        <div className='flex flex-col sm:flex-row justify-between items-center max-w-6xl mx-auto gap-4'>
          <div className='text-left'>
            <div className='relative inline-block mb-2'>
              <div className='absolute -inset-2 bg-gradient-to-r from-custom-primary to-purple-600 rounded-lg blur opacity-20'></div>
              <h1 className='relative font-merryweather text-2xl md:text-3xl font-bold bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                O Buquê da Rosa
              </h1>
            </div>
            <p className='text-gray-600 text-left'>
              Três cartas sagradas revelam sua jornada: passado, presente e futuro em harmonia.
            </p>
          </div>

          <button
            onClick={() => setShowTutorial(true)}
            className='group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-custom-primary hover:to-purple-600 text-gray-700 hover:text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
          >
            <QuestionMarkCircleIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
            <span>Tutorial</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col justify-center items-center px-4 pb-8'>
        {isLoading ? (
          <div className='relative'>
            <div className='absolute -inset-4 bg-gradient-to-r from-custom-primary to-purple-600 rounded-full blur opacity-20 animate-pulse'></div>
            <div className='relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-100'>
              <div className='flex flex-col items-center space-y-4'>
                <SparklesIcon className='w-12 h-12 text-custom-primary animate-spin' />
                <p className='text-lg font-medium text-gray-700'>
                  🌹 Preparando seu Buquê da Rosa...
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
                <SparklesIcon className='w-8 h-8 text-red-500' />
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
            {/* Cards Grid */}
            <div className='w-full max-w-6xl mb-8'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center'>
                {cards.map((card, index) => (
                  <div key={card?.id || index} className='relative group'>
                    <div className='absolute -inset-2 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300'></div>
                    <div className='relative'>
                      {/* Card Title */}
                      <div className='text-center mb-4'>
                        <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-custom-primary to-purple-600 text-white rounded-xl font-medium shadow-lg'>
                          <SparklesIcon className='w-4 h-4' />
                          <span>{cardTitles[index]}</span>
                        </div>
                      </div>

                      <Card
                        affirmation={card?.affirmation}
                        suggested_music={card?.suggestedMusic}
                        title={card?.title}
                        blend={card?.blend}
                        power={card?.power}
                        backImg={card?.img}
                        frontImg={cardBack}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleNewDraw}
              disabled={isLoading}
              className='group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-custom-primary to-purple-600 hover:from-purple-600 hover:to-custom-primary text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg'
            >
              <ArrowPathIcon
                className={`w-6 h-6 ${
                  isLoading ? 'animate-spin' : 'group-hover:rotate-180'
                } transition-transform duration-300`}
              />
              <span>{isLoading ? '🌹 Sorteando...' : 'Sortear Novas Cartas'}</span>
            </button>
          </>
        )}
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
          <div className='relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[80vh] overflow-y-auto'>
            <div className='sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl'>
              <div className='flex items-center justify-between'>
                <h3 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                  <QuestionMarkCircleIcon className='w-6 h-6 text-custom-primary' />
                  Como Jogar
                </h3>
                <button
                  onClick={() => setShowTutorial(false)}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                >
                  <XMarkIcon className='w-6 h-6 text-gray-500 hover:text-red-500' />
                </button>
              </div>
            </div>

            <div className='p-6'>
              <HowToPlay />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
