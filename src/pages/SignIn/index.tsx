import React from 'react';
import { useForm } from 'react-hook-form';
import background from '../../assets/Login.svg';
import logo from '../../assets/PoderRosa_logo_Branca.svg';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuth();

  const onSubmit = async (data: any) => {
    console.log('Form data:', data);
    try {
      await signIn(data);
    } catch (error) {
      console.error('Login error:', error);
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
        <div className='w-full max-w-sm  rounded-md p-5 bg-custom-primary text-start'>
          <h2 className='text-3xl font-bold mb-6 text-white'>Entrar</h2>
          <form className='w-full max-w-sm' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='identifier'>
                Email
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='identifier'
                type='text'
                placeholder='Email'
                {...register('identifier')}
                required
              />
            </div>
            <div className='mb-6'>
              <label className='block text-white text-sm font-bold mb-2' htmlFor='password'>
                Senha
              </label>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='Senha'
                {...register('password')}
                required
              />
            </div>
            <div className='flex items-center justify-center w-full'>
              <button
                className='bg-custom-start hover:bg-custom-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
