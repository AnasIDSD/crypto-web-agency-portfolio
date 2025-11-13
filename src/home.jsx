import { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import './home.css';

const modules = import.meta.glob('./assets/showcase*.png', { eager: true });
const showcaseImages = Object.values(modules).map((m) => m.default || m);

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

      if (distance.current >=150 && showcaseImages.length > 0) {
        const imgSrc = showcaseImages[showcaseIndex.current % showcaseImages.length];
        const newShowcase = {
          id: showcaseIndex.current,
          src: imgSrc,
          x: e.clientX,
          y: e.clientY,
        };
        setActiveShowcases((prev) => [...prev, newShowcase]);

        setTimeout(() => {
          setActiveShowcases((prev) =>
            prev.filter((s) => s.id !== newShowcase.id)
          );
        }, 1000);

        showcaseIndex.current++;
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
          className="showcase"
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
