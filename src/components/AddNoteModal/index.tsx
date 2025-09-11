import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '@/services';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTitle?: string;
  defaultContent?: string;
  onSaved?: () => void;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  defaultTitle = '',
  defaultContent = '',
  onSaved,
}) => {
  const [title, setTitle] = useState<string>(defaultTitle);
  const [content, setContent] = useState<string>(defaultContent);
  const [isSaving, setIsSaving] = useState(false);

  // Reset when opened/closed
  React.useEffect(() => {
    if (isOpen) {
      setTitle(defaultTitle || '');
      setContent(defaultContent || '');
    }
  }, [isOpen, defaultTitle, defaultContent]);

  const handleSave = async () => {
    if (!title?.trim() || !content?.trim()) return; // simple validation
    try {
      setIsSaving(true);
      await api.post('/diary', { title, content });
      onSaved?.();
      onClose();
    } catch (e) {
      console.error('Erro ao salvar anotação', e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
      <DialogBackdrop className='fixed inset-0 bg-black/40' />
      <div className='fixed inset-0 z-50 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full'>
                  <DialogTitle as='h3' className='text-lg font-semibold leading-6 text-gray-900'>
                    Adicionar Anotação
                  </DialogTitle>
                  <div className='mt-4 w-full'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='note-title'
                    >
                      Título
                    </label>
                    <input
                      id='note-title'
                      type='text'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      placeholder='Digite um título'
                    />
                  </div>
                  <div className='mt-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='note-content'
                    >
                      Conteúdo
                    </label>
                    <ReactQuill
                      theme='snow'
                      value={content}
                      onChange={setContent}
                      className='bg-white'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                onClick={handleSave}
                disabled={isSaving || !title.trim() || !content.trim()}
                className='inline-flex w-full justify-center rounded-md bg-custom-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-start disabled:opacity-50 sm:ml-3 sm:w-auto'
              >
                {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
              <button
                type='button'
                onClick={onClose}
                className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddNoteModal;
