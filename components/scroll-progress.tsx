'use client';

import { useEffect } from 'react';

export function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById('progress-bar');
    if (!el) return;
    const bar = el;

    function update() {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      id="progress-bar"
      className="fixed top-0 left-0 h-[2px] z-50 bg-gradient-to-r from-violet-500 via-pink-500 to-blue-500"
      style={{ width: '0%' }}
    />
  );
}
