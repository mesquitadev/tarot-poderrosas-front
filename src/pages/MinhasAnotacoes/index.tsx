import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import api from '@/services';

const MinhasAnotacoes = () => {
  const [annotations, setAnnotations] = useState<any[]>([]);
  const history = useHistory();

  const handleGetAnnotations = useCallback(async () => {
    const response = await api.get('/diary');
    setAnnotations(response.data);
  }, []);

  useEffect(() => {
    handleGetAnnotations();
  }, [handleGetAnnotations]);

  const bgColors = ['bg-custom-start', 'bg-custom-primary'];

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Minhas Anotações</h1>
        <button
          onClick={() => history.push('/minhas-anotacoes/nova')}
          className='bg-custom-start hover:bg-custom-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Nova Anotação
        </button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        {annotations?.map((annotation: any, index: number) => (
          <div
            key={annotation.id}
            className={`${
              bgColors[index % bgColors.length]
            } p-3 rounded-lg shadow-md min-h-[200px] flex flex-col justify-between relative`}
          >
            <button
              onClick={() => history.push(`/minhas-anotacoes/editar/${annotation.id}`)}
              className='absolute top-2 right-2 text-white p-1 rounded'
            >
              <FaEdit />
            </button>
            <p className='text-md text-gray-50'>{annotation.title}</p>
            <div>
              <p className='text-sm text-gray-50'>{annotation.createdAt}</p>
              <p className='text-sm text-gray-50 text-wrap break-words line-clamp-4'>
                {annotation.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinhasAnotacoes;
