import React, { useCallback, useEffect, useState } from 'react';
import api from '@/services';
import { addDays, format, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
    <div className='flex flex-wrap justify-center'>
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
        <div className='mt-2 h-[150px] w-full justify-center items-center bg-white rounded drop-shadow'>
          <div className='flex flex-col p-4 w-full h-full  relative justify-center'>
            <div className='absolute left-0 h-20 w-2 bg-custom-start'></div>
            <p className='text-lg text-custom-start'>{mission.title}</p>
            <p className='text-sm text-custom-start'>{mission.task}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const DesafioDoDia = () => {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Desafio do Dia</h1>
      <WeekDays />
    </div>
  );
};

export default DesafioDoDia;
