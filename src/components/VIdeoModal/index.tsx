import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from '@/components/ui/dialog';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='max-w-2xl p-0 bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl shadow-2xl border border-purple-100/50 mx-4'>
        <DialogHeader className='p-6 pb-0'>
          <h2 className='text-2xl font-bold text-custom-primary'>Assista ao vídeo</h2>
        </DialogHeader>
        <div className='aspect-video w-full flex items-center justify-center bg-black/5'>
          {/*<iframe*/}
          {/*  id='video-player'*/}
          {/*  src={videoUrl}*/}
          {/*  allow='accelerometer; gyroscope; autoplay; encrypted-media'*/}
          {/*  allowFullScreen*/}
          {/*  title='Video Player'*/}
          {/*  */}
          {/*></iframe>*/}

          <iframe
            src={videoUrl}
            width='640'
            height='360'
            allow='autoplay; fullscreen; encrypted-media; picture-in-picture'
            allowFullScreen
            frameBorder='0'
            className='w-full h-full rounded-xl border-none shadow-lg mx-5'
          ></iframe>
        </div>
        <DialogFooter className='p-6 pt-4 flex justify-end'>
          <button
            onClick={onClose}
            className='bg-custom-primary hover:bg-custom-start text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-colors'
          >
            Fechar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
