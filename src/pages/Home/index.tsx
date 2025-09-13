// @ts-nocheck
import { addDays, format, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import banner from '../../assets/Topo_PoderRosa_Aprovar.svg';
import uma_carta from '../../assets/uma-carta.svg';
import tres_cartas from '../../assets/tres-cartas.svg';
import cinco_cartas from '../../assets/estrela-cinco-cartas.svg';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { getPhraseOfDay } from '@/utils';
import { useGetMissionsQuery } from '@/services/missionsApiSlice';
import { useGetDiaryEntriesQuery } from '@/services/diaryApiSlice';
import ShareButtons from '@/components/ShareButtons';
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  FireIcon,
  HeartIcon,
  LightBulbIcon,
  LinkIcon,
  PencilSquareIcon,
  PlusIcon,
  ShareIcon,
  SparklesIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

const WeekDays = () => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const currentDayIndex = (new Date().getDay() + 6) % 7;

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(currentDayIndex);
  const [mission, setMission] = useState<any>(null);

  const { data: missions = [] } = useGetMissionsQuery();

  useEffect(() => {
    if (currentDayIndex === selectedDayIndex) {
      const date = addDays(startDate, currentDayIndex);
      const formattedDate = format(date, 'd');
      const currentMission = missions.find((m) => m.day === Number(formattedDate));
      setMission(currentMission);
    }
  }, [currentDayIndex, selectedDayIndex, startDate, missions]);

  const handleDayClick = (index: number) => {
    setSelectedDayIndex(index);
    const date = addDays(startDate, index);
    const formattedDate = format(date, 'd');
    const selectedMission = missions.find((m) => m.day === Number(formattedDate));
    setMission(selectedMission);
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap justify-center gap-2'>
        {daysOfWeek.map((day, index) => {
          const date = addDays(startDate, index);
          const isToday = index === currentDayIndex;
          const isSelected = index === selectedDayIndex;

          return (
            <button
              key={index}
              onClick={() => handleDayClick(index)}
              className={`relative p-3 py-4 rounded-xl min-w-[85px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                isSelected
                  ? 'bg-gradient-to-br from-custom-start to-custom-primary text-white shadow-lg'
                  : 'bg-white text-custom-start border-2 border-gray-100 hover:border-custom-primary/30'
              }`}
            >
              {isToday && (
                <div className='absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse'></div>
              )}
              <p className='font-raleway text-sm font-medium'>{day}</p>
              <p className='font-raleway text-lg font-bold'>
                {format(date, 'd', { locale: ptBR })}
              </p>
            </button>
          );
        })}
      </div>

      {mission && (
        <div className='mt-4 w-full bg-gradient-to-r from-white to-purple-50 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl'>
          <div className='flex items-start p-6 relative'>
            <div className='absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-custom-start to-custom-primary'></div>
            <div className='ml-6 flex-1'>
              <div className='flex items-center gap-3 mb-2'>
                <CalendarDaysIcon className='w-5 h-5 text-custom-primary' />
                <p className='text-xl font-semibold text-custom-start'>{mission.title}</p>
              </div>
              <p className='text-custom-start/80 leading-relaxed mb-4'>{mission.task}</p>

              {/* Botões de Compartilhamento */}
              <div className='flex items-center gap-2'>
                <span className='text-sm text-gray-600 mr-2'>Compartilhar:</span>
                <ShareButton
                  title={`Desafio do Dia: ${mission.title}`}
                  text={`✨ ${mission.task}\n\nAcompanhe meus desafios diários no Poder Rosa!`}
                  platform='whatsapp'
                  className='p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200'
                >
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
                  </svg>
                </ShareButton>

                <ShareButton
                  title={`Desafio do Dia: ${mission.title}`}
                  text={`✨ ${mission.task}\n\nAcompanhe meus desafios diários no Poder Rosa!`}
                  platform='twitter'
                  className='p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200'
                >
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                  </svg>
                </ShareButton>

                <CopyLinkButton
                  text={`✨ Desafio do Dia: ${mission.title}\n\n${mission.task}\n\nAcompanhe meus desafios diários no Poder Rosa! 🌹`}
                  className='p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200'
                >
                  <LinkIcon className='w-4 h-4' />
                </CopyLinkButton>
              </div>
            </div>
            <StarIcon className='w-8 h-8 text-yellow-400 ml-4' />
          </div>
        </div>
      )}
    </div>
  );
};

// Componentes de Compartilhamento
interface ShareButtonProps {
  title: string;
  text: string;
  platform: 'whatsapp' | 'twitter' | 'instagram' | 'facebook';
  className: string;
  children: React.ReactNode;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  platform,
  className,
  children,
}) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);

    try {
      // Usar Web Share API se disponível
      if (navigator.share && platform === 'whatsapp') {
        await navigator.share({
          title,
          text,
        });
        return;
      }

      // URLs específicas para cada plataforma
      const shareUrls = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        instagram: `https://www.instagram.com/`, // Instagram não permite compartilhamento direto via URL
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          window.location.href,
        )}&quote=${encodeURIComponent(text)}`,
      };

      if (platform === 'instagram') {
        // Para Instagram, copiar o texto para a área de transferência
        await navigator.clipboard.writeText(text);
        alert('Texto copiado! Cole no Instagram para compartilhar 📱✨');
      } else {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      // Fallback: copiar para área de transferência
      try {
        await navigator.clipboard.writeText(text);
        alert('Texto copiado para a área de transferência! 📋✨');
      } catch (clipboardError) {
        console.error('Erro ao copiar:', clipboardError);
      }
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={`${className} ${isSharing ? 'animate-pulse' : ''} relative overflow-hidden`}
      title={`Compartilhar no ${platform}`}
    >
      {isSharing ? (
        <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
      ) : (
        children
      )}
    </button>
  );
};

interface CopyLinkButtonProps {
  text: string;
  className: string;
  children: React.ReactNode;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ text, className, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
      // Fallback para browsers mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`${className} relative overflow-hidden`}
      title='Copiar texto'
    >
      {isCopied ? <CheckIcon className='w-5 h-5' /> : children}
      {isCopied && (
        <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap'>
          Copiado! ✨
        </div>
      )}
    </button>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [phraseOfDay] = useState<any>(getPhraseOfDay());

  const {
    data: annotations = [],
    isLoading: annotationsLoading,
    error: annotationsError,
  } = useGetDiaryEntriesQuery();

  return (
    <div className='space-y-8 pb-8'>
      {/* Seção Principal - Banner e Navegação Tarô */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Banner Principal */}
        <div className='lg:col-span-2 relative group overflow-hidden rounded-2xl shadow-xl'>
          <img
            src={banner}
            alt='Banner do poderrosa'
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent'></div>
        </div>

        {/* Cards de Navegação Tarô */}
        <div className='space-y-1'>
          <div className='flex items-center gap-2 mb-6'>
            <SparklesIcon className='w-6 h-6 text-custom-primary' />
            <h2 className='text-2xl font-merryweather text-custom-primary font-semibold'>
              Desperte sua Intuição
            </h2>
          </div>

          <div className='space-y-4'>
            <button
              onClick={() => navigate('/tarot/carta-do-dia')}
              className='group w-full bg-gradient-to-r from-custom-primary to-custom-start rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center'
            >
              <div className='flex-shrink-0 p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all duration-300'>
                <img src={uma_carta} alt='Icone de uma Carta' className='w-8 h-8' />
              </div>
              <div className='ml-4 text-left'>
                <h3 className='text-lg font-semibold mb-1'>Carta do Dia</h3>
                <p className='text-white/90 text-sm leading-relaxed'>
                  Encontre inspiração no que está ao seu redor agora.
                </p>
              </div>
              <LightBulbIcon className='w-5 h-5 ml-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300' />
            </button>

            <button
              onClick={() => navigate('/tarot/tres-cartas')}
              className='group w-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center'
            >
              <div className='flex-shrink-0 p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all duration-300'>
                <img src={tres_cartas} alt='Icone das Três cartas' className='w-8 h-8' />
              </div>
              <div className='ml-4 text-left'>
                <h3 className='text-lg font-semibold mb-1'>Três Cartas</h3>
                <p className='text-white/90 text-sm leading-relaxed'>
                  Descubra novas perspectivas sobre o seu momento.
                </p>
              </div>
              <BookOpenIcon className='w-5 h-5 ml-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300' />
            </button>

            <button
              onClick={() => navigate('/tarot/cinco-cartas')}
              className='group w-full bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center'
            >
              <div className='flex-shrink-0 p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-all duration-300'>
                <img src={cinco_cartas} alt='Icone das Cinco cartas' className='w-8 h-8' />
              </div>
              <div className='ml-4 text-left'>
                <h3 className='text-lg font-semibold mb-1'>Estrela de Cinco Cartas</h3>
                <p className='text-white/90 text-sm leading-relaxed'>
                  Interações e conexões entre duas pessoas.
                </p>
              </div>
              <StarIcon className='w-5 h-5 ml-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300' />
            </button>
          </div>
        </div>
      </div>

      {/* Seção Desafio e Anotações */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Desafio Diário */}
        <div className='bg-white rounded-2xl p-6 shadow-lg'>
          <div className='flex items-center gap-3 mb-6'>
            <CalendarDaysIcon className='w-6 h-6 text-custom-primary' />
            <h2 className='text-2xl font-merryweather text-custom-primary font-semibold'>
              Desafio Diário
            </h2>
          </div>
          <WeekDays />
        </div>

        {/* Minhas Anotações - Versão Premium */}
        <div className='bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 rounded-3xl shadow-2xl overflow-hidden border border-purple-100/50'>
          {/* Cabeçalho Sofisticado */}
          <div className='relative bg-white/80 backdrop-blur-sm p-6 border-b border-purple-100/50'>
            {/* Decoração de fundo */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-custom-primary/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16'></div>
            <div className='absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 rounded-full translate-y-10 -translate-x-10'></div>

            <div className='relative z-10 flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='relative'>
                  <div className='p-3 bg-gradient-to-br from-custom-primary to-purple-600 rounded-2xl shadow-lg'>
                    <PencilSquareIcon className='w-7 h-7 text-white' />
                  </div>
                  {annotations.length > 0 && (
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
                      <span className='text-xs font-bold text-white'>{annotations.length}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className='text-2xl font-merryweather text-custom-primary font-bold mb-1'>
                    Minhas Anotações
                  </h2>
                  <div className='flex items-center gap-4 text-sm'>
                    <div className='flex items-center gap-1 text-gray-600'>
                      <DocumentTextIcon className='w-4 h-4' />
                      <span className='font-medium'>
                        {annotations.length} {annotations.length === 1 ? 'reflexão' : 'reflexões'}
                      </span>
                    </div>
                    {annotations.length > 0 && (
                      <div className='flex items-center gap-1 text-gray-600'>
                        <ClockIcon className='w-4 h-4' />
                        <span>
                          Última:{' '}
                          {format(new Date(annotations[0]?.createdAt || new Date()), 'dd/MM')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                {annotations.length > 0 && (
                  <button
                    onClick={() => navigate('/minhas-anotacoes')}
                    className='group flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 text-gray-700 hover:text-gray-900'
                  >
                    <EyeIcon className='w-4 h-4' />
                    <span className='text-sm font-medium'>Ver todas</span>
                  </button>
                )}
                <button
                  onClick={() => navigate('/minhas-anotacoes/nova')}
                  className='group flex items-center gap-2 bg-gradient-to-r from-custom-primary to-purple-600 text-white px-5 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105'
                >
                  <PlusIcon className='w-4 h-4 group-hover:rotate-90 transition-transform duration-300' />
                  <span className='text-sm font-semibold'>Nova Anotação</span>
                </button>
              </div>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className='p-6'>
            {annotationsLoading ? (
              <div className='flex flex-col justify-center items-center min-h-[350px] text-center'>
                <div className='relative mb-6'>
                  <div className='w-16 h-16 border-4 border-custom-primary/20 border-t-custom-primary rounded-full animate-spin'></div>
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <HeartIcon className='w-8 h-8 text-custom-primary animate-pulse' />
                  </div>
                </div>
                <div className='space-y-3'>
                  <h3 className='text-lg font-semibold text-gray-700'>
                    Carregando suas memórias...
                  </h3>
                  <p className='text-gray-500 max-w-xs leading-relaxed'>
                    🌹 Preparando suas reflexões e pensamentos especiais
                  </p>
                </div>
                <div className='flex justify-center space-x-1 mt-4'>
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className='w-2 h-2 bg-custom-primary rounded-full animate-pulse'
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            ) : annotationsError ? (
              <div className='flex flex-col justify-center items-center min-h-[350px]'>
                <div className='bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl text-center max-w-sm'>
                  <div className='w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>😔</span>
                  </div>
                  <h3 className='text-lg font-semibold text-red-800 mb-2'>
                    Oops! Algo não deu certo
                  </h3>
                  <p className='text-red-600 mb-4 text-sm leading-relaxed'>
                    Não conseguimos carregar suas anotações no momento
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors duration-300'
                  >
                    Tentar novamente
                  </button>
                </div>
              </div>
            ) : annotations.length > 0 ? (
              <div className='space-y-6'>
                {/* Estatísticas Rápidas */}
                <div className='grid grid-cols-3 gap-3'>
                  <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center'>
                    <ChartBarIcon className='w-5 h-5 text-blue-600 mx-auto mb-1' />
                    <p className='text-2xl font-bold text-blue-700'>{annotations.length}</p>
                    <p className='text-xs text-blue-600'>Total</p>
                  </div>
                  <div className='bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center'>
                    <FireIcon className='w-5 h-5 text-green-600 mx-auto mb-1' />
                    <p className='text-2xl font-bold text-green-700'>
                      {
                        annotations.filter((a) => {
                          const days = Math.floor(
                            (new Date().getTime() - new Date(a.createdAt).getTime()) /
                              (1000 * 60 * 60 * 24),
                          );
                          return days <= 7;
                        }).length
                      }
                    </p>
                    <p className='text-xs text-green-600'>Esta semana</p>
                  </div>
                  <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center'>
                    <HeartIcon className='w-5 h-5 text-purple-600 mx-auto mb-1' />
                    <p className='text-2xl font-bold text-purple-700'>
                      {Math.ceil(annotations.length / 7)}
                    </p>
                    <p className='text-xs text-purple-600'>Semanas</p>
                  </div>
                </div>

                {/* Cards das Anotações */}
                <div className='space-y-4'>
                  {annotations.slice(0, 3).map((annotation: any, index: number) => {
                    const configs = [
                      {
                        gradient: 'from-violet-600 via-purple-600 to-blue-600',
                        icon: ChatBubbleLeftEllipsisIcon,
                        badge: 'Reflexão',
                        bgDecor: 'bg-white/20',
                      },
                      {
                        gradient: 'from-rose-500 via-pink-500 to-purple-600',
                        icon: HeartIcon,
                        badge: 'Gratidão',
                        bgDecor: 'bg-white/20',
                      },
                      {
                        gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
                        icon: LightBulbIcon,
                        badge: 'Insight',
                        bgDecor: 'bg-white/20',
                      },
                    ];

                    const config = configs[index % configs.length];
                    const IconComponent = config.icon;
                    const daysSince = Math.floor(
                      (new Date().getTime() - new Date(annotation.createdAt).getTime()) /
                        (1000 * 60 * 60 * 24),
                    );

                    return (
                      <div
                        key={annotation.id}
                        onClick={() => navigate('/minhas-anotacoes')}
                        className={`group relative bg-gradient-to-br ${config.gradient} p-6 rounded-2xl shadow-xl text-white transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden`}
                      >
                        {/* Elementos Decorativos */}
                        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300'></div>
                        <div
                          className={`absolute -top-6 -right-6 w-24 h-24 ${config.bgDecor} rounded-full transition-transform duration-500 group-hover:scale-110`}
                        ></div>
                        <div
                          className={`absolute -bottom-4 -left-4 w-16 h-16 ${config.bgDecor} rounded-full transition-transform duration-500 group-hover:scale-90`}
                        ></div>
                        <div className='absolute top-2 right-2 w-2 h-2 bg-white/40 rounded-full animate-pulse'></div>

                        {/* Conteúdo */}
                        <div className='relative z-10'>
                          {/* Header */}
                          <div className='flex items-start justify-between mb-4'>
                            <div className='flex-1'>
                              <div className='flex items-center gap-3 mb-3'>
                                <span className='inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold'>
                                  {config.badge}
                                </span>
                                <div className='flex items-center gap-1 text-white/80'>
                                  <ClockIcon className='w-3 h-3' />
                                  <span className='text-xs'>
                                    {daysSince === 0 ? 'Hoje' : `${daysSince}d atrás`}
                                  </span>
                                </div>
                              </div>
                              <h3 className='font-bold text-xl text-white leading-tight mb-2 line-clamp-2'>
                                {annotation.title}
                              </h3>
                            </div>
                            <div
                              className={`flex-shrink-0 p-3 ${config.bgDecor} backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-all duration-300 ml-4`}
                            >
                              <IconComponent className='w-6 h-6 text-white' />
                            </div>
                          </div>

                          {/* Prévia do Conteúdo */}
                          <div
                            className='text-white/90 text-sm leading-relaxed line-clamp-3 mb-4'
                            dangerouslySetInnerHTML={{ __html: annotation.content }}
                          />

                          {/* Footer */}
                          <div className='flex items-center justify-between pt-3 border-t border-white/20'>
                            <div className='text-white/80 text-xs'>
                              {format(new Date(annotation.createdAt), "d 'de' MMMM 'às' HH:mm", {
                                locale: ptBR,
                              })}
                            </div>
                            <div className='flex items-center gap-2 text-white/90 group-hover:text-white transition-colors duration-300'>
                              <span className='text-sm font-medium'>Ler mais</span>
                              <ArrowRightIcon className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer de Ações */}
                {annotations.length > 3 && (
                  <div className='pt-6 border-t border-purple-100'>
                    <button
                      onClick={() => navigate('/minhas-anotacoes')}
                      className='group w-full flex items-center justify-center gap-3 p-5 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-300 transition-all duration-300'
                    >
                      <BookOpenIcon className='w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300' />
                      <div className='text-center'>
                        <p className='text-purple-700 font-semibold'>
                          Ver todas as {annotations.length} anotações
                        </p>
                        <p className='text-purple-600 text-sm'>
                          Explore todo seu universo de reflexões
                        </p>
                      </div>
                      <ArrowRightIcon className='w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform duration-300' />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center min-h-[350px] text-center p-8'>
                {/* Estado Vazio Inspirador */}
                <div className='relative mb-8'>
                  <div className='w-24 h-24 bg-gradient-to-br from-custom-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl flex items-center justify-center'>
                    <PencilSquareIcon className='w-12 h-12 text-custom-primary/60' />
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
                    <SparklesIcon className='w-4 h-4 text-white' />
                  </div>
                </div>

                <div className='space-y-4 max-w-md'>
                  <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                    Suas primeiras palavras estão esperando
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    Transforme pensamentos em palavras, momentos em memórias. Comece sua jornada de
                    autodescoberta hoje mesmo.
                  </p>

                  <div className='grid grid-cols-3 gap-3 my-6 text-center'>
                    <div className='p-3 bg-blue-50 rounded-xl'>
                      <HeartIcon className='w-6 h-6 text-blue-500 mx-auto mb-2' />
                      <p className='text-xs text-blue-700 font-medium'>Reflexões</p>
                    </div>
                    <div className='p-3 bg-purple-50 rounded-xl'>
                      <LightBulbIcon className='w-6 h-6 text-purple-500 mx-auto mb-2' />
                      <p className='text-xs text-purple-700 font-medium'>Insights</p>
                    </div>
                    <div className='p-3 bg-pink-50 rounded-xl'>
                      <StarIcon className='w-6 h-6 text-pink-500 mx-auto mb-2' />
                      <p className='text-xs text-pink-700 font-medium'>Gratidão</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/minhas-anotacoes/nova')}
                    className='group inline-flex items-center gap-3 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold text-lg'
                  >
                    <PlusIcon className='w-6 h-6 group-hover:rotate-90 transition-transform duration-300' />
                    <span>Criar primeira anotação</span>
                    <SparklesIcon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mensagem do Dia */}
      {phraseOfDay && (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg'>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-3'>
              <LightBulbIcon className='w-8 h-8 text-custom-primary' />
              <h2 className='text-3xl font-merryweather text-custom-primary font-bold'>
                Mensagem do Dia
              </h2>
            </div>

            {/* Botões de Compartilhamento da Mensagem */}
            <div className='flex items-center gap-2'>
              <ShareIcon className='w-5 h-5 text-gray-600 mr-2' />
              <div className='flex gap-2 overflow-x-auto scrollbar-hide pb-2'>
                <ShareButton
                  title='Mensagem Inspiradora do Dia'
                  text={`💝 "${phraseOfDay?.quote}"\n\n— ${phraseOfDay?.author}\n\nEncontre mais inspirações no Poder Rosa! 🌹✨`}
                  platform='whatsapp'
                  className='flex-shrink-0 p-2 sm:p-3 bg-green-500 hover:bg-green-600 text-white rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 shadow-md hover:shadow-lg'
                >
                  <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488' />
                  </svg>
                </ShareButton>

                <ShareButton
                  title='Mensagem Inspiradora do Dia'
                  text={`💝 "${phraseOfDay?.quote}"\n\n— ${phraseOfDay?.author}\n\nEncontre mais inspirações no Poder Rosa! 🌹✨`}
                  platform='instagram'
                  className='flex-shrink-0 p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 sm:hover:scale-110 shadow-md hover:shadow-lg'
                >
                  <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                  </svg>
                </ShareButton>
              </div>

              <CopyLinkButton
                text={`💝 "${phraseOfDay?.quote}"\n\n— ${phraseOfDay?.author}\n\nEncontre mais inspirações no Poder Rosa! 🌹✨`}
                className='p-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg'
              >
                <LinkIcon className='w-5 h-5' />
              </CopyLinkButton>
            </div>
          </div>

          <blockquote className='relative bg-white rounded-xl p-8 shadow-md mb-6'>
            <div className='absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-custom-start to-custom-primary rounded-l-xl'></div>
            <div className='ml-6'>
              <p className='text-xl text-custom-start leading-relaxed mb-4 font-medium italic'>
                "{phraseOfDay?.quote}"
              </p>
              <cite className='text-custom-primary font-semibold block text-right'>
                — {phraseOfDay?.author}
              </cite>
            </div>
            <SparklesIcon className='absolute top-4 right-4 w-6 h-6 text-custom-primary/30' />
          </blockquote>

          {/* Botões de Compartilhamento */}
          <div className='bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100'>
            <ShareButtons
              title='Mensagem Inspiradora do Dia'
              text={`✨ Mensagem do dia que tocou meu coração:\n\n"${phraseOfDay?.quote}"\n\n— ${phraseOfDay?.author}\n\nQue esta sabedoria inspire você também! 🌹`}
              hashtags={['MensagemDoDia', 'PoderrRosa', 'Inspiração', 'Sabedoria', 'Motivação']}
              compact={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
