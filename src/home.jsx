import { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import './home.css';

const modules = import.meta.glob('./assets/showcase*.png', { eager: true });
const showcaseImages = Object.values(modules).map((m) => m.default || m);

const DISTANCE_THRESHOLD = 150;
const DISPLAY_TIME = 900;

function Home() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [activeShowcases, setActiveShowcases] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const distance = useRef(0);
  const showcaseIndex = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setOffset({ x, y });

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const delta = Math.sqrt(dx * dx + dy * dy);
      distance.current += delta;

      if (distance.current >= DISTANCE_THRESHOLD && showcaseImages.length > 0) {
        const imgSrc = showcaseImages[showcaseIndex.current % showcaseImages.length];
        const id = showcaseIndex.current;
        showcaseIndex.current++;

        const newShowcase = { id, src: imgSrc, x: e.clientX, y: e.clientY, visible: false };
        setActiveShowcases((prev) => [...prev, newShowcase]);

        setTimeout(() => {
          setActiveShowcases((prev) =>
            prev.map((s) => (s.id === id ? { ...s, visible: true } : s))
          );
        }, 10);

        setTimeout(() => {
          setActiveShowcases((prev) =>
            prev.map((s) => (s.id === id ? { ...s, visible: false } : s))
          );
        }, DISPLAY_TIME - 300);

        setTimeout(() => {
          setActiveShowcases((prev) =>
            prev.filter((s) => s.id !== id)
          );
        }, DISPLAY_TIME);

        distance.current = 0;
      }

      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="home" id="home">
      <div className="logowrapper">
        <img
          className="backimg"
          src={logo}
          alt="Background logo"
          style={{
            transform: `
              rotateY(${offset.x * 0.012}deg)
              rotateX(${-offset.y * 0.03}deg)
              translate(${-offset.x * 0.013}px, ${-offset.y * 0.02}px)
            `,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <img
          className="frontimg"
          src={logo}
          alt="Foreground logo"
          style={{
            transform: `rotateY(${offset.x * 0.012}deg) rotateX(${-offset.y * 0.03}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      </div>

      {activeShowcases.map((s) => (
        <img
          key={s.id}
          src={s.src}
          alt="showcase"
          className={`showcase ${s.visible ? 'visible' : ''}`}
          style={{
            left: s.x,
            top: s.y,
          }}
        />
      ))}
    </section>
  );
}

export default Home;
