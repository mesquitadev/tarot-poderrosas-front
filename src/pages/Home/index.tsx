import { addDays, format, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import banner from '../../assets/Topo_PoderRosa_Aprovar.svg';
import uma_carta from '../../assets/uma-carta.svg';
import tres_cartas from '../../assets/tres-cartas.svg';
import cinco_cartas from '../../assets/estrela-cinco-cartas.svg';
import { useHistory } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import api from '@/services';

const WeekDays = () => {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
  const currentDayIndex = (new Date().getDay() + 6) % 7;

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(currentDayIndex);
  const [missions, setMissions] = useState<any[]>([]);
  const [mission, setMission] = useState<any>(null);

  const fetchMissions = useCallback(async () => {
    const response = await api.get('/missions');
    setMissions(response.data);
  }, []);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

  useEffect(() => {
    const date = addDays(startDate, currentDayIndex);
    const formattedDate = format(date, 'd');
    const currentMission = missions.find((m) => m.day === Number(formattedDate));
    setMission(currentMission);
  }, [currentDayIndex, startDate, missions]);

  const handleDayClick = (index: number) => {
    setSelectedDayIndex(index);
    const date = addDays(startDate, index);
    const formattedDate = format(date, 'd');
    const selectedMission = missions.find((m) => m.day === Number(formattedDate));
    setMission(selectedMission);
  };

  return (
    <div className='flex flex-wrap justify-start'>
      {daysOfWeek.map((day, index) => {
        const date = addDays(startDate, index);
        return (
          <button
            key={index}
            onClick={() => handleDayClick(index)}
            className={`p-1 py-2 rounded-lg mr-2 mb-2 min-w-[82px] h-full hover:bg-custom-primary hover:text-white ${
              index === selectedDayIndex
                ? 'bg-custom-start text-white'
                : 'bg-blue-custom text-custom-start'
            }`}
          >
            <p className='text-sm'>{day}</p>
            <p className='text-sm'>{format(date, 'd', { locale: ptBR })}</p>
          </button>
        );
      })}
      {mission && (
        <div className='mt-6 h-[150px] w-full justify-center items-center'>
          <div className='mt-2 p-5 w-full h-full bg-gray-50 rounded-md relative items-center'>
            <div className='absolute left-0 h-20 w-2 bg-custom-start'></div>
            <p className='text-lg text-white'>{mission?.title}</p>
            <p className='text-sm text-white'>{mission?.task}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const history = useHistory();
  const [annotations, setAnnotations] = useState<any>([]);

  const handleGetAnnotations = useCallback(async () => {
    const response = await api.get('/diary');
    setAnnotations(response.data);
  }, []);

  useEffect(() => {
    handleGetAnnotations();
  }, [handleGetAnnotations]);

  const bgColors = ['bg-custom-start', 'bg-custom-primary'];

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-7 md:grid-cols-2 lg:grid-cols-7 gap-4'>
        <div className='col-span-7 sm:col-span-5'>
          <img src={banner} alt='Banner do poderrosa' className='rounded-xl h-full w-full' />
        </div>

        <div className='col-span-7 sm:col-span-2 lg:grid-cols-2  flex flex-col justify-between align-middle'>
          <p className='text-custom-primary'>Desperte sua Intuição</p>
          <div className='space-y-2 pt-0'>
            <button
              onClick={() => history.push('/tarot/carta-do-dia')}
              className='text-start items-center rounded-lg w-full bg-custom-primary flex flex-row px-5 py-2 text-white justify-center'
            >
              <img src={uma_carta} alt='Icone de uma Carta' />
              <div className='mx-4'>
                <p className='text-md text-white'>Carta do Dia</p>
                <p className='text-sm text-white'>
                  Encontre inspiração no que está ao seu redor agora.
                </p>
              </div>
            </button>

            <button
              onClick={() => history.push('/tarot/tres-cartas')}
              className='rounded-lg bg-custom-primary flex flex-row px-5 py-2 text-white justify-center text-start items-center align-middle min-w-[200px]'
            >
              <img src={tres_cartas} className='w-[50px]' alt='Icone das Três cartas' />
              <div className='mx-4'>
                <p className='text-md text-white font-play'>Três Cartas</p>
                <p className='text-sm text-white'>
                  Descubra novas perspectivas sobre o seu momento.
                </p>
              </div>
            </button>

            <button
              onClick={() => history.push('/tarot/cinco-cartas')}
              className='rounded-lg bg-custom-primary flex flex-row px-5 py-2 text-white justify-center text-start items-center min-w-[300px]'
            >
              <img src={cinco_cartas} className='w-[50px]' alt='Icone das Cinco cartas' />
              <div className='mx-4 break-words'>
                <p className='text-md text-white font-play'>Estrela de Cinco Cartas</p>
                <p className='text-sm text-white'>Interações e conexões entre duas pessoas.</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className='grid gap-4 py-4 sm:grid-cols-1 md:grid-cols-2'>
        <div className=' gap-2 justify-start'>
          <div className=''>
            <div className='mb-2'>
              <p className='font-playfair text-custom-primary'>Desafio Diário</p>
            </div>
            <div>
              <WeekDays />
            </div>
          </div>
        </div>
        <div>
          <div className='mb-5'>
            <p className='text-custom-primary'>Minhas Anotações</p>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {annotations?.slice(0, 3).map((annotation: any, index: number) => (
              <div
                key={annotation.id}
                className={`${
                  bgColors[index % bgColors.length]
                } p-3 rounded-lg shadow-md min-h-[200px] flex flex-col justify-between`}
              >
                <p className='text-md text-gray-50'>{annotation.title}</p>
                <div>
                  <p className='text-sm text-gray-50'>{annotation.createdAt}</p>
                  <div
                    className='text-sm text-gray-50 text-wrap break-words line-clamp-4'
                    dangerouslySetInnerHTML={{ __html: annotation.content }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
