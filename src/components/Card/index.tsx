import { useState } from 'react';
import { tw } from '@/utils/tw';
import './styles.css';
import {
  ArrowPathIcon,
  SparklesIcon,
  HeartIcon,
  MusicalNoteIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

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

  return (
    <div className='w-full max-w-md mx-auto'>
      {/* Card Container */}
      <div className='relative group'>
        <div className='absolute -inset-1 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500'></div>

        <div className='relative bg-white rounded-3xl shadow-2xl overflow-hidden'>
          {/* Card Image Section */}
          <div className='relative'>
            <div
              className={tw('flip-card', isFlipped ? 'flipped' : '', 'w-full')}
              role='region'
              aria-label='Carta do Tarot'
            >
              <div className='flip-card-inner h-full'>
                <div className='flip-card-front h-full'>
                  <img
                    src={frontImg}
                    className={tw('object-cover w-full h-full rounded-t-3xl')}
                    alt='Frente da carta'
                  />
                </div>
                <div className='flip-card-back h-full'>
                  <img
                    src={backImg}
                    className={tw('object-cover w-full h-full rounded-t-3xl')}
                    alt='Verso da carta'
                  />
                </div>
              </div>
            </div>

            {/* Flip Button Overlay */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
              <button
                className={tw(
                  'group flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105',
                )}
                onClick={() => setIsFlipped((f) => !f)}
                aria-pressed={isFlipped}
              >
                <ArrowPathIcon
                  className={`w-4 h-4 ${
                    isFlipped ? 'rotate-180' : ''
                  } group-hover:rotate-180 transition-transform duration-300`}
                />
                <span className='text-sm'>{isFlipped ? 'Voltar' : 'Virar'}</span>
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className='p-6 space-y-6'>
            {/* Title Section */}
            <div className='text-center space-y-2'>
              <h2 className='text-xl md:text-2xl font-bold bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                {title}
              </h2>
              {subtitle && <p className='text-sm font-medium text-gray-600'>{subtitle}</p>}
            </div>

            {/* Affirmation Section */}
            {affirmation && (
              <div className='relative'>
                <div className='absolute -inset-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl'></div>
                <div className='relative bg-white rounded-2xl p-4 border border-purple-100 shadow-sm'>
                  <div className='flex items-start gap-3'>
                    <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-custom-primary to-purple-600 rounded-full flex items-center justify-center'>
                      <SparklesIcon className='w-4 h-4 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-sm font-semibold text-gray-800 mb-2'>
                        Afirmação da Rosa
                      </h3>
                      <p className='text-xs text-gray-600 mb-3 leading-relaxed'>
                        Uma mensagem especial para reforçar seu poder interior e fortalecer sua
                        jornada de autoconhecimento.
                      </p>
                      <blockquote className='text-sm italic font-medium text-gray-800 border-l-3 border-custom-primary pl-3'>
                        "{affirmation}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Blend Section */}
            {blend && (
              <div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 border border-green-100'>
                <div className='flex items-start gap-3'>
                  <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center'>
                    <HeartIcon className='w-4 h-4 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-sm font-semibold text-gray-800 mb-2'>
                      Blend Exclusivo PoderRosas
                    </h3>
                    <p className='text-xs text-gray-600 mb-2 leading-relaxed'>
                      Um chá especial para acompanhar sua reflexão sobre esta carta sagrada.
                    </p>
                    <p className='text-sm font-medium text-teal-700 bg-white/50 rounded-lg px-3 py-2'>
                      🌿 {blend}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Power Section */}
            {power && (
              <div className='bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100'>
                <div className='flex items-start gap-3'>
                  <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center'>
                    <BookOpenIcon className='w-4 h-4 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-sm font-semibold text-gray-800 mb-2'>Mensagem da Carta</h3>
                    <p className='text-sm text-gray-700 leading-relaxed'>{power}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Music Section */}
            {suggested_music && (
              <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center'>
                    <MusicalNoteIcon className='w-4 h-4 text-white' />
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold text-gray-800'>Trilha Sonora Sagrada</h3>
                    <p className='text-xs text-gray-600'>Uma música especial para sua meditação</p>
                  </div>
                </div>

                <div className='relative overflow-hidden rounded-xl shadow-sm'>
                  <iframe
                    title='Música sugerida para meditação'
                    className='w-full rounded-xl'
                    src={suggested_music}
                    width='100%'
                    height='130'
                    allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
                    loading='lazy'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
