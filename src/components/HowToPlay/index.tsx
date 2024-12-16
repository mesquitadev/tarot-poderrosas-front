import React from 'react';

const HowToPlay = () => {
  return (
    <div className='flex flex-col bg-custom-gray-light p-5 justify-start text-start rounded-md mt-10'>
      <div className='my-2'>
        <p className='text-center text-custom-gray-text'>Como Jogar?</p>
      </div>
      <ul>
        <li>
          <p className='text-sm text-custom-gray-text'>
            1. Em um ambiente tranquilo, respire profundamente e centrar-se em si mesma.
          </p>
        </li>
        <li>
          <p className='text-sm text-custom-gray-text'>
            2. Em seguida, olhe bens para todas as cartas , focando na intenção de receber uma
            mensagem que a guiará durante o dia.
          </p>
        </li>
        <li>
          <p className='text-sm text-custom-gray-text'>3. Escolha uma única carta.</p>
        </li>
        <li>
          <p className='text-sm text-custom-gray-text'>
            4. Ao revelar a carta, observe sua imagem e simbolismos. Pergunte a si mesma: "O que
            esta carta está tentando me mostrar?
          </p>
        </li>
      </ul>
    </div>
  );
};

export default HowToPlay;
