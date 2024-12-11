import React, { useEffect, useState } from 'react';
import api from '@/services';

const DesafioDoDia = () => {
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      const response = await api.get('/daily-challenges');
      setChallenges(response.data);
    };
    fetchChallenges();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Desafio do Dia</h1>
      {challenges?.length === 0 ? (
        <div className='p-5 bg-custom-start rounded-md'>
          <p className='text-md text-gray-50'>Sem desafios cadastrados</p>
        </div>
      ) : (
        challenges?.map((challenge) => (
          <div key={challenge.id} className='bg-custom-primary p-4 rounded-lg shadow-md mb-4'>
            <h2 className='text-xl font-semibold text-gray-50'>{challenge.title}</h2>
            <p className='text-md text-gray-50 mt-2'>{challenge.description}</p>
            <p className='text-sm text-gray-50 mt-4'>Publicado em: {challenge.date}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DesafioDoDia;
