'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// Heat band — matches the fuchsia → rose → amber brand accent
const PALETTE = ['#d946ef', '#ec4899', '#f43f5e', '#f59e0b', '#fb923c'];
const NODE_COUNT = 30;
const LINK_DIST = 180;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function seedNodes(w: number, h: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => {
    const speed = 0.15 + Math.random() * 0.18;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 3 + Math.random() * 2,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    };
  });
}

function drawFrame(ctx: CanvasRenderingContext2D, nodes: Node[], w: number, h: number) {
  ctx.clearRect(0, 0, w, h);

  // Draw links
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist >= LINK_DIST) continue;

      const t = 1 - dist / LINK_DIST;
      const [ar, ag, ab] = hexToRgb(a.color);
      const [br, bg, bb] = hexToRgb(b.color);
      const r = Math.round((ar + br) / 2);
      const g = Math.round((ag + bg) / 2);
      const bl = Math.round((ab + bb) / 2);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(${r},${g},${bl},${t * 0.3})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
  }

  // Draw nodes
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    const [r, g, b] = hexToRgb(node.color);
    ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = node.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function stepNodes(nodes: Node[], w: number, h: number) {
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < 0) node.x += w;
    if (node.x > w) node.x -= w;
    if (node.y < 0) node.y += h;
    if (node.y > h) node.y -= h;
  }
}

export function NodeGraphBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let raf: number;

    function init() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      canvas!.width = w;
      canvas!.height = h;
      nodes = seedNodes(w, h);
    }

    function loop() {
      const w = canvas!.width;
      const h = canvas!.height;
      stepNodes(nodes, w, h);
      drawFrame(ctx!, nodes, w, h);
      raf = requestAnimationFrame(loop);
    }

    init();

    if (reducedMotion) {
      drawFrame(ctx, nodes, canvas.width, canvas.height);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => {
      const newW = canvas.offsetWidth;
      const newH = canvas.offsetHeight;
      if (Math.abs(newW - canvas.width) > 20 || Math.abs(newH - canvas.height) > 20) {
        cancelAnimationFrame(raf);
        init();
        if (!reducedMotion) raf = requestAnimationFrame(loop);
        else drawFrame(ctx, nodes, canvas.width, canvas.height);
      }
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
