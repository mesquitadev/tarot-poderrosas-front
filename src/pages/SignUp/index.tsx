import { useForm } from 'react-hook-form';
import { useState } from 'react';
import background from '../../assets/Login.svg';
import logo from '../../assets/PoderRosa_logo_Branca.svg';
import { useLoading } from '@/hooks/useLoading';
// import { useNavigate } from 'react-router';

interface FormData {
  nome: string;
  sobrenome: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  // const navigate = useNavigate();
  const { loading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    // try {
    //   const { confirmPassword, acceptTerms, ...signUpData } = data;
    //   await signUp(signUpData);
    //   navigate('/inicio');
    // } catch (error) {
    //   console.error('Signup error:', error);
    // }
    console.log(data);
  };

  return (
    <div className='min-h-screen flex'>
      {/* Lado esquerdo - Imagem de fundo */}
      <div
        className='hidden lg:flex lg:w-1/2 relative bg-cover bg-center'
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className='absolute inset-0 bg-gradient-to-br from-custom-primary/80 to-custom-start/60'></div>
        <div className='relative z-10 flex flex-col justify-center items-center text-white p-12'>
          <div className='text-center space-y-6'>
            <h1 className='text-4xl font-bold mb-4'>Comece sua Jornada</h1>
            <p className='text-xl opacity-90 leading-relaxed'>
              Junte-se à comunidade PoderRosa e descubra o poder da sua intuição através de cartas
              inspiradoras e práticas transformadoras.
            </p>
            <div className='flex items-center justify-center space-x-2 text-lg'>
              <span className='text-2xl'>🌹</span>
              <span>Sua essência te espera</span>
              <span className='text-2xl'>✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de Cadastro */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-gray-50 to-white'>
        {/* Logo para telas menores */}
        <div className='lg:hidden mb-8'>
          <img src={logo} alt='PoderRosa Logo' className='w-32 h-32 mx-auto' />
        </div>

        {/* Card de Cadastro */}
        <div className='w-full max-w-md'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='hidden lg:block mb-6'>
              <img src={logo} alt='PoderRosa Logo' className='w-20 h-20 mx-auto mb-4' />
            </div>
            <h2 className='text-3xl font-bold text-custom-primary mb-2'>Criar Conta</h2>
            <p className='text-gray-600'>Preencha seus dados para começar sua jornada</p>
          </div>

          {/* Formulário */}
          <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all duration-300 hover:shadow-2xl'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              {/* Nome e Sobrenome */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='block text-gray-700 text-sm font-semibold' htmlFor='nome'>
                    Nome
                  </label>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:bg-white focus:outline-none ${
                      errors.nome
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-custom-start'
                    }`}
                    id='nome'
                    type='text'
                    placeholder='Seu nome'
                    {...register('nome', {
                      required: 'Nome é obrigatório',
                      minLength: {
                        value: 2,
                        message: 'Nome deve ter pelo menos 2 caracteres',
                      },
                    })}
                  />
                  {errors.nome && (
                    <p className='text-red-500 text-xs flex items-center'>
                      <svg className='w-3 h-3 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label className='block text-gray-700 text-sm font-semibold' htmlFor='sobrenome'>
                    Sobrenome
                  </label>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:bg-white focus:outline-none ${
                      errors.sobrenome
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-custom-start'
                    }`}
                    id='sobrenome'
                    type='text'
                    placeholder='Seu sobrenome'
                    {...register('sobrenome', {
                      required: 'Sobrenome é obrigatório',
                      minLength: {
                        value: 2,
                        message: 'Sobrenome deve ter pelo menos 2 caracteres',
                      },
                    })}
                  />
                  {errors.sobrenome && (
                    <p className='text-red-500 text-xs flex items-center'>
                      <svg className='w-3 h-3 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {errors.sobrenome.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <label className='block text-gray-700 text-sm font-semibold' htmlFor='email'>
                  Email
                </label>
                <div className='relative'>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:bg-white focus:outline-none ${
                      errors.email
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-custom-start'
                    }`}
                    id='email'
                    type='email'
                    placeholder='seu@email.com'
                    {...register('email', {
                      required: 'Email é obrigatório',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido',
                      },
                    })}
                  />
                  <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                    <svg
                      className='w-5 h-5 text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                      />
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <p className='text-red-500 text-sm flex items-center'>
                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Senha */}
              <div className='space-y-2'>
                <label className='block text-gray-700 text-sm font-semibold' htmlFor='password'>
                  Senha
                </label>
                <div className='relative'>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:bg-white focus:outline-none pr-12 ${
                      errors.password
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-custom-start'
                    }`}
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    {...register('password', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'Senha deve ter pelo menos 6 caracteres',
                      },
                    })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                        />
                      </svg>
                    ) : (
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-sm flex items-center'>
                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirmar Senha */}
              <div className='space-y-2'>
                <label
                  className='block text-gray-700 text-sm font-semibold'
                  htmlFor='confirmPassword'
                >
                  Confirmar Senha
                </label>
                <div className='relative'>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:bg-white focus:outline-none pr-12 ${
                      errors.confirmPassword
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-custom-start'
                    }`}
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    {...register('confirmPassword', {
                      required: 'Confirme sua senha',
                      validate: (value) => value === password || 'As senhas não coincidem',
                    })}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600'
                  >
                    {showConfirmPassword ? (
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                        />
                      </svg>
                    ) : (
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm flex items-center'>
                    <svg className='w-4 h-4 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Aceitar Termos */}
              <div className='flex items-start space-x-3'>
                <input
                  type='checkbox'
                  id='acceptTerms'
                  {...register('acceptTerms', {
                    required: 'Você deve aceitar os termos de uso',
                  })}
                  className='w-5 h-5 mt-0.5 text-custom-start border-2 border-gray-300 rounded focus:ring-custom-start'
                />
                <div className='flex-1'>
                  <label htmlFor='acceptTerms' className='text-sm text-gray-700 leading-tight'>
                    Eu aceito os{' '}
                    <a
                      href='/termos'
                      className='text-custom-start hover:text-custom-primary font-medium'
                    >
                      Termos de Uso
                    </a>{' '}
                    e{' '}
                    <a
                      href='/privacidade'
                      className='text-custom-start hover:text-custom-primary font-medium'
                    >
                      Política de Privacidade
                    </a>
                  </label>
                  {errors.acceptTerms && (
                    <p className='text-red-500 text-xs mt-1 flex items-center'>
                      <svg className='w-3 h-3 mr-1' fill='currentColor' viewBox='0 0 20 20'>
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Botão de Submit */}
              <button
                type='submit'
                disabled={isSubmitting || loading}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isSubmitting || loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-custom-start to-custom-primary hover:from-custom-primary hover:to-custom-start hover:scale-105 hover:shadow-lg active:scale-95'
                }`}
              >
                {isSubmitting || loading ? (
                  <div className='flex items-center justify-center'>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Criando conta...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <span>Criar Conta</span>
                    <svg
                      className='w-5 h-5 ml-2'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                      />
                    </svg>
                  </div>
                )}
              </button>
            </form>

            {/* Links adicionais */}
            <div className='mt-6 text-center space-y-4'>
              <div className='flex items-center justify-center'>
                <div className='border-t border-gray-300 flex-1'></div>
                <span className='px-4 text-gray-500 text-sm'>ou</span>
                <div className='border-t border-gray-300 flex-1'></div>
              </div>
              <p className='text-gray-600 text-sm'>
                Já tem uma conta?{' '}
                <a
                  href='/login'
                  className='text-custom-start hover:text-custom-primary font-medium transition-colors'
                >
                  Entrar aqui
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
