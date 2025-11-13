import { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import './home.css';

function Home() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
    </section>
  );
}

export default Home;
