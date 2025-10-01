import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { EyeIcon, HeartIcon, LightBulbIcon, SparklesIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    icon: <HeartIcon className='w-6 h-6 text-pink-500' />,
    text: 'Esteja em um ambiente tranquilo. Respire profundamente, conectando-se consigo mesma e com as forças do universo. Em seguida, observe atentamente todas as cartas e peça, com intenção, para receber uma mensagem que irá guiá-la durante o dia. Ao virar a carta, permita-se sentir e refletir sobre o que ela revela.',
  },
  {
    icon: <EyeIcon className='w-6 h-6 text-purple-500' />,
    text: 'Escolha uma carta de forma intuitiva, confiando na sua conexão interior e na energia do momento.',
  },
  {
    icon: <LightBulbIcon className='w-6 h-6 text-yellow-500' />,
    text: 'Ao revelar a carta, observe sua imagem, símbolos e cores. Permita que sua intuição interprete o significado para você.',
  },
  {
    icon: <SparklesIcon className='w-6 h-6 text-custom-primary' />,
    text: 'Pergunte a si mesma: “O que esta carta está tentando me mostrar?” e leve essa inspiração para o seu dia.',
  },
];

const HowToPlay = () => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenDialog(true)}
        className='inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-custom-primary to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-4'
        aria-label='Abrir instruções de Como Jogar'
      >
        <SparklesIcon className='w-5 h-5' />
        Como Jogar?
      </button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className='max-w-xl mx-4 p-0 bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-xl border border-purple-100/50'>
          <DialogHeader className='flex items-center justify-between p-6 pb-0'>
            <div className='flex items-center gap-3'>
              <SparklesIcon className='w-8 h-8 text-custom-primary' />
              <h2 className='text-3xl font-merryweather text-custom-primary font-bold'>
                Como Jogar?
              </h2>
            </div>
          </DialogHeader>
          <div className='p-6 pt-0'>
            <ul className='space-y-6'>
              {steps.map((step, idx) => (
                <li key={idx} className='flex items-start gap-4'>
                  <div className='flex flex-col items-center justify-center'>
                    <div className='bg-gradient-to-br from-custom-primary/10 to-pink-500/10 rounded-xl p-3 shadow-md mb-2'>
                      {step.icon}
                    </div>
                  </div>
                  <p className='text-base text-custom-gray-text leading-relaxed font-medium'>
                    {step.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HowToPlay;
