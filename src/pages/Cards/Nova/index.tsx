import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface CardData {
  card: string;
  title: string;
  subtitle: string;
  affirmation: string;
  img: string;
  suggested_music: string;
  blend: string;
  power: string;
}

export default function CreateCard() {
  const { register, handleSubmit } = useForm<CardData>();

  const onSubmit: SubmitHandler<CardData> = async (data) => {
    try {
      await axios.post('/api/cards', data);
      alert('Card created successfully!');
    } catch (error) {
      console.error('Error creating card:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Create New Card</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium'>Card</label>
          <input
            type='text'
            {...register('card')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Title</label>
          <input
            type='text'
            {...register('title')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Subtitle</label>
          <input
            type='text'
            {...register('subtitle')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Affirmation</label>
          <textarea
            {...register('affirmation')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Image URL</label>
          <input
            type='text'
            {...register('img')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Blend</label>
          <input
            type='text'
            {...register('blend')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Power</label>
          <input
            type='text'
            {...register('power')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <div>
          <label className='block text-sm font-medium'>Suggested Music</label>
          <input
            type='text'
            {...register('suggested_music')}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2'
          />
        </div>
        <button type='submit' className='bg-green-500 text-white py-2 px-4 rounded'>
          Create Card
        </button>
      </form>
    </div>
  );
}
