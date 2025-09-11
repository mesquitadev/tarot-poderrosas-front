import React, { useRef, useState, useEffect } from 'react';
import { tw } from '@/utils/tw';

interface YouTubeMusicPlayerProps {
  url: string;
  className?: string;
}

function extractVideoId(url: string): string | null {
  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  return null;
}

const YT_API = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=';

const YouTubeMusicPlayer: React.FC<YouTubeMusicPlayerProps> = ({ url, className }) => {
  const videoId = extractVideoId(url);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-1
  const [duration, setDuration] = useState(0); // seconds
  const [current, setCurrent] = useState(0); // seconds
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Busca título e canal
  useEffect(() => {
    if (!videoId) return;
    fetch(`${YT_API}${videoId}&format=json`)
      .then((r) => r.json())
      .then((data) => {
        setTitle(data.title || '');
        setAuthor(data.author_name || '');
      });
  }, [videoId]);

  // Progress bar (fake, pois não temos acesso ao tempo real do iframe YouTube sem API oficial)
  useEffect(() => {
    let interval: any;
    if (playing && duration > 0) {
      interval = setInterval(() => {
        setCurrent((c) => {
          if (c + 1 >= duration) {
            setPlaying(false);
            return duration;
          }
          return c + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [playing, duration]);

  // Simula duração padrão se não conseguir pegar do vídeo
  useEffect(() => {
    if (!duration && playing) setDuration(180);
  }, [playing, duration]);

  useEffect(() => {
    setProgress(duration ? current / duration : 0);
  }, [current, duration]);

  if (!videoId) return <div className={tw('text-red-500', className)}>Link do vídeo inválido</div>;

  const handlePlayPause = () => {
    if (!iframeRef.current) return;
    const action = playing ? 'pauseVideo' : 'playVideo';
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func: action, args: [] }),
      '*',
    );
    setPlaying((p) => !p);
    if (!playing && current >= duration) setCurrent(0);
  };

  // Formata tempo mm:ss
  function formatTime(sec: number) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }

  return (
    <div
      className={tw(
        'w-full max-w-md rounded-lg bg-white/90 shadow flex flex-col items-center p-4 gap-4',
        className,
      )}
    >
      {/* Capa, título e canal */}
      <div className={tw('flex items-center gap-4 w-full')}>
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt='Capa do vídeo'
          className={tw('w-16 h-16 rounded shadow object-cover')}
        />
        <div className={tw('flex-1 min-w-0')}>
          <span className={tw('block text-base font-semibold text-custom-primary truncate')}>
            {title || 'YouTube Music'}
          </span>
          <span className={tw('block text-xs text-gray-500 truncate')}>{author}</span>
        </div>
      </div>
      {/* Player visual estilo Spotify */}
      <div className={tw('flex items-center gap-4 w-full justify-center mt-2')}>
        <button
          onClick={handlePlayPause}
          className={tw(
            'rounded-full bg-custom-primary text-white w-12 h-12 flex items-center justify-center shadow hover:bg-yellow-600 transition',
          )}
          aria-label={playing ? 'Pausar' : 'Tocar'}
        >
          {playing ? (
            <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
              <rect x='6' y='5' width='4' height='14' rx='2' fill='currentColor' />
              <rect x='14' y='5' width='4' height='14' rx='2' fill='currentColor' />
            </svg>
          ) : (
            <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
              <path d='M7 6v12l10-6-10-6z' fill='currentColor' />
            </svg>
          )}
        </button>
        {/* Barra de progresso */}
        <div className={tw('flex-1 flex flex-col gap-1')}>
          <div className={tw('h-2 bg-gray-200 rounded-full relative overflow-hidden')}>
            <div
              className={tw(
                'absolute left-0 top-0 h-2 bg-custom-primary rounded-full transition-all duration-300',
              )}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className={tw('flex justify-between text-xs text-gray-500 mt-1')}>
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      {/* Iframe invisível para tocar o áudio */}
      <div
        className={tw('relative w-full h-0 overflow-hidden')}
        style={{ paddingBottom: '56.25%' }}
      >
        <iframe
          ref={iframeRef}
          title='YouTube Music Player'
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&modestbranding=1&rel=0&showinfo=0`}
          allow='autoplay; encrypted-media'
          allowFullScreen={false}
          className={tw('absolute top-0 left-0 w-full h-full pointer-events-none opacity-0')}
          tabIndex={-1}
        />
      </div>
    </div>
  );
};

export default YouTubeMusicPlayer;
