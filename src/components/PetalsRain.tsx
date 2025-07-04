import { useEffect, useRef, useState } from 'react';
import petalImg from '@/assets/petal.png'; // coloque sua imagem de pétala em assets/petal.png

const PETALS_COUNT = 18;
const PETAL_MIN_SIZE = 24;
const PETAL_MAX_SIZE = 40;
const PETAL_MIN_SPEED = 1.2;
const PETAL_MAX_SPEED = 2.5;
const PETAL_MIN_SWAY = 0.5;
const PETAL_MAX_SWAY = 2.5;
const DURATION = 4000; // ms

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function PetalsRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(true);
  const petals = useRef<any[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    setTimeout(() => setShow(false), DURATION);
  }, []);

  useEffect(() => {
    if (!show) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener('resize', handleResize);

    // Carregar imagem da pétala
    const img = new window.Image();
    img.src = petalImg;
    img.onload = () => {
      // Inicializar pétalas
      petals.current = Array.from({ length: PETALS_COUNT }).map(() => {
        const size = random(PETAL_MIN_SIZE, PETAL_MAX_SIZE);
        return {
          x: random(0, width),
          y: random(-height, 0),
          size,
          speed: random(PETAL_MIN_SPEED, PETAL_MAX_SPEED),
          sway: random(PETAL_MIN_SWAY, PETAL_MAX_SWAY),
          swayPhase: random(0, Math.PI * 2),
          rotate: random(0, Math.PI * 2),
          rotateSpeed: random(-0.01, 0.01),
        };
      });
      animate();
    };

    function animate() {
      if (!ctx) return;
      ctx?.clearRect(0, 0, width, height);
      for (const petal of petals.current) {
        petal.y += petal.speed;
        petal.x += Math.sin(petal.swayPhase + petal.y / 50) * petal.sway;
        petal.rotate += petal.rotateSpeed;
        if (petal.y > height + petal.size) {
          petal.y = random(-height, 0);
          petal.x = random(0, width);
        }
        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotate);
        ctx.drawImage(img, -petal.size / 2, -petal.size / 2, petal.size, petal.size);
        ctx.restore();
      }
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [show]);

  if (!show) return null;
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
        display: 'block',
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
