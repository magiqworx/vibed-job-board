'use client';

import { useEffect, useState } from 'react';

export default function BackgroundGradient() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(99, 102, 241, ${0.15 * (1 - scrollProgress)}) 0%,
              rgba(139, 92, 246, ${0.1 * (1 - scrollProgress)}) 30%,
              rgba(6, 182, 212, ${0.15 * scrollProgress}) 60%,
              rgba(16, 185, 129, ${0.1 * scrollProgress}) 100%
            )
          `,
        }}
      />
      <div 
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `
            radial-gradient(
              ellipse at 50% 20%,
              rgba(99, 102, 241, ${0.2 * (1 - scrollProgress)}) 0%,
              transparent 50%
            ),
            radial-gradient(
              ellipse at 50% 80%,
              rgba(6, 182, 212, ${0.2 * scrollProgress}) 0%,
              transparent 50%
            )
          `,
        }}
      />
    </div>
  );
}
