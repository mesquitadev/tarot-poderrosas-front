// @ts-nocheck
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '@/services';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeftIcon,
  BookmarkIcon,
  SparklesIcon,
  HeartIcon,
  LightBulbIcon,
  ChatBubbleLeftEllipsisIcon,
  FireIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PencilSquareIcon,
  DocumentTextIcon,
  ClockIcon,
  BookOpenIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FormData {
  title: string;
  content: string;
  category?: string;
}

interface Annotation {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

const EditarAnotacao = () => {
  const { id } = useParams<{ id: string }>();
  const {
    control,
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [annotation, setAnnotation] = useState<Annotation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('reflexao');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const watchedContent = watch('content', '');
  const watchedTitle = watch('title', '');

  // Categorias disponíveis
  const categories = [
    {
      id: 'reflexao',
      name: 'Reflexão',
      icon: ChatBubbleLeftEllipsisIcon,
      color: 'from-violet-600 to-purple-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-700',
    },
    {
      id: 'gratidao',
      name: 'Gratidão',
      icon: HeartIcon,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
    },
    {
      id: 'insight',
      name: 'Insight',
      icon: LightBulbIcon,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
    },
    {
      id: 'inspiracao',
      name: 'Inspiração',
      icon: FireIcon,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
    },
  ];

  useEffect(() => {
    const fetchAnnotation = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/diary/${id}`);
        const data = response.data;

        setAnnotation(data);
        setValue('title', data.title);
        setValue('content', data.content);
        setSelectedCategory(data.category || 'reflexao');
        setError(null);
      } catch (err) {
        setError('Erro ao carregar a anotação. Tente novamente.');
        console.error('Erro ao buscar anotação:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnnotation();
    }
  }, [id, setValue]);

  // Contar palavras e caracteres
  useEffect(() => {
    if (watchedContent) {
      const plainText = watchedContent.replace(/<[^>]+>/g, '').trim();
      const words = plainText ? plainText.split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(plainText.length);
    } else {
      setWordCount(0);
      setCharCount(0);
    }
  }, [watchedContent]);

  // Detectar mudanças
  useEffect(() => {
    if (annotation) {
      const titleChanged = watchedTitle !== annotation.title;
      const contentChanged = watchedContent !== annotation.content;
      const categoryChanged = selectedCategory !== (annotation.category || 'reflexao');
      setHasChanges(titleChanged || contentChanged || categoryChanged);
    }
  }, [watchedTitle, watchedContent, selectedCategory, annotation]);

  const onSubmit = async (data: FormData) => {
    try {
      await api.put(`/diary/${id}`, {
        ...data,
        category: selectedCategory,
      });
      navigate('/minhas-anotacoes');
    } catch (error) {
      console.error('Erro ao atualizar anotação:', error);
      setError('Erro ao salvar a anotação. Tente novamente.');
    }
  };

  const selectedCategoryData =
    categories.find((cat) => cat.id === selectedCategory) || categories[0];
  const IconComponent = selectedCategoryData.icon;

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean'],
    ],
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col justify-center items-center py-20'>
            <div className='relative mb-8'>
              <div className='w-20 h-20 border-4 border-custom-primary/20 border-t-custom-primary rounded-full animate-spin'></div>
              <div className='absolute inset-0 flex items-center justify-center'>
                <BookOpenIcon className='w-10 h-10 text-custom-primary animate-pulse' />
              </div>
            </div>
            <div className='text-center space-y-3'>
              <h2 className='text-2xl font-bold text-gray-800'>Carregando sua anotação...</h2>
              <p className='text-gray-600'>🌹 Preparando seus pensamentos para edição</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50/50 via-white to-red-50/30'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='flex flex-col justify-center items-center py-20'>
            <div className='bg-gradient-to-br from-red-100 to-red-200 p-8 rounded-3xl text-center max-w-md shadow-xl'>
              <div className='w-20 h-20 bg-gradient-to-br from-red-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6'>
                <XMarkIcon className='w-10 h-10 text-white' />
              </div>
              <h3 className='text-2xl font-bold text-red-800 mb-3'>Ops! Algo deu errado</h3>
              <p className='text-red-700 mb-6 leading-relaxed'>{error}</p>
              <div className='flex gap-3'>
                <button
                  onClick={() => navigate('/minhas-anotacoes')}
                  className='px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold transition-all duration-300'
                >
                  Voltar
                </button>
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
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-pink-50/30'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Cabeçalho */}
        <div className='mb-8'>
          <button
            onClick={() => navigate('/minhas-anotacoes')}
            className='group flex items-center gap-2 text-gray-600 hover:text-custom-primary transition-colors duration-300 mb-6'
          >
            <ArrowLeftIcon className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300' />
            <span className='font-medium'>Voltar às anotações</span>
          </button>

          <div className='flex items-center gap-4 mb-4'>
            <div
              className={`p-3 bg-gradient-to-r ${selectedCategoryData.color} rounded-2xl shadow-lg`}
            >
              <IconComponent className='w-8 h-8 text-white' />
            </div>
            <div>
              <h1 className='text-4xl font-bold text-custom-primary mb-2'>Editar Anotação</h1>
              <div className='flex items-center gap-4 text-gray-600'>
                <div className='flex items-center gap-2'>
                  <CalendarDaysIcon className='w-4 h-4' />
                  <span>
                    Criada em:{' '}
                    {annotation &&
                      format(new Date(annotation.createdAt), "d 'de' MMMM 'de' yyyy", {
                        locale: ptBR,
                      })}
                  </span>
                </div>
                {annotation && annotation.updatedAt !== annotation.createdAt && (
                  <div className='flex items-center gap-2'>
                    <ClockIcon className='w-4 h-4' />
                    <span>
                      Editada em:{' '}
                      {format(new Date(annotation.updatedAt), "d 'de' MMMM", { locale: ptBR })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Indicador de mudanças */}
          {hasChanges && (
            <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3'>
              <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
              <span className='text-yellow-800 font-medium'>Você tem alterações não salvas</span>
            </div>
          )}
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          {/* Seleção de Categoria */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
              <BookmarkIcon className='w-5 h-5' />
              Categoria da anotação
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    type='button'
                    onClick={() => setSelectedCategory(category.id)}
                    className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `${category.bgColor} border-current ${category.textColor} shadow-lg scale-105`
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 mx-auto mb-2 ${
                        selectedCategory === category.id ? 'scale-110' : 'group-hover:scale-105'
                      } transition-transform duration-300`}
                    />
                    <p className='text-sm font-medium'>{category.name}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Campo Título */}
          <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
            <label className='block text-lg font-semibold text-gray-800 mb-3' htmlFor='title'>
              Título da sua reflexão
            </label>
            <input
              id='title'
              type='text'
              {...register('title', {
                required: 'O título é obrigatório',
                minLength: { value: 3, message: 'O título deve ter pelo menos 3 caracteres' },
              })}
              placeholder='Digite um título inspirador para sua anotação...'
              className={`w-full px-4 py-4 text-lg border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                errors.title
                  ? 'border-red-300 focus:border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-custom-primary bg-white'
              }`}
            />
            {errors.title && (
              <p className='mt-2 text-sm text-red-600 flex items-center gap-2'>
                <XMarkIcon className='w-4 h-4' />
                {errors.title.message}
              </p>
            )}
            {watchedTitle && !errors.title && (
              <p className='mt-2 text-sm text-green-600 flex items-center gap-2'>
                <CheckIcon className='w-4 h-4' />
                Título perfeito!
              </p>
            )}
          </div>

          {/* Campo Conteúdo - Editor Premium */}
          <div className='bg-gradient-to-br from-white to-purple-50/30 rounded-2xl shadow-xl overflow-hidden border border-purple-100/50'>
            {/* Cabeçalho do Editor */}
            <div className='relative bg-white/90 backdrop-blur-sm p-6 border-b border-purple-100/50'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-custom-primary/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16'></div>

              <div className='relative z-10 flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-gradient-to-r from-custom-primary to-purple-600 rounded-xl'>
                    <PencilSquareIcon className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800'>Editor de Conteúdo</h3>
                    <p className='text-sm text-gray-600'>Continue moldando seus pensamentos</p>
                  </div>
                </div>

                <div className='flex items-center gap-4'>
                  {/* Estatísticas Premium */}
                  <div className='flex items-center gap-4 text-sm'>
                    <div className='flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg'>
                      <DocumentTextIcon className='w-4 h-4 text-blue-600' />
                      <span className='font-medium text-blue-700'>
                        {wordCount} palavra{wordCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-lg'>
                      <ClockIcon className='w-4 h-4 text-purple-600' />
                      <span className='font-medium text-purple-700'>{charCount} chars</span>
                    </div>
                    <div className='flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg'>
                      <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
                      <span className='font-medium text-green-700'>
                        {Math.ceil(wordCount / 200)} min de leitura
                      </span>
                    </div>
                  </div>

                  {/* Toggle Preview Premium */}
                  <button
                    type='button'
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-sm ${
                      isPreviewMode
                        ? 'bg-gradient-to-r from-custom-primary to-purple-600 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <EyeIcon
                      className={`w-4 h-4 ${
                        isPreviewMode ? 'animate-pulse' : 'group-hover:scale-110'
                      } transition-transform duration-300`}
                    />
                    {isPreviewMode ? 'Voltar ao Editor' : 'Visualizar'}
                  </button>
                </div>
              </div>

              {/* Indicador de alterações */}
              {hasChanges && (
                <div className='relative z-10 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 flex items-center gap-3'>
                  <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                  <span className='text-yellow-800 font-medium text-sm'>
                    Você tem alterações não salvas neste texto
                  </span>
                </div>
              )}
            </div>

            {/* Área do Editor */}
            <div className='relative'>
              {isPreviewMode ? (
                <div className='p-8 bg-white'>
                  <div className='max-w-none'>
                    <h4 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
                      <EyeIcon className='w-5 h-5' />
                      Visualização das Alterações
                    </h4>
                    <div className='prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-purple-700 prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:italic min-h-[400px] p-6 bg-gradient-to-br from-gray-50 to-purple-50/30 rounded-xl border border-gray-100'>
                      {watchedContent ? (
                        <div dangerouslySetInnerHTML={{ __html: watchedContent }} />
                      ) : (
                        <div className='flex flex-col items-center justify-center h-64 text-center'>
                          <div className='w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-4'>
                            <DocumentTextIcon className='w-8 h-8 text-purple-400' />
                          </div>
                          <p className='text-gray-500 italic text-lg'>
                            Continue escrevendo para ver a visualização...
                          </p>
                          <p className='text-gray-400 text-sm mt-2'>
                            Suas ideias estão tomando forma ✨
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='relative'>
                  {/* Estilos customizados para o editor de edição */}
                  <style jsx global>{`
                    .custom-quill-edit .ql-toolbar {
                      background: linear-gradient(135deg, #f8f9ff 0%, #f3f4f6 100%);
                      border: none !important;
                      border-bottom: 1px solid #e5e7eb !important;
                      padding: 12px 16px;
                      border-radius: 0;
                    }

                    .custom-quill-edit .ql-toolbar .ql-formats {
                      margin-right: 20px;
                    }

                    .custom-quill-edit .ql-toolbar button {
                      width: 32px;
                      height: 32px;
                      border-radius: 8px;
                      transition: all 0.2s ease;
                      margin: 0 2px;
                    }

                    .custom-quill-edit .ql-toolbar button:hover {
                      background: rgba(124, 58, 237, 0.1);
                      transform: scale(1.05);
                    }

                    .custom-quill-edit .ql-toolbar button.ql-active {
                      background: linear-gradient(135deg, #7c3aed, #a855f7);
                      color: white;
                    }

                    .custom-quill-edit .ql-toolbar .ql-picker-label:hover,
                    .custom-quill-edit .ql-toolbar .ql-picker-label.ql-active {
                      background: rgba(124, 58, 237, 0.1);
                      border-radius: 8px;
                    }

                    .custom-quill-edit .ql-editor {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      font-size: 16px;
                      line-height: 1.7;
                      padding: 24px;
                      min-height: 450px;
                      background: white;
                    }

                    .custom-quill-edit .ql-editor::before {
                      color: #9ca3af;
                      font-style: italic;
                      font-size: 16px;
                    }

                    .custom-quill-edit .ql-editor h1,
                    .custom-quill-edit .ql-editor h2,
                    .custom-quill-edit .ql-editor h3 {
                      color: #374151;
                      font-weight: 700;
                      margin-bottom: 0.5em;
                    }

                    .custom-quill-edit .ql-editor p {
                      margin-bottom: 1em;
                      color: #4b5563;
                    }

                    .custom-quill-edit .ql-editor strong {
                      color: #1f2937;
                    }

                    .custom-quill-edit .ql-editor em {
                      color: #7c3aed;
                    }

                    .custom-quill-edit .ql-editor blockquote {
                      border-left: 4px solid #7c3aed;
                      background: #f8f9ff;
                      margin: 1em 0;
                      padding: 12px 16px;
                      border-radius: 0 8px 8px 0;
                      font-style: italic;
                    }

                    .custom-quill-edit .ql-editor ul,
                    .custom-quill-edit .ql-editor ol {
                      padding-left: 1.5em;
                      margin-bottom: 1em;
                    }

                    .custom-quill-edit .ql-editor li {
                      margin-bottom: 0.5em;
                      color: #4b5563;
                    }

                    .custom-quill-edit .ql-container {
                      border: none !important;
                    }

                    .custom-quill-edit {
                      border-radius: 0 0 16px 16px;
                      overflow: hidden;
                      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                    }
                  `}</style>

                  <Controller
                    name='content'
                    control={control}
                    rules={{ required: 'O conteúdo é obrigatório' }}
                    render={({ field }) => (
                      <ReactQuill
                        {...field}
                        theme='snow'
                        modules={{
                          toolbar: [
                            [{ header: ['1', '2', '3', false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ color: [] }, { background: [] }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            [{ indent: '-1' }, { indent: '+1' }],
                            ['blockquote', 'code-block'],
                            ['link', 'image'],
                            [{ align: [] }],
                            ['clean'],
                          ],
                          clipboard: {
                            matchVisual: false,
                          },
                        }}
                        formats={[
                          'header',
                          'bold',
                          'italic',
                          'underline',
                          'strike',
                          'color',
                          'background',
                          'list',
                          'bullet',
                          'indent',
                          'blockquote',
                          'code-block',
                          'link',
                          'image',
                          'align',
                        ]}
                        placeholder='✨ Continue desenvolvendo seus pensamentos... Refine suas ideias, adicione novas reflexões ou reorganize seu conteúdo. Este texto já tem sua essência, agora você pode aprimorá-lo.'
                        className='custom-quill-edit'
                      />
                    )}
                  />

                  {/* Dicas de edição */}
                  <div className='absolute bottom-4 right-4 z-10'>
                    <div className='bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-3 shadow-lg'>
                      <p className='text-xs text-gray-600 flex items-center gap-2'>
                        <SparklesIcon className='w-3 h-3 text-purple-500' />
                        <span>
                          Editando desde{' '}
                          {annotation && format(new Date(annotation.createdAt), 'dd/MM/yyyy')}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {errors.content && (
                <div className='p-4 bg-red-50 border-l-4 border-red-400'>
                  <p className='text-sm text-red-700 flex items-center gap-2'>
                    <XMarkIcon className='w-4 h-4' />
                    {errors.content.message}
                  </p>
                </div>
              )}
            </div>

            {/* Footer do Editor */}
            <div className='bg-gradient-to-r from-gray-50 to-purple-50/50 px-6 py-4 border-t border-gray-100'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4 text-xs text-gray-500'>
                  <span className='flex items-center gap-1'>
                    {hasChanges ? (
                      <>
                        <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                        Alterações detectadas
                      </>
                    ) : (
                      <>
                        <CheckIcon className='w-3 h-3 text-green-500' />
                        Sem alterações pendentes
                      </>
                    )}
                  </span>
                  <span>
                    Criada em: {annotation && format(new Date(annotation.createdAt), 'dd/MM/yyyy')}
                  </span>
                </div>
                <div className='flex items-center gap-2 text-xs text-gray-500'>
                  <span>Tempo estimado de leitura:</span>
                  <span className='font-medium text-purple-700'>
                    {Math.max(1, Math.ceil(wordCount / 200))} min
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className='flex flex-col sm:flex-row gap-4 justify-between items-center'>
            <button
              type='button'
              onClick={() => navigate('/minhas-anotacoes')}
              className='w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium'
            >
              {hasChanges ? 'Descartar alterações' : 'Cancelar'}
            </button>

            <div className='flex gap-3'>
              <button
                type='button'
                className='px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 font-medium'
              >
                Salvar Rascunho
              </button>

              <button
                type='submit'
                disabled={isSubmitting || !hasChanges}
                className='group flex items-center gap-3 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <SparklesIcon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
                    {hasChanges ? 'Salvar Alterações' : 'Nenhuma alteração'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarAnotacao;
