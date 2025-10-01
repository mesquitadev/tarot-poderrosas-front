// @ts-nocheck
// Organização e otimização do AddNoteModal
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  BookmarkIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  FireIcon,
  HeartIcon,
  LightBulbIcon,
  PencilSquareIcon,
  SparklesIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCreateDiaryEntryMutation } from '@/services/diaryApiSlice';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTitle?: string;
  defaultContent?: string;
  onSaved?: () => void;
}

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

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  defaultTitle = '',
  defaultContent = '',
  onSaved,
}) => {
  // Estados
  const [title, setTitle] = useState<string>(defaultTitle);
  const [content, setContent] = useState<string>(defaultContent);
  const [selectedCategory, setSelectedCategory] = useState('reflexao');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const titleInputRef = React.useRef<HTMLInputElement>(null);

  // RTK Mutation
  const [createDiaryEntry, { isLoading, isSuccess, error }] = useCreateDiaryEntryMutation();

  // Estatísticas em tempo real
  useEffect(() => {
    if (content) {
      const plainText = content.replace(/<[^>]+>/g, '').trim();
      const words = plainText ? plainText.split(/\s+/).length : 0;
      setWordCount(words);
      setCharCount(plainText.length);
    } else {
      setWordCount(0);
      setCharCount(0);
    }
  }, [content]);

  // Reset quando abrir/fechar
  useEffect(() => {
    if (isOpen) {
      setTitle(defaultTitle || '');
      setContent(defaultContent || '');
      setSelectedCategory('reflexao');
      setIsPreviewMode(false);
      setWordCount(0);
      setCharCount(0);
    }
  }, [isOpen, defaultTitle, defaultContent]);

  // Fechar modal ao sucesso
  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setContent('');
      setErrorMessage(null);
      titleInputRef.current?.focus();
      onSaved?.();
      onClose();
    }
  }, [isSuccess, onSaved, onClose]);

  // Função de salvar
  const handleSave = async () => {
    if (isLoading) return;
    if (!title?.trim()) {
      setErrorMessage('O título é obrigatório.');
      return;
    }
    if (!content?.trim()) {
      setErrorMessage('O conteúdo é obrigatório.');
      return;
    }
    setErrorMessage(null);
    try {
      await createDiaryEntry({
        title: title.trim(),
        content,
        category: selectedCategory,
      }).unwrap();
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message || err?.message || 'Erro ao salvar anotação. Tente novamente.',
      );
    }
  };

  const isFormValid = title.trim() && content.trim();
  const selectedCategoryData =
    categories.find((cat) => cat.id === selectedCategory) || categories[0];
  const IconComponent = selectedCategoryData.icon;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-4xl mx-4 p-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/20 rounded-3xl shadow-2xl w-full max-h-[90vh] border border-purple-100/50'>
        {/* Header Premium */}
        <DialogHeader className='relative bg-white/90 backdrop-blur-sm p-6 border-b border-purple-100/50'>
          {/* Decorações de fundo */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-custom-primary/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16'></div>
          <div className='absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 rounded-full translate-y-10 -translate-x-10'></div>
          <div className='relative z-10 flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div
                className={`p-3 bg-gradient-to-r ${selectedCategoryData.color} rounded-2xl shadow-lg`}
              >
                <IconComponent className='w-8 h-8 text-white' />
              </div>
              <div>
                <h2 className='text-2xl font-bold text-custom-primary mb-1'>Nova Reflexão</h2>
                <p className='text-gray-600 flex items-center gap-2'>
                  <ClockIcon className='w-4 h-4' />
                  {format(new Date(), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
            {/*<DialogClose asChild>*/}
            {/*  <button*/}
            {/*    className='p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200'*/}
            {/*    aria-label='Fechar modal'*/}
            {/*  >*/}
            {/*    <XMarkIcon className='w-6 h-6 text-gray-400' />*/}
            {/*  </button>*/}
            {/*</DialogClose>*/}
          </div>
        </DialogHeader>

        {/* Conteúdo do Modal */}
        <div className='p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto'>
          {/* Seleção de Categoria */}
          <section
            aria-label='Seleção de categoria'
            className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100'
          >
            <h3 className='text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2'>
              <BookmarkIcon className='w-5 h-5' />
              Escolha o tipo da sua reflexão
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
                    aria-label={`Selecionar categoria ${category.name}`}
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
          </section>

          {/* Campo Título */}
          <section
            aria-label='Título da reflexão'
            className='bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100'
          >
            <label className='block text-lg font-semibold text-gray-800 mb-3' htmlFor='note-title'>
              Título da sua reflexão
            </label>
            <input
              id='note-title'
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Digite um título inspirador...'
              ref={titleInputRef}
              className='w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl transition-all duration-300 focus:outline-none focus:border-custom-primary bg-white'
            />
            {title && (
              <p className='mt-2 text-sm text-green-600 flex items-center gap-2'>
                <CheckIcon className='w-4 h-4' />
                Título perfeito!
              </p>
            )}
            {errorMessage && (
              <p className='mt-2 text-sm text-red-600 flex items-center gap-2'>
                <XMarkIcon className='w-4 h-4' />
                {errorMessage}
              </p>
            )}
            {/* Exibe erro do RTK Query se existir e não for erro de validação local */}
            {error && !errorMessage && (
              <p className='mt-2 text-sm text-red-600 flex items-center gap-2'>
                <XMarkIcon className='w-4 h-4' />
                {typeof error === 'string'
                  ? error
                  : error?.data?.message || 'Erro ao salvar anotação. Tente novamente.'}
              </p>
            )}
          </section>

          {/* Editor de Conteúdo Premium */}
          <section
            aria-label='Conteúdo da reflexão'
            className='bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100'
          >
            <div className='p-6 border-b border-gray-100 flex items-center justify-between'>
              <h3 className='text-lg font-semibold text-gray-800 flex items-center gap-2'>
                <PencilSquareIcon className='w-5 h-5' />
                Conteúdo
              </h3>
              <button
                type='button'
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 shadow-sm ${
                  isPreviewMode
                    ? 'bg-gradient-to-r from-custom-primary to-purple-600 text-white shadow-lg'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-300 hover:shadow-md'
                }`}
                aria-label={isPreviewMode ? 'Voltar para o editor' : 'Visualizar conteúdo'}
              >
                <EyeIcon
                  className={`w-4 h-4 ${
                    isPreviewMode ? 'animate-pulse' : 'group-hover:scale-110'
                  } transition-transform duration-300`}
                />
                {isPreviewMode ? 'Editor' : 'Preview'}
              </button>
            </div>
            {/* Templates rápidos */}
            {!content && !isPreviewMode && (
              <div className='mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100'>
                <h4 className='text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2'>
                  <SparklesIcon className='w-4 h-4 text-purple-600' />
                  Templates para começar
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  <button
                    type='button'
                    onClick={() =>
                      setContent(
                        '<h3>🌟 Reflexão do momento</h3><p>Neste momento eu sinto...</p><h3>💭 Pensamentos</h3><p>Estive refletindo sobre...</p>',
                      )
                    }
                    className='text-left p-3 bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all duration-300 text-sm'
                    aria-label='Usar template Reflexão Livre'
                  >
                    <span className='font-medium text-purple-700'>📝 Reflexão Livre</span>
                    <p className='text-gray-600 text-xs mt-1'>Para momentos de introspecção</p>
                  </button>
                  <button
                    type='button'
                    onClick={() =>
                      setContent(
                        '<h3>🙏 Gratidão de hoje</h3><p>Hoje sou grata por...</p><h3>✨ Momentos especiais</h3><p>O que me marcou foi...</p>',
                      )
                    }
                    className='text-left p-3 bg-white rounded-lg border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all duration-300 text-sm'
                    aria-label='Usar template Gratidão'
                  >
                    <span className='font-medium text-purple-700'>💖 Gratidão</span>
                    <p className='text-gray-600 text-xs mt-1'>Reconhecer as bênçãos do dia</p>
                  </button>
                </div>
              </div>
            )}
            <div className='p-6'>
              {isPreviewMode ? (
                <div className='min-h-[300px] max-w-none'>
                  {content ? (
                    <div
                      className='prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900 prose-em:text-purple-700 prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:italic'
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <div className='flex flex-col items-center justify-center h-64 text-center'>
                      <div className='w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-4'>
                        <DocumentTextIcon className='w-8 h-8 text-purple-400' />
                      </div>
                      <p className='text-gray-500 italic text-lg'>
                        Comece a escrever para ver a visualização...
                      </p>
                      <p className='text-gray-400 text-sm mt-2'>
                        Suas palavras ganharão vida aqui ✨
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className='relative'>
                  <style jsx global>{`
                    .modal-quill .ql-toolbar {
                      background: linear-gradient(135deg, #f8f9ff 0%, #f3f4f6 100%);
                      border: none !important;
                      border-bottom: 1px solid #e5e7eb !important;
                      padding: 12px 16px;
                      border-radius: 12px 12px 0 0;
                    }
                    .modal-quill .ql-toolbar .ql-formats {
                      margin-right: 20px;
                    }
                    .modal-quill .ql-toolbar button {
                      width: 32px;
                      height: 32px;
                      border-radius: 8px;
                      transition: all 0.2s ease;
                      margin: 0 2px;
                    }
                    .modal-quill .ql-toolbar button:hover {
                      background: rgba(124, 58, 237, 0.1);
                      transform: scale(1.05);
                    }
                    .modal-quill .ql-toolbar button.ql-active {
                      background: linear-gradient(135deg, #7c3aed, #a855f7);
                      color: white;
                    }
                    .modal-quill .ql-editor {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      font-size: 16px;
                      line-height: 1.7;
                      padding: 24px;
                      min-height: 300px;
                      background: white;
                      border-radius: 0 0 12px 12px;
                    }
                    .modal-quill .ql-editor::before {
                      color: #9ca3af;
                      font-style: italic;
                      font-size: 16px;
                    }
                    .modal-quill .ql-container {
                      border: none !important;
                    }
                    .modal-quill {
                      border-radius: 12px;
                      overflow: hidden;
                      border: 2px solid #e5e7eb;
                      transition: border-color 0.2s ease;
                    }
                    .modal-quill:focus-within {
                      border-color: #7c3aed;
                    }
                  `}</style>
                  <ReactQuill
                    theme='snow'
                    value={content}
                    onChange={setContent}
                    placeholder='✨ Deixe seus pensamentos fluírem... Este é seu espaço sagrado para expressar tudo que está em seu coração.'
                    className='modal-quill'
                    modules={{
                      toolbar: [
                        [{ header: ['1', '2', '3', false] }],
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['blockquote'],
                        ['clean'],
                      ],
                    }}
                  />
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Footer com Ações e Estatísticas */}
        <DialogFooter className='bg-gradient-to-r from-gray-50 to-purple-50/50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-center'>
          <div className='flex items-center gap-4 text-xs text-gray-500'>
            <span className='flex items-center gap-1'>
              <CheckIcon className='w-3 h-3 text-green-500' />
              {charCount} caracteres
            </span>
            <span>{wordCount} palavras</span>
            <span>Tempo de leitura: {Math.max(1, Math.ceil(wordCount / 200))} min</span>
          </div>
          <div className='flex gap-3'>
            <DialogClose asChild>
              <button
                type='button'
                className='px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium'
                aria-label='Cancelar e fechar modal'
              >
                Cancelar
              </button>
            </DialogClose>
            <button
              type='button'
              onClick={handleSave}
              disabled={!isFormValid || isLoading}
              className='group flex items-center gap-3 bg-gradient-to-r from-custom-primary via-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100'
              aria-label='Salvar reflexão'
            >
              {isLoading ? (
                <>
                  <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></div>
                  Salvando...
                </>
              ) : isSuccess ? (
                <>
                  <CheckIcon className='w-5 h-5' />
                  Salvo com sucesso!
                </>
              ) : (
                <>
                  <StarIcon className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
                  Salvar Reflexão
                </>
              )}
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;
