import React, { useEffect, useMemo, useState } from 'react';
import { addDays, format, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AddNoteModal from '@/components/AddNoteModal';
import ShareButtons from '@/components/ShareButtons';
import { useGetMissionsQuery } from '@/services/missionsApiSlice';
import {
  BoltIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CheckIcon,
  ClockIcon,
  HeartIcon,
  LightBulbIcon,
  PlusIcon,
  RocketLaunchIcon,
  SparklesIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import {
  CheckIcon as CheckIconSolid,
  FireIcon as FireIconSolid,
  StarIcon as StarIconSolid,
} from '@heroicons/react/24/solid';

interface WeekDaysProps {
  selectedDayIndex: number;
  onDayClick: (index: number) => void;
  missions: any[];
  currentDayIndex: number;
}

const WeekDays = ({ selectedDayIndex, onDayClick, missions, currentDayIndex }: WeekDaysProps) => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

  const getDayStatus = (index: number) => {
    const date = addDays(startDate, index);
    const formattedDate = format(date, 'd');
    const mission = missions.find((m: any) => m.day === Number(formattedDate));

    const isToday = index === currentDayIndex;
    const isPast = index < currentDayIndex;
    const hasMission = !!mission;
    const isCompleted = mission?.completed || false; // Assumindo que há uma propriedade completed

    return { isToday, isPast, hasMission, isCompleted, mission };
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-wrap justify-center gap-3'>
        {daysOfWeek.map((day, index) => {
          const date = addDays(startDate, index);
          const { isToday, isPast, hasMission, isCompleted } = getDayStatus(index);
          const isSelected = index === selectedDayIndex;

          return (
            <button
              key={index}
              onClick={() => onDayClick(index)}
              className={`group relative p-4 py-5 rounded-2xl min-w-[100px] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                isSelected
                  ? 'bg-gradient-to-br from-custom-start to-custom-primary text-white shadow-2xl scale-105'
                  : isCompleted
                  ? 'bg-gradient-to-br from-green-400 to-green-500 text-white'
                  : isToday
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white animate-pulse shadow-yellow-200'
                  : isPast && !hasMission
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white border-2 border-gray-200 text-custom-start hover:border-custom-primary/50 hover:bg-purple-50'
              }`}
            >
              {/* Indicadores especiais */}
              {isToday && (
                <div className='absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center'>
                  <BoltIcon className='w-3 h-3 text-white' />
                </div>
              )}

              {isCompleted && (
                <div className='absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
                  <CheckIconSolid className='w-3 h-3 text-white' />
                </div>
              )}

              <div className='text-center'>
                <p className='font-raleway text-sm font-bold mb-1'>{day}</p>
                <p className='font-raleway text-2xl font-black'>
                  {format(date, 'd', { locale: ptBR })}
                </p>

                {/* Status do dia */}
                <div className='mt-2 flex justify-center'>
                  {isCompleted ? (
                    <StarIconSolid className='w-4 h-4 text-yellow-300' />
                  ) : hasMission && !isPast ? (
                    <div className='w-2 h-2 bg-current rounded-full opacity-60'></div>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const DesafioDoDia = () => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const currentDayIndex = (new Date().getDay() + 6) % 7;

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(currentDayIndex);
  const [mission, setMission] = useState<any>(null);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  // RTK Query para buscar missões
  const { data: missions = [], isLoading, error } = useGetMissionsQuery();

  // Estatísticas da semana
  const weekStats = useMemo(() => {
    const completed = missions.filter((m) => m.completed).length;
    const total = 7;
    const streak = 3; // Streak simulado - implementar lógica real
    const percentage = Math.round((completed / total) * 100);

    return { completed, total, streak, percentage };
  }, [missions]);

  const handleDayClick = (index: number) => {
    setSelectedDayIndex(index);
    const date = addDays(startDate, index);
    const formattedDate = format(date, 'd');
    const selectedMission = missions.find((m: any) => m.day === Number(formattedDate));
    setMission(selectedMission);
  };

  // Definir missão atual automaticamente
  useEffect(() => {
    if (missions.length > 0 && currentDayIndex === selectedDayIndex) {
      const date = addDays(startDate, currentDayIndex);
      const formattedDate = format(date, 'd');
      const currentMission = missions.find((m: any) => m.day === Number(formattedDate));
      setMission(currentMission);
    }
  }, [missions, currentDayIndex, selectedDayIndex, startDate]);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col justify-center items-center py-20'>
            <div className='relative mb-8'>
              <div className='w-20 h-20 border-4 border-custom-primary/20 border-t-custom-primary rounded-full animate-spin'></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <RocketLaunchIcon className='w-10 h-10 text-custom-primary animate-pulse' />
              </div>
            </div>
            <div className='text-center space-y-3'>
              <h2 className='text-2xl font-bold text-gray-800'>Preparando seus desafios...</h2>
              <p className='text-gray-600'>🌹 Carregando as missões da semana para você</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-50/30'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col justify-center items-center py-20'>
            <div className='bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-3xl text-center max-w-md shadow-xl'>
              <div className='w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <span className='text-2xl'>😔</span>
              </div>
              <h3 className='text-2xl font-bold text-red-800 mb-3'>Ops! Algo não deu certo</h3>
              <p className='text-red-700 mb-6 leading-relaxed'>
                Não conseguimos carregar seus desafios no momento
              </p>
              <button
                onClick={() => window.location.reload()}
                className='px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg'
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Cabeçalho Premium */}
        <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-100/50 overflow-hidden mb-8'>
          {/* Decorações de fundo */}
          <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-custom-primary/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32'></div>
          <div className='absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full translate-y-20 -translate-x-20'></div>

          <div className='relative z-10 p-8'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8'>
              {/* Título e Motivação */}
              <div className='flex items-center gap-6'>
                <div className='relative'>
                  <div className='p-4 bg-gradient-to-br from-custom-primary to-purple-600 rounded-2xl shadow-lg'>
                    <RocketLaunchIcon className='w-10 h-10 text-white' />
                  </div>
                  {weekStats.streak > 0 && (
                    <div className='absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center'>
                      <span className='text-xs font-bold text-white'>{weekStats.streak}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className='text-4xl font-bold text-custom-primary mb-2'>Desafio do Dia</h1>
                  <p className='text-gray-600 text-lg'>
                    {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>
              </div>

              {/* Estatísticas da Semana */}
              <div className='grid grid-cols-3 gap-4'>
                <div className='text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl'>
                  <ChartBarIcon className='w-6 h-6 text-blue-600 mx-auto mb-2' />
                  <p className='text-2xl font-bold text-blue-700'>{weekStats.completed}</p>
                  <p className='text-xs text-blue-600'>Completados</p>
                </div>
                <div className='text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl'>
                  <FireIconSolid className='w-6 h-6 text-orange-600 mx-auto mb-2' />
                  <p className='text-2xl font-bold text-orange-700'>{weekStats.streak}</p>
                  <p className='text-xs text-orange-600'>Sequência</p>
                </div>
                <div className='text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl'>
                  <TrophyIcon className='w-6 h-6 text-green-600 mx-auto mb-2' />
                  <p className='text-2xl font-bold text-green-700'>{weekStats.percentage}%</p>
                  <p className='text-xs text-green-600'>Progresso</p>
                </div>
              </div>
            </div>

            {/* Barra de Progresso Semanal */}
            <div className='mb-6'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-gray-700'>Progresso da Semana</span>
                <span className='text-sm text-gray-500'>
                  {weekStats.completed} de {weekStats.total}
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-3 overflow-hidden'>
                <div
                  className='bg-gradient-to-r from-custom-primary to-purple-600 h-full rounded-full transition-all duration-500 ease-out'
                  style={{ width: `${weekStats.percentage}%` }}
                >
                  <div className='h-full bg-white/20 animate-pulse rounded-full'></div>
                </div>
              </div>
            </div>

            {/* Seletor de Dias Premium */}
            <WeekDays
              selectedDayIndex={selectedDayIndex}
              onDayClick={handleDayClick}
              missions={missions}
              currentDayIndex={currentDayIndex}
            />
          </div>
        </div>

        {/* Card da Missão */}
        {mission ? (
          <div className='bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 rounded-3xl shadow-2xl overflow-hidden border border-purple-100/50'>
            <div className='relative p-8'>
              {/* Decorações */}
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-custom-primary/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16'></div>
              <div className='absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 rounded-full translate-y-10 -translate-x-10'></div>

              <div className='relative z-10'>
                {/* Header da Missão */}
                <div className='flex items-start justify-between mb-6'>
                  <div className='flex items-center gap-4'>
                    <div className='p-3 bg-gradient-to-br from-custom-primary to-purple-600 rounded-2xl shadow-lg'>
                      <LightBulbIcon className='w-8 h-8 text-white' />
                    </div>
                    <div>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='inline-flex items-center px-3 py-1 bg-gradient-to-r from-custom-primary/10 to-purple-500/10 text-custom-primary rounded-full text-sm font-semibold'>
                          Missão do Dia
                        </span>
                        {selectedDayIndex === currentDayIndex && (
                          <span className='inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium'>
                            Hoje
                          </span>
                        )}
                      </div>
                      <h2 className='text-3xl font-bold text-custom-start mb-2'>{mission.title}</h2>
                      <p className='text-gray-600 flex items-center gap-2'>
                        <CalendarDaysIcon className='w-4 h-4' />
                        {format(addDays(startDate, selectedDayIndex), "EEEE, d 'de' MMMM", {
                          locale: ptBR,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className='flex flex-col items-end gap-2'>
                    {mission.completed ? (
                      <div className='flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-xl'>
                        <CheckIconSolid className='w-5 h-5' />
                        <span className='font-semibold'>Concluído</span>
                      </div>
                    ) : (
                      <div className='flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-xl'>
                        <ClockIcon className='w-5 h-5' />
                        <span className='font-semibold'>Em Progresso</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Conteúdo da Missão */}
                <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-100'>
                  <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                    <BookOpenIcon className='w-5 h-5' />
                    Descrição do Desafio
                  </h3>
                  <p className='text-gray-700 leading-relaxed text-lg'>{mission.task}</p>
                </div>

                {/* Dicas e Motivação */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                  <div className='p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200'>
                    <div className='flex items-center gap-2 mb-2'>
                      <LightBulbIcon className='w-5 h-5 text-blue-600' />
                      <h4 className='font-semibold text-blue-800'>Dica do Dia</h4>
                    </div>
                    <p className='text-blue-700 text-sm'>
                      Reserve um momento de tranquilidade para refletir sobre este desafio. Suas
                      reflexões são valiosas!
                    </p>
                  </div>

                  <div className='p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200'>
                    <div className='flex items-center gap-2 mb-2'>
                      <HeartIcon className='w-5 h-5 text-purple-600' />
                      <h4 className='font-semibold text-purple-800'>Motivação</h4>
                    </div>
                    <p className='text-purple-700 text-sm'>
                      Cada pequeno passo é uma vitória. Você está construindo uma versão melhor de
                      si mesma!
                    </p>
                  </div>
                </div>

                {/* Ações */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
                  <button
                    onClick={() => setIsAddNoteOpen(true)}
                    className='group flex items-center justify-center gap-3 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-lg'
                  >
                    <PlusIcon className='w-6 h-6 group-hover:rotate-90 transition-transform duration-300' />
                    <span>Adicionar Reflexão</span>
                    <SparklesIcon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
                  </button>

                  {!mission.completed && (
                    <button className='flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-green-300 text-green-700 rounded-2xl hover:bg-green-50 transition-all duration-300 font-semibold'>
                      <CheckIcon className='w-5 h-5' />
                      Marcar como Concluído
                    </button>
                  )}
                </div>

                {/* Seção de Compartilhamento */}
                <div className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100'>
                  <ShareButtons
                    title={`Desafio do Dia - ${mission.title}`}
                    text={`🌟 Desafio do Dia: ${mission.title}\n\n${mission.task}\n\nVenha se desafiar comigo no Poder Rosa! 💜`}
                    hashtags={[
                      'PoderRosa',
                      'DesafioDoDia',
                      'Autocuidado',
                      'Crescimento',
                      'Reflexão',
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Estado sem missão selecionada */
          <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-gray-100'>
            <div className='w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6'>
              <CalendarDaysIcon className='w-12 h-12 text-gray-400' />
            </div>
            <h3 className='text-2xl font-bold text-gray-700 mb-3'>
              Selecione um dia para ver o desafio
            </h3>
            <p className='text-gray-500 max-w-md mx-auto'>
              Escolha um dia da semana acima para visualizar a missão correspondente e começar sua
              jornada de crescimento pessoal.
            </p>
          </div>
        )}

        {/* Modal de Anotação */}
        <AddNoteModal
          isOpen={isAddNoteOpen}
          onClose={() => setIsAddNoteOpen(false)}
          defaultTitle={mission?.title ? `Reflexão: ${mission.title}` : 'Reflexão do Desafio'}
        />
      </div>
    </div>
  );
};

export default DesafioDoDia;
