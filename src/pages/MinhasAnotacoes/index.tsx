// @ts-nocheck
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  Transition,
} from '@headlessui/react';
import {
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  HeartIcon,
  LightBulbIcon,
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  SparklesIcon,
  DocumentTextIcon,
  ChartBarIcon,
  FireIcon,
} from '@heroicons/react/24/outline';
import {
  useGetDiaryEntriesQuery,
  useDeleteDiaryEntryMutation,
  DiaryEntry,
} from '@/services/diaryApiSlice';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const MinhasAnotacoes = () => {
  const { data: annotations = [], isLoading, error, refetch } = useGetDiaryEntriesQuery();
  const [deleteDiaryEntry, { isLoading: isDeleting }] = useDeleteDiaryEntryMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [annotationToDelete, setAnnotationToDelete] = useState<DiaryEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const navigate = useNavigate();

  // Filtrar e ordenar anotações
  const filteredAndSortedAnnotations = useMemo(() => {
    const filtered = annotations.filter(
      (annotation) =>
        annotation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        annotation.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    switch (sortBy) {
      case 'recent':
        return filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case 'oldest':
        return filtered.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [annotations, searchQuery, sortBy]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = annotations.length;
    const thisWeek = annotations.filter((a) => {
      const days = Math.floor(
        (new Date().getTime() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24),
      );
      return days <= 7;
    }).length;
    const thisMonth = annotations.filter((a) => {
      const days = Math.floor(
        (new Date().getTime() - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24),
      );
      return days <= 30;
    }).length;

    return { total, thisWeek, thisMonth };
  }, [annotations]);

  const openDeleteDialog = (annotation: DiaryEntry) => {
    setAnnotationToDelete(annotation);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setAnnotationToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (annotationToDelete) {
      try {
        await deleteDiaryEntry(annotationToDelete.id).unwrap();
        closeDeleteDialog();
      } catch (error) {
        console.error('Erro ao deletar anotação:', error);
      }
    }
  };

  const getAnnotationConfig = (index: number) => {
    const configs = [
      {
        gradient: 'from-violet-600 via-purple-600 to-blue-600',
        icon: ChatBubbleLeftEllipsisIcon,
        badge: 'Reflexão',
        borderColor: 'border-purple-200',
      },
      {
        gradient: 'from-rose-500 via-pink-500 to-purple-600',
        icon: HeartIcon,
        badge: 'Gratidão',
        borderColor: 'border-pink-200',
      },
      {
        gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
        icon: LightBulbIcon,
        badge: 'Insight',
        borderColor: 'border-teal-200',
      },
      {
        gradient: 'from-amber-500 via-orange-500 to-red-500',
        icon: FireIcon,
        badge: 'Inspiração',
        borderColor: 'border-orange-200',
      },
    ];
    return configs[index % configs.length];
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col justify-center items-center py-20'>
            <div className='relative mb-8'>
              <div className='w-20 h-20 border-4 border-custom-primary/20 border-t-custom-primary rounded-full animate-spin'></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <BookOpenIcon className='w-10 h-10 text-custom-primary animate-pulse' />
              </div>
            </div>
            <div className='text-center space-y-3'>
              <h2 className='text-2xl font-bold text-gray-800'>Carregando suas memórias...</h2>
              <p className='text-gray-600 max-w-md'>
                🌹 Preparando todas as suas reflexões e pensamentos especiais
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-50/30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col justify-center items-center py-20'>
            <div className='bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-3xl text-center max-w-md shadow-xl'>
              <div className='w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <ExclamationTriangleIcon className='w-10 h-10 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-red-800 mb-3'>Ops! Algo deu errado</h3>
              <p className='text-red-700 mb-6 leading-relaxed'>
                Não conseguimos carregar suas anotações no momento. Que tal tentar novamente?
              </p>
              <button
                onClick={() => refetch()}
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
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Cabeçalho Premium */}
        <div className='bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100/50 overflow-hidden mb-8'>
          {/* Decorações de fundo */}
          <div className='absolute inset-0 bg-gradient-to-r from-custom-primary/5 via-purple-500/5 to-pink-500/5'></div>
          <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-custom-primary/10 to-purple-500/10 rounded-full -translate-y-32 translate-x-32'></div>
          <div className='absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 rounded-full translate-y-20 -translate-x-20'></div>

          <div className='relative z-10 p-8'>
            <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
              {/* Título e Estatísticas */}
              <div className='flex items-center gap-6'>
                <div className='relative'>
                  <div className='p-4 bg-gradient-to-br from-custom-primary to-purple-600 rounded-2xl shadow-lg'>
                    <BookOpenIcon className='w-8 h-8 text-white' />
                  </div>
                  {stats.total > 0 && (
                    <div className='absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
                      <span className='text-xs font-bold text-white'>{stats.total}</span>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className='text-4xl font-bold text-custom-primary mb-2'>Minhas Anotações</h1>
                  <div className='flex items-center gap-6 text-sm'>
                    <div className='flex items-center gap-2'>
                      <ChartBarIcon className='w-4 h-4 text-gray-500' />
                      <span className='text-gray-700 font-medium'>{stats.total} total</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FireIcon className='w-4 h-4 text-orange-500' />
                      <span className='text-gray-700 font-medium'>
                        {stats.thisWeek} esta semana
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <CalendarDaysIcon className='w-4 h-4 text-purple-500' />
                      <span className='text-gray-700 font-medium'>{stats.thisMonth} este mês</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão Nova Anotação */}
              <button
                onClick={() => navigate('/minhas-anotacoes/nova')}
                className='group flex items-center gap-3 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold text-lg'
              >
                <PlusIcon className='w-6 h-6 group-hover:rotate-90 transition-transform duration-300' />
                <span>Nova Anotação</span>
                <SparklesIcon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
              </button>
            </div>

            {/* Ferramentas de Busca e Filtro */}
            {annotations.length > 0 && (
              <div className='mt-8 pt-8 border-t border-gray-200/50'>
                <div className='flex flex-col sm:flex-row gap-4 items-center'>
                  {/* Busca */}
                  <div className='relative flex-1 max-w-md'>
                    <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                    <input
                      type='text'
                      placeholder='Buscar nas suas anotações...'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className='w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-primary/20 focus:border-custom-primary transition-all duration-300'
                    />
                  </div>

                  {/* Filtros */}
                  <div className='flex items-center gap-3'>
                    <Menu as='div' className='relative'>
                      <Menu.Button className='flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-300'>
                        <ArrowsUpDownIcon className='w-4 h-4 text-gray-500' />
                        <span className='text-sm font-medium text-gray-700'>
                          {sortBy === 'recent'
                            ? 'Mais recentes'
                            : sortBy === 'oldest'
                            ? 'Mais antigas'
                            : 'Por título'}
                        </span>
                      </Menu.Button>
                      <Menu.Items className='absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none'>
                        <div className='p-2'>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => setSortBy('recent')}
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } flex items-center gap-2 w-full px-3 py-2 text-left text-sm rounded-lg transition-colors duration-150`}
                              >
                                <ClockIcon className='w-4 h-4' />
                                Mais recentes
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => setSortBy('oldest')}
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } flex items-center gap-2 w-full px-3 py-2 text-left text-sm rounded-lg transition-colors duration-150`}
                              >
                                <ClockIcon className='w-4 h-4' />
                                Mais antigas
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => setSortBy('title')}
                                className={`${
                                  active ? 'bg-gray-100' : ''
                                } flex items-center gap-2 w-full px-3 py-2 text-left text-sm rounded-lg transition-colors duration-150`}
                              >
                                <DocumentTextIcon className='w-4 h-4' />
                                Por título
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>

                {/* Resultados da busca */}
                {searchQuery && (
                  <div className='mt-4 text-sm text-gray-600'>
                    {filteredAndSortedAnnotations.length > 0 ? (
                      <span>
                        Encontradas <strong>{filteredAndSortedAnnotations.length}</strong> anotações
                      </span>
                    ) : (
                      <span>
                        Nenhuma anotação encontrada para "<strong>{searchQuery}</strong>"
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo Principal */}
        {annotations.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='text-center max-w-md'>
              <div className='relative mb-8'>
                <div className='w-32 h-32 bg-gradient-to-br from-custom-primary/10 via-purple-500/10 to-pink-500/10 rounded-3xl flex items-center justify-center mx-auto'>
                  <PencilSquareIcon className='w-16 h-16 text-custom-primary/60' />
                </div>
                <div className='absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
                  <SparklesIcon className='w-6 h-6 text-white' />
                </div>
              </div>

              <h2 className='text-3xl font-bold text-gray-800 mb-4'>Sua jornada começa aqui</h2>
              <p className='text-gray-600 leading-relaxed mb-8'>
                Transforme pensamentos em palavras, momentos em memórias. Cada anotação é um passo
                na sua jornada de autodescoberta.
              </p>

              <div className='grid grid-cols-3 gap-4 mb-8'>
                <div className='p-4 bg-blue-50 rounded-xl'>
                  <HeartIcon className='w-8 h-8 text-blue-500 mx-auto mb-2' />
                  <p className='text-xs text-blue-700 font-medium'>Reflexões</p>
                </div>
                <div className='p-4 bg-purple-50 rounded-xl'>
                  <LightBulbIcon className='w-8 h-8 text-purple-500 mx-auto mb-2' />
                  <p className='text-xs text-purple-700 font-medium'>Insights</p>
                </div>
                <div className='p-4 bg-pink-50 rounded-xl'>
                  <FireIcon className='w-8 h-8 text-pink-500 mx-auto mb-2' />
                  <p className='text-xs text-pink-700 font-medium'>Inspirações</p>
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
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredAndSortedAnnotations.map((annotation: any, index: number) => {
              const config = getAnnotationConfig(index);
              const IconComponent = config.icon;
              const daysSince = Math.floor(
                (new Date().getTime() - new Date(annotation.createdAt).getTime()) /
                  (1000 * 60 * 60 * 24),
              );

              return (
                <div
                  key={annotation.id}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-2 ${config.borderColor}`}
                >
                  {/* Header Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${config.gradient}`}></div>

                  <div className='p-6'>
                    {/* Header */}
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-3'>
                          <span
                            className={`inline-flex items-center px-2 py-1 bg-gradient-to-r ${config.gradient} text-white rounded-full text-xs font-semibold`}
                          >
                            {config.badge}
                          </span>
                          <span className='text-xs text-gray-500'>
                            {daysSince === 0 ? 'Hoje' : `${daysSince}d atrás`}
                          </span>
                        </div>
                        <h3 className='font-bold text-lg text-gray-800 leading-tight line-clamp-2 mb-2'>
                          {annotation.title}
                        </h3>
                      </div>

                      <Menu as='div' className='relative'>
                        <Menu.Button className='p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'>
                          <EllipsisHorizontalIcon className='w-5 h-5 text-gray-400' />
                        </Menu.Button>
                        <Menu.Items className='absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none'>
                          <div className='p-2'>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() =>
                                    navigate(`/minhas-anotacoes/editar/${annotation.id}`)
                                  }
                                  className={`${
                                    active ? 'bg-gray-100' : ''
                                  } flex items-center gap-3 w-full px-3 py-2 text-left text-sm rounded-lg transition-colors duration-150`}
                                >
                                  <PencilSquareIcon className='w-4 h-4 text-blue-500' />
                                  <span>Editar</span>
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => openDeleteDialog(annotation)}
                                  className={`${
                                    active ? 'bg-gray-100' : ''
                                  } flex items-center gap-3 w-full px-3 py-2 text-left text-sm rounded-lg transition-colors duration-150`}
                                >
                                  <TrashIcon className='w-4 h-4 text-red-500' />
                                  <span>Excluir</span>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </div>

                    {/* Conteúdo */}
                    <div className='space-y-3'>
                      <p className='text-sm text-gray-600 line-clamp-4 leading-relaxed'>
                        {annotation.content.replace(/<[^>]+>/g, '')}
                      </p>

                      <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                        <div className='flex items-center gap-2'>
                          <ClockIcon className='w-4 h-4 text-gray-400' />
                          <span className='text-xs text-gray-500'>
                            {format(new Date(annotation.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                          </span>
                        </div>
                        <div className={`p-2 bg-gradient-to-r ${config.gradient} rounded-lg`}>
                          <IconComponent className='w-4 h-4 text-white' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal de Confirmação de Exclusão - Redesenhado */}
        <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog} className='relative z-50'>
          <DialogBackdrop className='fixed inset-0 bg-black/50 backdrop-blur-sm' />
          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <DialogPanel className='relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-gradient-to-br from-red-50 to-red-100 px-6 pb-4 pt-6'>
                  <div className='flex items-center gap-4'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-400 to-red-500 shadow-lg'>
                      <ExclamationTriangleIcon className='h-8 w-8 text-white' />
                    </div>
                    <div>
                      <DialogTitle className='text-xl font-bold leading-6 text-red-800 mb-2'>
                        Excluir Anotação
                      </DialogTitle>
                      <p className='text-sm text-red-700'>Esta ação não pode ser desfeita</p>
                    </div>
                  </div>
                </div>

                <div className='bg-white px-6 py-4'>
                  <p className='text-gray-700 leading-relaxed'>
                    Tem certeza que deseja excluir a anotação{' '}
                    <strong>"{annotationToDelete?.title}"</strong>? Todas as informações serão
                    perdidas permanentemente.
                  </p>
                </div>

                <div className='bg-gray-50 px-6 py-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    onClick={closeDeleteDialog}
                    disabled={isDeleting}
                    className='inline-flex justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 transition-all duration-300'
                  >
                    Cancelar
                  </button>
                  <button
                    type='button'
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className='inline-flex justify-center rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all duration-300 hover:scale-105'
                  >
                    {isDeleting ? (
                      <div className='flex items-center gap-2'>
                        <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                        Excluindo...
                      </div>
                    ) : (
                      'Excluir Anotação'
                    )}
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default MinhasAnotacoes;
