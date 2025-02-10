import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import background from '../../assets/Login.svg';
import logo from '../../assets/PoderRosa_logo_Branca.svg';
import api from '@/services';

interface FormData {
  password: string;
  confirmPassword: string;
}

const CreatePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const location = useLocation();

  const token = new URLSearchParams(location.search).get('token');

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await api.post('/create-password', { token, password: data.password });
      navigate('/login');
    } catch (err) {
      alert('Failed to create password');
    }
  };

  return (
    <div
      className='flex h-screen bg-cover bg-center'
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center bg-opacity-75 p-8'>
        <div className='flex items-center'>
          <img src={logo} alt='PoderRosa Logo' className='w-100 h-100' />
        </div>
        <div className='w-full max-w-sm rounded-md p-5 bg-custom-primary text-start'>
          <h2 className='text-3xl font-bold mb-6 text-white text-center'>Ativar Conta</h2>
          <p className='text-sm font-bold mb-6 text-white text-center'>
            Para ativar sua conta, é necessário criar uma senha.
          </p>
          <form className='w-full max-w-sm' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
                Senha
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='Senha'
                {...register('password', { required: 'Password is required' })}
                required
              />
              {errors.password && (
                <p className='text-red-500 text-xs italic'>{errors.password.message}</p>
              )}
            </div>
            <div className='mb-6'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='confirmPassword'>
                Confirmar Senha
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='confirmPassword'
                type='password'
                placeholder='Confirmar Senha'
                {...register('confirmPassword', { required: 'Confirm Password is required' })}
                required
              />
              {errors.confirmPassword && (
                <p className='text-red-500 text-xs italic'>{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className='flex items-center justify-center w-full'>
              <button
                className='bg-custom-start flex flex-row hover:bg-custom-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Ativar Conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
