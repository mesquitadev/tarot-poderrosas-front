import React from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'
      onClick={onClose}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClose()}
    >
      <div
        className='bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/2'
        onClick={(e) => e.stopPropagation()}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && e.stopPropagation()}
      >
        <div className='aspect-w-16 aspect-h-9'>
          <iframe
            id='panda-5a76d6d0-eaa9-4cbc-a0c1-34dbb150937f'
            src={videoUrl}
            className='border:none;'
            allow='accelerometer;gyroscope;autoplay;encrypted-media'
            allowFullScreen
            width='100%'
            height='500px'
            title='Video Player'
          ></iframe>
        </div>
        <div className='border-t border-gray-300 w-full my-2'></div>
        <div className='flex justify-end mt-1'>
          <button onClick={onClose} className='bg-primary p-2 rounded-md  text-white text-sm'>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
