import { Link } from 'react-router-dom';

export default function GuestPrompt() {
  return (
    <div className='w-full flex items-center justify-center py-16'>
      <div className='max-w-2xl w-full bg-white border rounded-2xl shadow-sm p-8 text-center'>
        <h2 className='text-xl md:text-2xl font-semibold text-gray-800'>
          Conteúdo disponível para membros
        </h2>
        <p className='text-gray-600 mt-2'>
          Para acessar este e mais conteúdos, faça login ou crie uma conta.
        </p>
        <div className='mt-6 flex items-center justify-center gap-3'>
          <Link
            to='/'
            className='inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-custom-start text-custom-start hover:bg-custom-start/10 transition'
          >
            Fazer login
          </Link>
          <Link
            to='/cadastro'
            className='inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-gradient-to-r from-custom-start to-custom-primary text-white hover:opacity-95 transition'
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
