import React from 'react';
import { FaInfoCircle, FaPlusCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

interface EmptyComponentProps {
  message?: string;
  to?: string;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({ message, to }) => {
  const history = useHistory();

  return (
    <div className='border-2 border-dashed border-gray-500 rounded-md flex flex-col items-center justify-center h-full'>
      {to ? (
        <button
          onClick={() => history.push(to)}
          className=' flex justify-center items-center flex-col '
        >
          <FaPlusCircle className='text-gray-500 text-6xl mb-4' />
          <p className='text-gray-500 text-lg'>Criar nova Anotação</p>
        </button>
      ) : (
        <FaInfoCircle className='text-gray-500 text-6xl mb-4' />
      )}

      {!to && <p className='text-gray-500 text-lg'>{message}</p>}
    </div>
  );
};

export default EmptyComponent;
