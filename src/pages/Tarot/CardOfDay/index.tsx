// @ts-nocheck
import './style.css';
import { useState } from 'react';
import Card from '@/components/Card';
import HowToPlay from '@/components/HowToPlay';
import AddNoteModal from '@/components/AddNoteModal';
import cardBack from '@/assets/back-card.svg';
import { useGetRandomCardQuery, useLazyGetRandomCardQuery } from '@/services/cardsApiSlice';
import {
  ArrowPathIcon,
  PencilSquareIcon,
  SparklesIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

export default function CardOfDay() {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const { data: cards, isLoading: loading, error } = useGetRandomCardQuery();
  const [triggerRefetch] = useLazyGetRandomCardQuery();

  const handleNewDraw = () => {
    triggerRefetch();
  };

  if (loading) {
    return (
      <div className='flex flex-col w-full h-screen justify-center items-center text-center bg-gradient-to-br from-purple-50 via-pink-50 to-white'>
        <div className='relative'>
          <div className='absolute -inset-4 bg-gradient-to-r from-custom-primary to-purple-600 rounded-full blur opacity-20 animate-pulse'></div>
          <div className='relative bg-white rounded-2xl p-8 shadow-2xl border border-gray-100'>
            <div className='flex flex-col items-center space-y-4'>
              <SunIcon className='w-12 h-12 text-custom-primary animate-spin' />
              <p className='text-lg font-medium text-gray-700'>
                🌹 Preparando sua Rosa do Momento...
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
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col w-full h-screen justify-center items-center text-center bg-gradient-to-br from-purple-50 via-pink-50 to-white px-4'>
        <div className='bg-white rounded-2xl p-8 shadow-2xl border border-red-100 max-w-md w-full'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
              <SparklesIcon className='w-8 h-8 text-red-500' />
            </div>
            <h3 className='text-xl font-bold text-red-600'>Oops! Algo deu errado</h3>
            <p className='text-gray-600'>Não foi possível carregar sua carta especial</p>
            <button
              onClick={handleNewDraw}
              className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
            >
              <ArrowPathIcon className='w-5 h-5' />
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white'>
      {/* Header */}
      <div className='text-center py-8 px-4'>
        <div className='relative inline-block mb-4'>
          <div className='absolute -inset-2 bg-gradient-to-r from-custom-primary to-purple-600 rounded-lg blur opacity-20'></div>
          <h1 className='relative font-merryweather text-3xl md:text-4xl font-bold bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-3'>
            <SunIcon className='w-8 h-8 text-custom-primary' />A Rosa do Momento
          </h1>
        </div>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
          Receba uma mensagem única para iluminar seu dia e guiar seus passos com inspiração, amor e
          propósito divino.
        </p>
      </div>

      {/* Card Section */}
      <div className='flex-1 flex flex-col justify-center items-center px-4 pb-8'>
        <div className='w-full flex justify-center mb-8'>
          <div className='w-full max-w-[400px] relative'>
            <div className='absolute -inset-4 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 rounded-3xl blur opacity-20'></div>
            <div className='relative'>
              <Card
                affirmation={cards[0]?.affirmation}
                suggested_music={cards[0]?.suggestedMusic}
                title={cards[0]?.title}
                subtitle={cards[0]?.subtitle}
                blend={cards[0]?.blend}
                power={cards[0]?.power}
                backImg={cards[0]?.img}
                frontImg={cardBack}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 mb-8'>
          <button
            onClick={handleNewDraw}
            disabled={loading}
            className='group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-custom-primary to-purple-600 hover:from-purple-600 hover:to-custom-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ArrowPathIcon
              className={`w-5 h-5 ${
                loading ? 'animate-spin' : 'group-hover:rotate-180'
              } transition-transform duration-300`}
            />
            <span>{loading ? 'Renovando...' : 'Nova Tiragem'}</span>
          </button>

          <button
            onClick={() => setIsAddNoteOpen(true)}
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
      </div>

      {/* Modal otimizado: renderiza apenas quando aberto, fora do fluxo principal */}
      {isAddNoteOpen && (
        <AddNoteModal
          isOpen={isAddNoteOpen}
          onClose={() => setIsAddNoteOpen(false)}
          defaultTitle={cards[0]?.title ? `Carta do Dia: ${cards[0]?.title}` : ''}
        />
      )}
    </div>
  );
}
