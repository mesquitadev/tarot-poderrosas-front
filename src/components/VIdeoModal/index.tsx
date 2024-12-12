import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/2'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-end'>
          <button onClick={onClose} className='text-black'>
            &times;
          </button>
        </div>
        <div className='aspect-w-16 aspect-h-9'>
          <iframe
            width='100%'
            height='500px'
            src='https://www.youtube.com/embed/NBSE2mUnMFg?si=330lPgdagXS6mMfo'
            title='Dinamica do Tarot'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
