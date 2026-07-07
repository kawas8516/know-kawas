'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className={`h-4 w-4 ${className ?? ''}`} aria-hidden="true" />;
  }

  const isDark = resolvedTheme === 'dark';

  function handleClick() {
    setClicked(true);
    setTheme(isDark ? 'light' : 'dark');
    setTimeout(() => setClicked(false), 700);
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative flex items-center justify-center ${className ?? ''}`}
    >
      {/* Orbiting dot */}
      <span
        className="absolute w-1 h-1 rounded-full"
        style={{
          background: isDark ? '#fbbf24' : '#e879f9',
          animation: 'orbit 2s linear infinite',
          transformOrigin: 'center',
          top: '50%',
          left: '50%',
          marginTop: '-2px',
          marginLeft: '-2px',
        }}
        aria-hidden="true"
      />

      {/* Outer ring pulse */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          animation: 'ringPulse 2s ease-out infinite',
          border: isDark ? '1.5px solid rgba(251,191,36,0.5)' : '1.5px solid rgba(232,121,249,0.5)',
          borderRadius: '50%',
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <span
        className={`relative z-10 transition-all duration-300 ${
          clicked ? 'scale-150 rotate-[360deg] opacity-0' : 'scale-100 rotate-0 opacity-100'
        } group-hover:scale-125`}
      >
        {isDark ? (
          <Sun
            className="h-4 w-4"
            style={{
              color: '#fbbf24',
              filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.9)) drop-shadow(0 0 12px rgba(251,191,36,0.4))',
            }}
          />
        ) : (
          <Moon
            className="h-4 w-4"
            style={{
              color: '#e879f9',
              filter: 'drop-shadow(0 0 6px rgba(232,121,249,0.9)) drop-shadow(0 0 12px rgba(232,121,249,0.4))',
            }}
          />
        )}
      </span>

      <style>{`
        @keyframes orbit {
          0%   { transform: rotate(0deg)   translateX(10px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
        }
        @keyframes ringPulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.9); opacity: 0; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="orbit"], [style*="ringPulse"] { animation: none !important; }
        }
      `}</style>
    </button>
  );
}
