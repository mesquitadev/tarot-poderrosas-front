import React, { useState } from 'react';
import { CheckIcon, ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/outline';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

interface ShareButtonsProps {
  title: string;
  text: string;
  url?: string;
  hashtags?: string[];
  className?: string;
  compact?: boolean;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  title,
  text,
  url = window.location.href,
  hashtags = ['PoderrRosa', 'Autoconhecimento', 'Espiritualidade'],
  className = '',
  compact = false,
}) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareData = {
    title,
    text,
    url,
    hashtags: hashtags.map((tag) => `#${tag}`).join(' '),
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback para navegadores que não suportam clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareButtons = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'from-green-400 to-green-500',
      hoverColor: 'hover:from-green-500 hover:to-green-600',
      action: () => {
        const message = `${shareData.text}\n\n${shareData.hashtags}\n\n${shareData.url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      },
    },
    {
      name: 'Instagram',
      icon: FaInstagram,
      color: 'from-pink-400 via-purple-500 to-purple-600',
      hoverColor: 'hover:from-pink-500 hover:via-purple-600 hover:to-purple-700',
      action: () => {
        // Instagram não permite compartilhamento direto via URL, então copiamos o texto
        copyToClipboard(`${shareData.text}\n\n${shareData.hashtags}\n\n${shareData.url}`);
        alert('Texto copiado! Cole em seu Instagram Stories ou post.');
      },
    },
    // {
    //   name: 'Facebook',
    //   icon: FaFacebook,
    //   color: 'from-blue-500 to-blue-600',
    //   hoverColor: 'hover:from-blue-600 hover:to-blue-700',
    //   action: () => {
    //     window.open(
    //       `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    //         shareData.url,
    //       )}&quote=${encodeURIComponent(shareData.text)}`,
    //       '_blank',
    //     );
    //   },
    // },
    // {
    //   name: 'Twitter',
    //   icon: FaTwitter,
    //   color: 'from-sky-400 to-sky-500',
    //   hoverColor: 'hover:from-sky-500 hover:to-sky-600',
    //   action: () => {
    //     const tweetText = `${shareData.text} ${shareData.hashtags}`;
    //     window.open(
    //       `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    //         tweetText,
    //       )}&url=${encodeURIComponent(shareData.url)}`,
    //       '_blank',
    //     );
    //   },
    // },
    // {
    //   name: 'LinkedIn',
    //   icon: FaLinkedin,
    //   color: 'from-blue-600 to-blue-700',
    //   hoverColor: 'hover:from-blue-700 hover:to-blue-800',
    //   action: () => {
    //     window.open(
    //       `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    //         shareData.url,
    //       )}`,
    //       '_blank',
    //     );
    //   },
    // },
    // {
    //   name: 'Telegram',
    //   icon: FaTelegram,
    //   color: 'from-blue-400 to-blue-500',
    //   hoverColor: 'hover:from-blue-500 hover:to-blue-600',
    //   action: () => {
    //     const message = `${shareData.text}\n\n${shareData.hashtags}\n\n${shareData.url}`;
    //     window.open(
    //       `https://t.me/share/url?url=${encodeURIComponent(
    //         shareData.url,
    //       )}&text=${encodeURIComponent(message)}`,
    //       '_blank',
    //     );
    //   },
    // },
  ];

  const handleCopyLink = () => {
    const fullText = `${shareData.text}\n\n${shareData.hashtags}\n\n${shareData.url}`;
    copyToClipboard(fullText);
  };

  // const handleNativeShare = async () => {
  //   if (navigator.share) {
  //     try {
  //       await navigator.share(shareData);
  //     } catch (error) {
  //       console.error('Erro ao compartilhar:', error);
  //     }
  //   }
  // };

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className='group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-custom-primary to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105'
        >
          <ShareIcon className='w-4 h-4 group-hover:rotate-12 transition-transform duration-300' />
          <span className='text-sm font-medium'>Compartilhar</span>
        </button>

        {showShareMenu && (
          <div className='absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 min-w-[280px]'>
            <h4 className='text-sm font-semibold text-gray-800 mb-3'>Compartilhar inspiração</h4>
            <div className='grid grid-cols-3 gap-2 mb-3'>
              {shareButtons.slice(0, 6).map((button) => {
                const IconComponent = button.icon;
                return (
                  <button
                    key={button.name}
                    onClick={() => {
                      button.action();
                      setShowShareMenu(false);
                    }}
                    className={`group flex flex-col items-center gap-2 p-3 bg-gradient-to-r ${button.color} ${button.hoverColor} text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg`}
                  >
                    <IconComponent className='w-5 h-5' />
                    <span className='text-xs font-medium'>{button.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                handleCopyLink();
                setShowShareMenu(false);
              }}
              className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300'
            >
              {copied ? (
                <>
                  <CheckIcon className='w-4 h-4 text-green-600' />
                  <span className='text-sm font-medium text-green-600'>Copiado!</span>
                </>
              ) : (
                <>
                  <ClipboardDocumentIcon className='w-4 h-4' />
                  <span className='text-sm font-medium'>Copiar texto</span>
                </>
              )}
            </button>
          </div>
        )}

        {/*/!* Overlay para fechar o menu *!/*/}
        {/*{showShareMenu && (*/}
        {/*  <div className='fixed inset-0 z-40' onClick={() => setShowShareMenu(false)} />*/}
        {/*)}*/}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Título da Seção */}
      <div className='flex items-center gap-2 mb-3'>
        <ShareIcon className='w-5 h-5 text-custom-primary' />
        <h4 className='text-lg font-semibold text-gray-800'>Compartilhar inspiração</h4>
      </div>

      {/* Botões de Redes Sociais */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3'>
        {shareButtons.map((button) => {
          const IconComponent = button.icon;
          return (
            <button
              key={button.name}
              onClick={button.action}
              className={`group flex flex-col items-center gap-3 p-4 bg-gradient-to-r ${button.color} ${button.hoverColor} text-white rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <IconComponent className='w-6 h-6 group-hover:scale-110 transition-transform duration-300' />
              <span className='text-sm font-semibold'>{button.name}</span>
            </button>
          );
        })}
      </div>

      {/* Botões Adicionais */}
      <div className='flex gap-3'>
        {/* Copiar Link */}
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-300 flex-1 justify-center ${
            copied
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-custom-primary/30 hover:bg-purple-50'
          }`}
        >
          {copied ? (
            <>
              <CheckIcon className='w-5 h-5' />
              <span className='font-medium'>Texto copiado com sucesso!</span>
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className='w-5 h-5' />
              <span className='font-medium'>Copiar texto completo</span>
            </>
          )}
        </button>

        {/*/!* Compartilhamento Nativo (se disponível) *!/*/}
        {/*{navigator.share() && (*/}
        {/*  <button*/}
        {/*    onClick={handleNativeShare}*/}
        {/*    className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-custom-primary to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium'*/}
        {/*  >*/}
        {/*    <ShareIcon className='w-5 h-5' />*/}
        {/*    <span>Mais</span>*/}
        {/*  </button>*/}
        {/*)}*/}
      </div>

      {/* Dica de Compartilhamento */}
      <div className='bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100'>
        <p className='text-sm text-purple-700 text-center'>
          💜 Espalhe boas energias compartilhando essa inspiração com quem você ama
        </p>
      </div>
    </div>
  );
};

export default ShareButtons;
