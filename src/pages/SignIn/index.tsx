import { useForm } from 'react-hook-form';
import background from '../../assets/Login.svg';
import logo from '../../assets/PoderRosa_logo_Branca.svg';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { useNavigate } from 'react-router';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const { loading } = useLoading();

  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data);
      navigate('/inicio');
    } catch (error) {
      console.error('Login error:', error);
    }
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
            <h1 className='text-4xl font-bold mb-4'>Bem-vinda ao Poder Rosa</h1>
            <p className='text-xl opacity-90 leading-relaxed'>
              Conecte-se com sua força interior através de cartas inspiradoras, desafios diários e
              momentos de reflexão.
            </p>
            <div className='flex items-center justify-center space-x-2 text-lg'>
              <span className='text-2xl'>🌹</span>
              <span>Desperte sua essência</span>
              <span className='text-2xl'>✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de Login */}
      <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-gray-50 to-white'>
        {/* Logo para telas menores */}
        <div className='lg:hidden mb-8'>
          <img src={logo} alt='PoderRosa Logo' className='w-32 h-32 mx-auto' />
        </div>

        {/* Card de Login */}
        <div className='w-full max-w-md'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='hidden lg:block mb-6'>
              <img src={logo} alt='PoderRosa Logo' className='w-20 h-20 mx-auto mb-4' />
            </div>
            <h2 className='text-3xl font-bold text-custom-primary mb-2'>Bem-vinda de volta!</h2>
            <p className='text-gray-600'>Entre para continuar sua jornada de autoconhecimento</p>
          </div>

          {/* Formulário */}
          <div className='bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all duration-300 hover:shadow-2xl'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              {/* Campo Email */}
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

              {/* Campo Senha */}
              <div className='space-y-2'>
                <label className='block text-gray-700 text-sm font-semibold' htmlFor='password'>
                  Senha
                </label>
                <div className='relative'>
                  <input
                    className={`w-full px-4 py-3 border-2 rounded-xl bg-gray-50 transition-all duration-200 focus:bg-white focus:outline-none ${
                      errors.password
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-gray-200 focus:border-custom-start'
                    }`}
                    id='password'
                    type='password'
                    placeholder='••••••••'
                    {...register('password', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'Senha deve ter pelo menos 6 caracteres',
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
                        d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
                      />
                    </svg>
                  </div>
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
                    Entrando...
                  </div>
                ) : (
                  <div className='flex items-center justify-center'>
                    <span>Entrar</span>
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
                        d='M14 5l7 7m0 0l-7 7m7-7H3'
                      />
                    </svg>
                  </div>
                )}
              </button>
            </form>

            {/* Links adicionais */}
            <div className='mt-6 text-center space-y-4'>
              <a
                href='/esqueci-senha'
                className='text-custom-start hover:text-custom-primary transition-colors text-sm font-medium'
              >
                Esqueceu sua senha?
              </a>
              <div className='flex items-center justify-center'>
                <div className='border-t border-gray-300 flex-1'></div>
                <span className='px-4 text-gray-500 text-sm'>ou</span>
                <div className='border-t border-gray-300 flex-1'></div>
              </div>
              <p className='text-gray-600 text-sm'>
                Ainda não tem conta?{' '}
                <a
                  href='/cadastro'
                  className='text-custom-start hover:text-custom-primary font-medium transition-colors'
                >
                  Cadastre-se aqui
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
